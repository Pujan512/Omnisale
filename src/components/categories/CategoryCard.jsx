import { memo } from "react";
import { useNavigate } from "react-router";

const CategoryCard = ({imgSrc, name, id}) => {

    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/category/${id}`);
    }
    return (
        <article className="h-50 w-40 flex flex-col justify-center bg-zinc-200 p-2 rounded-md" onClick={() => handleClick(id)}>
            <img src={imgSrc} alt={name} className="h-30 object-contain"/>
            <p className="text-md text-center font-semibold">{name}</p>
        </article>
    )
}

export default memo(CategoryCard);