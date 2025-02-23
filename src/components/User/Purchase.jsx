import { useState } from "react";
import { useNavigate } from "react-router";

const Purchase = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useState(()=>{
        fetch(import.meta.env.VITE_API_URL_ORDER + sessionStorage.getItem('user'),{
            headers: {
                "Authorization": `Bearer ${document.cookie.split('=')[1]}`
            }
        })
        .then(res => res.json())
        .then(data => setOrders(data));
    },[])

    return (
        <section>
            <table className="w-full table-auto">
                <thead>
                    <tr className="text-left bg-gray-200">
                        <th className="hidden lg:table-cell">S.N.</th>
                        <th>OrderId</th>
                        <th className="pl-3">Product(s)</th>
                        <th>Status</th>
                        <th className="pl-2">Amount</th>
                        <th className="hidden lg:table-cell">Delivery</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-500">
                    {orders.map((order, index) => {
                        return <tr key={index}>
                            <td className="py-2 hidden lg:table-cell">{index + 1}</td>
                            <td>ODR00{order.id}</td>
                            <td className="pl-3">{order.orderItems.map((oi, i) => <a key={i} className="text-blue-700 cursor-pointer" onClick={() => navigate('/product/'+oi.product.id)}>{oi.product.name}<br /></a>)}</td>
                            <td>{order.status}</td>
                            <td className="pl-2">{order.totalAmount}</td>
                            <td className="hidden lg:table-cell">{order.orderItems.filter(oi => oi.product.delivery == "Platform") ? "Platform": "Seller"}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </section>
    )
}

export default Purchase;