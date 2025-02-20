import { useLocation, useParams } from "react-router";
import Category from "./categories/Category";
import Product from "./products/Product";
import { useContext, useEffect } from "react";
import { CategoryContext, ProductContext } from "../Context/OmniContext";

const Homepage = () => {
    const { products } = useContext(ProductContext);
    const { categories } = useContext(CategoryContext)
    const { id } = useParams() ?? "";
    const category = categories.find(c => c.id == id)
    const location = useLocation();
    const unsoldProducts = products.filter(p => !p.isSold);

    useEffect(() => {
        setTimeout(() => {
            if (location.hash === '#category') {
                document.getElementById('category').scrollIntoView();
            }
        }, [700])
    }, [])

    return (
        <section className="main min-h-110.5">
                    <Product
                        title={id ? "Category : " + category.name : "Our Products"}
                        products={id ? unsoldProducts.filter(p => p.categoryId == id) : unsoldProducts}
                    />

                    {id ? "" : <><hr className="text-zinc-500 my-10" /><Category /></>}
        </section>
    )

}

export default Homepage;