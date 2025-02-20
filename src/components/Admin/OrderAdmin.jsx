import { useEffect } from "react";
import { useState } from "react"

export default function OrderAdmin() {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState('Processing');

    const handleUpdate = (id) => {
        fetch(import.meta.env.VITE_API_URL_ORDER + id,{
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${document.cookie.split('=')[1]}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(status)
        }).then(()=>{
            const updatedOrders = [...orders];
            const index = orders.findIndex(o => o.id == id)
            updatedOrders[index].status = status;
            setOrders(updatedOrders);
        })
    }

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL_ORDER, {
            headers: {
                "Authorization": `Bearer ${document.cookie.split('=')[1]}`
            }
        }).then((res) => res.json())
            .then(data => setOrders(data))
            .catch(err => console.log(err))
    }, [])
    return (
        <section>
            <table className="w-full table-auto">
                <thead>
                    <tr className="text-center bg-gray-200">
                        <th>S.N.</th>
                        <th>OrderId</th>
                        <th>Product(s)</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Delivery</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-500">
                    {orders.map((order, index) => {
                        return <tr key={index} className="text-center">
                            <td className="py-2">{index + 1}</td>
                            <td>ORDER00{order.id}</td>
                            <td>{order.orderItems.map((oi, i) => <a key={i} className="text-blue-700 cursor-pointer" onClick={() => navigate('/product/' + oi.product.id)}>{oi.product.name}<br /></a>)}</td>
                            <td>{order.totalAmount}</td>
                            <td><>
                                <input type="checkbox" name="status" id="delivered" value="Delivered" onChange={() => setStatus((prev) => prev == e.target.value ? "Processing" : e.target.value)} checked={status == "Delivered"} />
                                <label htmlFor="delivered">Delivered</label>
                            </></td>
                            <td>{order.orderItems.filter(oi => oi.product.delivery == "Platform") ? "Platform" : "Seller"}</td>
                            <td><button onClick={() => handleUpdate(order.id)} className="cursor-pointer bg-zinc-500 hover:bg-red-400 text-white px-4 py-2 rounded-md">Update</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </section>
    )
}