import { useEffect } from "react";
import { useState } from "react"
import { useNavigate } from "react-router";

export default function OrderAdmin() {
    const [orders, setOrders] = useState([]);
    
    const handleUpdate = (id, status) => {
        fetch(import.meta.env.VITE_API_URL_ORDER + id, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${document.cookie.split('=')[1]}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(status)
        }).then(() => {
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
                        <th>Total Amount(Rs.)</th>
                        <th>Status</th>
                        <th>Delivery</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-500">
                    {orders.map((order, index) => {
                        console.log(order)
                        return <Order key={index} handleUpdate={handleUpdate} index={index} id={order.id} orderItems={order.orderItems} totalAmount={order.totalAmount}/>
                    })}
                </tbody>
            </table>
        </section>
    )
}

const Order = ({id, orderItems, totalAmount, index, handleUpdate }) => {
    const [status, setStatus] = useState('Processing');
    const navigate = useNavigate();
    return (
        <tr className="text-center">
            <td className="py-2">{index + 1}</td>
            <td>ORDER00{id}</td>
            <td>{orderItems.map((oi, i) => <a key={i} className="text-blue-700 cursor-pointer" onClick={() => navigate('/product/' + oi.product.id)}>{oi.product.name}<br /></a>)}</td>
            <td>{totalAmount / 100}</td>
            <td><>
                <input type="checkbox" name="status" id="delivered" value="Delivered" onChange={(e) => setStatus((prev) => prev == e.target.value ? "Processing" : e.target.value)} checked={status == "Delivered"} />
                <label htmlFor="delivered">Delivered</label>
            </></td>
            <td>{orderItems.filter(oi => oi.product.delivery == "Platform") ? "Platform" : "Seller"}</td>
            <td className="py-2"><button onClick={() => handleUpdate(id, status)} className="cursor-pointer bg-zinc-500 hover:bg-red-400 text-white px-4 py-2 rounded-md">Update</button></td>
        </tr>
    )
}