import { useContext } from "react"
import { CategoryContext } from "../../Context/OmniContext"
import { useRef } from "react";

export default function CategoryAdmin() {
    const {categories, setCategories} = useContext(CategoryContext);
    const categoryRef = useRef();

    const handleDelete = (id) => {
        fetch(import.meta.env.VITE_API_URL_CATEGORY + id,{
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${document.cookie.split('=')[1]}`
            }
        }).then(()=>{
            const newCategories = categories.filter(c => c.id != id);
            setCategories(newCategories);
        }).catch(err => console.log(err));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(import.meta.env.VITE_API_URL_CATEGORY,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${document.cookie.split('=')[1]}`
            },
            body:JSON.stringify({name: categoryRef.current.value})
        })
        .then(res => res.json())
        .then(data => {
            setCategories([...categories, data])
            categoryRef.current.value = '';
        }).catch(err => console.log(err));
    }
    return (
        <section>
            <h2 className="text-3xl font-semibold">Categories</h2>
            <form onSubmit={handleSubmit} className="flex gap-5 my-5">
                <input className="border-1 p-2 flex flex-1" type="text" ref={categoryRef} placeholder="Category Name"/>
                <input className="border-1 cursor-pointer text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-md"type="submit" value="Add" />
            </form>
            <table className="w-full table-auto text-center">
                <thead>
                    <tr>
                        <th>Category ID</th>
                        <th className="text-left">Category</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-500">
                    {categories.length > 2 && categories.map((category, index) => {
                        return <tr key={index}>
                            <td className="py-4">{category.id}</td>
                            <td className="text-left">{category.name}</td>
                            <td>{category.status}</td>
                            <td><button onClick={() => handleDelete(category.id)} className="cursor-pointer bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md">Delete</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </section>
    )
}