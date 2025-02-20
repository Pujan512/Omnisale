import { useContext, useState } from "react";
import { CartContext } from "../../Context/OmniContext"
import CartCard from "./CartCard";
import Payment from "../Payment/Payment";
import { useEffect, memo } from "react";
import { maxDistance } from "./maxDistance";

const Cart = () => {
    const { cart, setCart } = useContext(CartContext);
    const [total, setTotal] = useState(cart.reduce((a, ci) => parseFloat(ci.product.price) + a, 0));
    
    const costOnDistance = cart.length > 0 && Math.ceil(maxDistance(cart.map(ci => ci.product.location)) / 1000) * 10
    const delivery = cart.every(ci => ci.product.delivery == 'Self') ? 0 : (costOnDistance < 50) ? 50 : costOnDistance;
    
    useEffect(()=>{
        if(cart.length > 0)
        setTotal(cart.reduce((a, p) => parseFloat(p.product.price) + a, 0));
    },[cart])

    return (
        <section className="main flex flex-col">
            <h1 className="text-2xl font-semibold">Cart</h1>
            <article className="my-5">
                <table className="min-w-full min-h-50 divide-y divide-gray-700 table-auto">
                    <thead>
                        <tr className="text-center bg-gray-100">
                            <th className="text-left">Product</th>
                            <th className="text-left">Name</th>
                            <th>Price(Rs.)</th>
                            <th>Quantity</th>
                            <th></th>
                            <th>Sub Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 space-y-10">
                        {cart.length > 0 ? cart.map((cartItem, index) => {
                            return <CartCard
                                key={index}
                                name={cartItem.product.name}
                                imgSrc={import.meta.env.VITE_API_URL_IMAGE + cartItem.product.imageNames[0]}
                                id={cartItem.cartItemId}
                                productId={cartItem.product.id}
                                price={cartItem.product.price}
                                available={cartItem.product.available} 
                                quantity={cartItem.quantity}
                                setCart={setCart}
                                cart={cart}
                                total={total}
                                setTotal={setTotal}
                            />
                        }) : <tr><td colSpan={6} className="text-center py-10 text-3xl">No Products in Cart</td></tr>}
                    </tbody>
                </table>
            </article>

            {cart.length == 0 || <article className="border-1 rounded-sm p-5 place-self-end flex flex-col">
                <table className="w-75 table-auto ">
                    <tbody className="divide-y divide-gray-700 p-5">
                        <tr>
                            <td className="py-2">Sub Total</td>
                            <td className="text-right">{total}</td>
                        </tr>
                        <tr>
                            <td className="py-2">Delivery</td>
                            <td className="text-right">{parseFloat(delivery).toFixed(2) ?? "Free"}</td>
                        </tr>
                        <tr>
                            <td className="py-2">Total</td>
                            <td className="text-right">{total + delivery}</td>
                        </tr>
                    </tbody>
                </table>
                <Payment price={total + delivery} />
            </article>}
        </section>
    )
}

export default memo(Cart);