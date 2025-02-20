import { useNavigate } from "react-router";
import { useState } from "react";
import { memo } from "react";

const CartCard = ({name, price, id, imgSrc, setCart, cart, setTotal, quantity, available, productId}) => {
    const [count, setCount] = useState(quantity);
    const navigate = useNavigate();

    const handleChange = (e) => {
        if(e.target.value == 0 || e.target.value > available)
            return false;
        setCount(e.target.value);
        setTotal(prev => prev + e.target.value*price - count*price)
    }
    
    const handleDelete = (id) => {
        fetch(import.meta.env.VITE_API_URL_CART_ITEM + id, {
            method: "DELETE"
        }).then(() => {
            const updatedCart = cart.filter(c => c.cartItemId != id);
            setTotal(prev => prev - count*price);
            setCart(updatedCart);
        }).catch(err => console.log(err));
    }

    return (
        <tr className="text-center">
            <td onClick={() => {navigate("/product/" + productId)}}><img src={imgSrc} alt={name} className="py-3 w-30 object-cover" /></td>
            <td onClick={() => navigate("/product/" + productId)} className="text-left">{name}</td>
            <td>{price}</td>
            <td><input type="number" value={count} className=" border-1 w-12 appearance-none rounded-md p-1" onChange={handleChange} /></td>
            <td><button onClick={() => handleDelete(id)} className="cursor-pointer bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-md">Delete</button></td>
            <td>{price * count}</td>
        </tr>
    )
}

export default memo(CartCard);