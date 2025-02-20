import { useContext } from "react";
import { CategoryContext } from "../../Context/OmniContext";
import CategoryCard from "./CategoryCard";

const Category = () => {
    const { categories } = useContext(CategoryContext);

    return (
        <section id="category">
            <h2 className="text-2xl z-9 font-semibold">Browse By Category</h2>
            <section className="my-5 grid grid-cols-6 gap-10">
                {categories.map((category, index) => {
                    return <CategoryCard
                        key={index}
                        imgSrc={'Categories/' + category.name.split(' ')[0] + '.png'}
                        name={category.name}
                        id={category.id}
                    />
                })}
            </section>
        </section >)
}

export default Category;