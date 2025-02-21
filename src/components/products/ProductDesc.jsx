import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { CartContext } from "../../Context/OmniContext";
import Payment from "../Payment/Payment";
import { getCoordinates } from "../Cart/maxDistance";
import { getDistance } from "geolib";
import Comments from "./Comments";
import Loading from "../Loading";

const ProductDesc = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [comments, setComments] = useState({});
    const [hasError, setHasError] = useState(false);
    const navigate = useNavigate();
    const { cart, setCart } = useContext(CartContext);

    const user = sessionStorage.getItem("user")
    const costOnDistance = product.location && user ?
        Math.ceil(getDistance(getCoordinates(product.location), getCoordinates(sessionStorage.getItem("location"))) / 1000) * 10 :
        0;
    const delivery = costOnDistance < 50 ? 50 : costOnDistance;

    const fetchProduct = async (id) => {
        setLoading(true);
        const res = await fetch(import.meta.env.VITE_API_URL_PRODUCT + id);
        const data = await res.json();
        setProduct(data);
        setComments(data.comments);
    }

    const handleAddCart = () => {

        const cartItem = {
            productId: product.id,
            userId: sessionStorage.getItem('user'),
            quantity: 1
        }

        if (!cart.some(c => c.productId == id && c.userId == sessionStorage.getItem('user')))
            fetch(import.meta.env.VITE_API_URL_CART_ITEM, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${document.cookie.split('=')[1]}`
                },
                body: JSON.stringify(cartItem)
            })
                .then(() => {
                    setCart([...cart, {
                        ...cartItem,
                        product: product
                    }])
                    navigate('/cart');
                })
                .catch(err => console.error(err))
        else {
            setHasError(true);
            setTimeout(() => {
                setHasError(false);
            }, [2000])
        }
    }

    useEffect(() => {
        try {
            fetchProduct(id);
        } finally {
            setLoading(false);
        }
    }, [])

    if (loading) return <section className="main self-center"><Loading /></section>
    return (
        <article className="main">
            <article className="flex justify-between">
                <section>
                    {product.imageNames && product.imageNames.length > 0 &&
                        <>
                            <img src={import.meta.env.VITE_API_URL_IMAGE + product.imageNames[activeIndex]} className="w-140 h-90 object-contain bg-zinc-200 p-4 mb-4" onClick={() => setActiveIndex(index)} />
                            <div className="flex gap-5 w-150 overflow-x-scroll">
                                {product?.imageNames.map((image, index) =>
                                    <img key={index} src={import.meta.env.VITE_API_URL_IMAGE + image} className="w-30 h-20 object-contain bg-zinc-200 p-2" onClick={() => setActiveIndex(index)} />
                                )}
                            </div>
                        </>}
                </section>
                <section className="w-120 flex flex-col gap-8">
                    <article className="flex flex-col gap-5">
                        <div>
                            <h2 className="text-4xl font-semibold">{product.name}</h2>
                            <p className="text-blue-500 text-xl">{product.ownerName}</p>
                            <p className="text-gray-500 text-md">{product.location?.split(',')[3].split(':')[1]}</p>
                            <h3 className="text-2xl text-orange-400">Rs.{parseFloat(product.price).toFixed(2)} {(user && user != product.userId && product.delivery == 'Platform') && <span className="text-sm text-red-400">(Delivery: Rs.{delivery})</span>}</h3>
                        </div>
                        <div>
                            <span className="font-semibold">Description:</span>
                            <p className="max-h-55 break-normal overflow-y-scroll">{product.description?.split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    <br />
                                </span>
                            ))}</p>
                        </div>
                    </article>
                    {!product.isSold && <>
                        {(user && user != product.userId) && <><hr />
                            <article className="flex gap-10">
                                <a className="cursor-pointer border-1 p-2 rounded-md text-center bg-zinc-700 text-white hover:bg-zinc-600" onClick={() => handleAddCart()}>Add to Cart</a>
                                <Payment price={parseFloat(product.price + delivery).toFixed(2)} btnName="Buy Now" order="individual" orderId={product.id} />
                            </article></>}
                        <p className="text-red-600 relative -top-8">{hasError ? "This product is already in cart!" : ""}</p></>}
                </section>
            </article>
            {!product.isSold && <>
                <hr className="my-10" />
                <Comments comments={comments} setComments={setComments} productId={product.id} /></>}
        </article>
    )
}

export default ProductDesc;