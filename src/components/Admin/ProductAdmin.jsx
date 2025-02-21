import { useContext } from "react"
import { ProductContext } from "../../Context/OmniContext"

export default function ProductAdmin() {
    const { products, setProducts } = useContext(ProductContext);
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
                    <tr className="text-center bg-gray-200">
                        <th>S.N.</th>
                        <th>Product Id</th>
                        <th>Product</th>
                        <th>Owner Id</th>
                        <th>Price</th>
                        <th>Sold</th>
                        <th>Delivery</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-500">
                    {products.length > 0 && products.map((product, index) => {
                        return <tr key={index} className="text-center">
                            <td className="py-2">{index + 1}</td>
                            <td>PROD00{product.id}</td>
                            <td>{product.name}</td>
                            <td className="w-50">{product.userId}</td>
                            <td>{product.price}</td>
                            <td>{product.isSold.toString()}</td>
                            <td>{product.delivery}</td>
                            <td><button onClick={() => handleDelete(product.id)} className="cursor-pointer bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md">Delete</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </section>
    )
}