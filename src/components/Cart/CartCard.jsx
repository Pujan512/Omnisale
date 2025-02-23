import { useNavigate } from "react-router";
import { useState } from "react";
import { memo } from "react";

const CartCard = ({ name, price, id, imgSrc, setCart, cart, setTotal, quantity, available, productId }) => {
    const [count, setCount] = useState(quantity);
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.value == 0 || e.target.value > available)
            return false;
        setCount(e.target.value);
        setTotal(prev => prev + e.target.value * price - count * price)
    }

    const handleDelete = (id) => {
        fetch(import.meta.env.VITE_API_URL_CART_ITEM + id, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${document.cookie.split("=")[1]}`
            }
        }).then(() => {
            const updatedCart = cart.filter(c => c.cartItemId != id);
            setTotal(prev => prev - count * price);
            setCart(updatedCart);
        }).catch(err => console.log(err));
    }

    return (
        <tr className="text-center">
            <td className="relative flex flex-col py-4"><img src={imgSrc} alt={name} className="cursor-pointer lg:m-0 py-1 lg:py-3 size-fit lg:h-auto w-20 lg:w-30 object-contain" loading="lazy" onClick={() => { navigate("/product/" + productId) }}/>
                <div className="text-red-500 absolute top-2 left-22 hover:bg-gray-200 p-1 cursor-pointer" onClick={() => handleDelete(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash lg:hidden" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                </div>
                <p className="lg:hidden text-left ml-2 cursor-pointer font-semibold" onClick={() => { navigate("/product/" + productId) }}>{name}</p>
            </td>
            <td onClick={() => navigate("/product/" + productId)} className="hidden lg:table-cell text-left cursor-pointer">{name}</td>
            <td>{price}</td>
            <td><input type="number" value={count} className=" border-1 w-12 appearance-none rounded-md p-1" onChange={handleChange} /></td>
            <td>
                <button onClick={() => handleDelete(id)} className="hidden lg:flex cursor-pointer bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-md">Delete</button>
            </td>
            <td>{price * count}</td>
        </tr>
    )
}

export default memo(CartCard);