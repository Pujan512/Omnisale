import { memo } from "react";
import { useNavigate } from "react-router";

const CategoryCard = ({imgSrc, name, id}) => {

    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/category/${id}`);
    }
    return (
        <article className="w-[21.5vw] h-27 lg:h-50 lg:w-40 flex flex-col justify-center bg-zinc-200 p-2 rounded-md" onClick={() => handleClick(id)}>
            <img src={imgSrc} alt={name} className="h-10 lg:h-30 object-contain" loading="lazy"/>
            <p className="text-xs lg:text-base text-center font-semibold">{name}</p>
        </article>
    )
}

export default memo(CategoryCard);