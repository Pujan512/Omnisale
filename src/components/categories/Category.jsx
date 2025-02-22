import { useContext } from "react";
import { CategoryContext } from "../../Context/OmniContext";
import CategoryCard from "./CategoryCard";

const Category = () => {
    const { categories } = useContext(CategoryContext);

    return (
        <section id="category">
            <h2 className="text-xl lg:text-2xl z-9 font-semibold my-4">Browse By Category</h2>
            <section className="lg:grid lg:my-5 gap-1 flex flex-wrap lg:grid-cols-6 lg:gap-10">
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