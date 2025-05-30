import { useContext } from "react"
import { ProductContext } from "../../Context/OmniContext"
import { useNavigate } from "react-router";

const ManageProducts = () => {
    const { products, setProducts } = useContext(ProductContext);
    const user = sessionStorage.getItem('user');
    const myProducts = products.filter(p => p.userId == user);
    const navigate = useNavigate();

    const handleDelete = (id) => {
        fetch(import.meta.env.VITE_API_URL_PRODUCT + id, {
            headers: {
                "Authorization": `Bearer ${document.cookie.split('=')[1]}`
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
                    <tr className="text-left bg-gray-200">
                        <th>Product</th>
                        <th className="hidden lg:table-cell lg:text-left">Name</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-500">
                    {myProducts.map((product, index) => {
                        return <tr key={index}>
                            <td onClick={() => navigate("/product/" + product.id)}>
                                <img src={import.meta.env.VITE_API_URL_IMAGE + product.imageNames[0]} alt={product.name} className="py-3 h-20 w-20 object-contain cursor-pointer" loading="lazy"/>
                                <span className="lg:hidden text-center break-words">{product.name}</span>
                            </td>
                            <td onClick={() => navigate("/product/" + product.id)} className="hidden lg:table-cell text-left p-2 cursor-pointer"><span className="break-words">{product.name}</span></td>
                            <td className="p-2">{product.price}</td>
                            <td>{product.isSold ? "Sold" : "Listed"}</td>
                            {!product.isSold && <>
                                <td>
                                    <button onClick={() => navigate('/EditProd/' + product.id)} className="hidden lg:table-cell cursor-pointer bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-md">Edit</button>
                                    <button onClick={() => navigate('/EditProd/' + product.id)} className="lg:hidden text-blue-400 p-2 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                        </svg>
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(product.id)} className="hidden lg:table-cell cursor-pointer bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
                                    <button onClick={() => handleDelete(product.id)} className="lg:hidden text-red-500 p-2 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash lg:hidden" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                    </svg></button>
                                </td>
                            </>}
                        </tr>
                    })}
                </tbody>
            </table>
        </section>
    )
}

export default ManageProducts;