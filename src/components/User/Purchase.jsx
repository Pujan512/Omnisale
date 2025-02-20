import { useState } from "react";
import { useNavigate } from "react-router";

const Purchase = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useState(()=>{
        fetch(import.meta.env.VITE_API_URL_ORDER + sessionStorage.getItem('user'))
        .then(res => res.json())
        .then(data => setOrders(data));
    },[])

    return (
        <section>
            <table className="w-full table-auto">
                <thead>
                    <tr className="text-left">
                        <th>S.N.</th>
                        <th>OrderId</th>
                        <th>Product(s)</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Delivery</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-500">
                    {orders.map((order, index) => {
                        return <tr key={index}>
                            <td className="py-2">{index + 1}</td>
                            <td>{order.id}</td>
                            <td>{order.orderItems.map((oi, i) => <a key={i} className="text-blue-700 cursor-pointer" onClick={() => navigate('/product/'+oi.product.id)}>{oi.product.name}<br /></a>)}</td>
                            <td>{order.totalAmount}</td>
                            <td>{order.status}</td>
                            <td>{order.orderItems.filter(oi => oi.product.delivery == "Platform") ? "Platform": "Seller"}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </section>
    )
}

export default Purchase;