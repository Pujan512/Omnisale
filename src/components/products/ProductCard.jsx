import { memo } from "react";
import { useNavigate } from "react-router";

const ProductCard = ({imageName, name, price, id}) => {

    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/product/${id}`);
    }
    return (
        <article className="h-60 w-52 flex flex-col bg-zinc-200 p-4 rounded-md" onClick={() => handleClick(id)}>
            <img src={import.meta.env.VITE_API_URL_IMAGE + imageName} alt={name} className="h-35 object-contain"/>
            <p className="text-2xl font-medium">{name}</p>
            <p className="text-lg">Rs.{price}</p>
        </article>
    )
}

export default memo(ProductCard);