import { memo } from "react";
import { useNavigate } from "react-router";

const ProductCard = ({imageName, name, price, id}) => {

    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/product/${id}`);
    }
    return (
        <article className="h-50 w-45 md:h-60 md:w-52 flex flex-col bg-zinc-200 p-4 rounded-md" onClick={() => handleClick(id)}>
            <img src={import.meta.env.VITE_API_URL_IMAGE + imageName} alt={name} className="h-25 my-2 md:h-35 object-contain"/>
            <p className="text-xl md:text-2xl font-semibold md:font-medium">{name}</p>
            <p className="text-base md:text-lg text-orange-400 font-semibold">Rs.{price}</p>
        </article>
    )
}

export default memo(ProductCard);