import { memo } from "react";
import { useNavigate } from "react-router";

const ProductCard = ({imageName, name, price, id}) => {

    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/product/${id}`);
    }
    return (
        <article className="w-[40vw] lg:w-52 flex flex-col bg-zinc-200 p-4 rounded-md" onClick={() => handleClick(id)}>
            <img src={import.meta.env.VITE_API_URL_IMAGE + imageName} alt={name} className="h-25 my-2 lg:h-35 object-contain" loading="lazy"/>
            <p className="text-base lg:text-2xl font-semibold lg:font-medium break-words">{name}</p>
            <p className="text-base lg:text-lg text-orange-400 font-semibold">Rs.{price}</p>
        </article>
    )
}

export default memo(ProductCard);