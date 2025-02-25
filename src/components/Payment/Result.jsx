import { useContext, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router"
import { CartContext, PointContext } from "../../Context/OmniContext";

const Result = () => {
    const userId = sessionStorage.getItem("user");

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const status = searchParams.get('status');
    const orderName = searchParams.get('purchase_order_name');
    const orderId = searchParams.get('purchase_order_id');
    const transactionId = searchParams.get('transaction_id');
    const amount = searchParams.get('total_amount');

    if (status == "User canceled") {
        return (
            <section className="main">
                <h1 className="text-3xl my-10">Payment canceled.</h1>
                <Link to="/" className="cursor-pointer bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-md">Go to Homepage</Link>
            </section>
        )
    }

    const { cart, setCart } = useContext(CartContext);
    const { point, setPoint } = useContext(PointContext);

    const updatedPoints = point + Number(orderId);

    useEffect(() => {
        if (orderName == "Points" && point != null && (!localStorage.getItem("transactionId") || localStorage.getItem("transactionId") != transactionId))
            fetch(import.meta.env.VITE_API_URL_POINT + userId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${document.cookie.split('=')[1]}`
                },
                body: JSON.stringify(updatedPoints)
            }).then(res => res.json())
                .then(data => {
                    setPoint(data.value);
                    localStorage.setItem("transactionId", transactionId);
                })
                .catch(err => console.log(err))
    }, [point])

    useEffect(() => {
        if ((orderName == "cart" || orderName=="individual") && cart.length > 0 && (!localStorage.getItem("transactionId") || localStorage.getItem("transactionId") != transactionId)) {
            buyProduct();
            localStorage.setItem("transactionId", transactionId);
        }
    }, [cart])

    const buyProduct = async () => {
        const res = await fetch(import.meta.env.VITE_API_URL_ORDER + userId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${document.cookie.split('=')[1]}`
            },
            body: amount
        })
        const data = await res.json();
        if (orderName == "individual") {
            const res = await fetch(import.meta.env.VITE_API_URL_ORDER_ITEM + data.id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${document.cookie.split('=')[1]}`
                },
                body: JSON.stringify({
                    userId: userId,
                    productId: orderId
                })
            })
            const orderItem = await res.json();
        }

        if (orderName == "cart") {
            cart.forEach(ci => {
                fetch(import.meta.env.VITE_API_URL_ORDER_ITEM + data.id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${document.cookie.split('=')[1]}`
                    },
                    body: JSON.stringify({
                        userId: userId,
                        productId: ci.product.id
                    })
                }).catch(err => console.log(err))
            })

            fetch(import.meta.env.VITE_API_URL_CART, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${document.cookie.split('=')[1]}`
                },
                body: JSON.stringify(userId)
            }).then(() => setCart([]))
            .catch(err => console.log(err));
        }

    }

    if (orderName == "Points") {
        return (
            <section className="main">
                <h1 className="text-3xl my-10">Points were purchased successfully.</h1>
                <a onClick={()=>{navigate('/');}} className="cursor-pointer bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-md">Go to Homepage</a>
            </section>
        )
    }

    return (
        <section className="main">
            <h1 className="text-3xl my-10">Payment Successful! Your order is being verified for delivery...</h1>
            <a onClick={()=>{navigate('/'); }} className="cursor-pointer bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-md">Go to Homepage</a>
        </section>
    )
}

export default Result;