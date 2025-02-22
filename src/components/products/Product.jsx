
import { memo } from "react";
import ProductCard from "./ProductCard";

const Product = ({title, products}) => {
    
    return (
        <>
            <article>
                <h2 className="text-xl lg:text-2xl font-semibold">{title}</h2>
            </article>
            <section className="my-3 lg:grid flex flex-wrap gap-5
                                lg:grid-cols-5 lg:gap-10 lg:my-5">
                {products && products.map((product, index) => {
                    const image = product.imageNames[0]
                    return <ProductCard
                        key={index}
                        imageName={image}
                        name={product.name}
                        price={product.price}
                        id={product.id}
                    />
                })}
            </section>
        </>
    )
}

export default memo(Product);