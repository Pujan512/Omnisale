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
            <article className="flex flex-col lg:flex-row lg:justify-between">
                <section>
                    {product.imageNames && product.imageNames.length > 0 &&
                        <>
                            <img src={import.meta.env.VITE_API_URL_IMAGE + product.imageNames[activeIndex]} className="hidden lg:flex lg:w-160 lg:h-90 lg:object-contain bg-zinc-200 p-4 mb-4" />
                            <div className="flex gap-5 w-[90vw] lg:w-150 overflow-x-scroll snap-x snap-mandatory pb-10 lg:p-0">
                                {product?.imageNames.map((image, index) =>
                                    <img key={index} src={import.meta.env.VITE_API_URL_IMAGE + image} className="snap-start h-[40vh] w-[95vw] lg:w-30 lg:h-20 object-contain bg-zinc-200 p-4 lg:p-2" onClick={() => setActiveIndex(index)} />
                                )}
                            </div>
                        </>}
                </section>
                <section className="lg:w-120 flex flex-col gap-8">
                    <article className="flex flex-col gap-5">
                        <div>
                            <h2 className="text-4xl font-semibold">{product.name}</h2>
                            <p className="text-blue-500 text-xl">{product.ownerName}</p>
                            <p className="text-gray-500 text-md">{product.location?.split(',')[3].split(':')[1]}</p>
                            <h3 className="text-2xl text-orange-400">Rs.{parseFloat(product.price).toFixed(2)} {(user && user != product.userId && product.delivery == 'Platform') && <span className="text-sm text-red-400">(Delivery: Rs.{delivery})</span>}</h3>
                        </div>
                        <div>
                            <span className="font-semibold text-xl">Description:</span>
                            <p className="lg:max-h-55 break-normal overflow-y-scroll text-lg">{product.description?.split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    <br />
                                </span>
                            ))}</p>
                        </div>
                    </article>
                    {!product.isSold && <>
                        {(user && user != product.userId) && <div><hr className="mb-5" />
                            <article className="flex lg:gap-10 gap-5">
                                <a className="flex flex-1 justify-center cursor-pointer border-1 p-2 rounded-md text-center bg-zinc-700 text-white hover:bg-zinc-600" onClick={() => handleAddCart()}>Add to Cart</a>
                                <Payment price={parseFloat(product.price + delivery).toFixed(2)} btnName="Buy Now" order="individual" orderId={product.id} />
                            </article></div>}
                            {hasError ? <p className="text-red-600 relative -top-8">This product is already in cart!</p>:<></>}</>}
                </section>
            </article>
            {!product.isSold && <>
                <hr className="my-5 lg:my-10" />
                <Comments comments={comments} setComments={setComments} productId={product.id} /></>}
        </article>
    )
}

export default ProductDesc;