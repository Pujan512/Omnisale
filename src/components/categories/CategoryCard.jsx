import { memo } from "react";
import { useNavigate } from "react-router";

const CategoryCard = ({imgSrc, name, id}) => {

    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/category/${id}`);
    }
    return (
        <article className="w-22.5 h-25 md:h-50 md:w-40 flex flex-col justify-center bg-zinc-200 p-2 rounded-md" onClick={() => handleClick(id)}>
            <img src={imgSrc} alt={name} className="h-10 md:h-30 object-contain"/>
            <p className="text-xs md:text-base text-center font-semibold">{name}</p>
        </article>
    )
}

export default memo(CategoryCard);