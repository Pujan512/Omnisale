import { useContext } from "react"
import { ProductContext } from "../../Context/OmniContext"
import { useNavigate } from "react-router";

const ManageProducts = () => {
    const { products, setProducts } = useContext(ProductContext);
    const user = sessionStorage.getItem('user');
    const myProducts = products.filter(p => p.userId == user);
    const navigate = useNavigate();

    const handleDelete = (id) => {
        fetch(import.meta.env.VITE_API_URL_PRODUCT+id,{
            headers: {
                "Authorization" : `Bearer ${document.cookie.split('=')[1]}`
            },
            method: "DELETE"
        }).then(() => {
            const newProducts = products.filter(p => p.id != id);
            setProducts(newProducts);
        }).catch(err => console.log(err))
    }

    return (
        <section>
            <table className="w-full table-auto">
                <thead>
                    <tr className="text-left">
                        <th>Product</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-500">
                    {myProducts.map((product, index) => {
                        return <tr key={index}>
                            <td onClick={() => navigate("/product/" + id)}><img src={import.meta.env.VITE_API_URL_IMAGE + product.imageNames[0]} alt={product.name} className="py-3 h-20 w-20 object-contain" /></td>
                            <td onClick={() => navigate("/product/" + product.id)} className="text-left">{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.isSold? "Sold" : "Listed"}</td>
                            {!product.isSold && <>
                            <td><button onClick={() => navigate('/EditProd/'+product.id)} className="cursor-pointer bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-md">Edit</button></td>
                            <td><button onClick={() => handleDelete(product.id)} className="cursor-pointer bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md">Delete</button></td>
                            </>}
                        </tr>
                    })}
                </tbody>
            </table>
        </section>
    )
}

export default ManageProducts;