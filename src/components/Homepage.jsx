import { useLocation, useParams } from "react-router";
import Category from "./categories/Category";
import Product from "./products/Product";
import Loading from "./Loading";
import { useContext, useEffect } from "react";
import { CategoryContext, ProductContext } from "../Context/OmniContext";

const Homepage = () => {
    const { products } = useContext(ProductContext);
    const { categories } = useContext(CategoryContext)
    const { id } = useParams() ?? "";
    const category = categories.find(c => c.id == id);
    const location = useLocation();
    const unsoldProducts = products.filter(p => !p.isSold);

    useEffect(() => {
        setTimeout(() => {
            if (location.hash === '#category') {
                document.getElementById('category').scrollIntoView();
            }
        }, [1500])
    }, [])

    if (id && !category) return <section className="main self-center"><Loading /></section>

    return (
        <section className="main flex-1">
            <article className="bg-zinc-700 text-white h-[25vh] my-2 mb-5 lg:my-5 text-2xl lg:text-4xl flex items-center justify-center">Your ad goes here!</article>
            <Product
                title={id ? "Category : " + category?.name : "Our Products"}
                products={id ? unsoldProducts.filter(p => p.categoryId == id) : unsoldProducts}
            />

            {id ? "" : <><hr className="text-zinc-500 my-10" /><Category /></>}
        </section>
    )

}

export default Homepage;