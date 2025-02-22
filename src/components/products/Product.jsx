
import { memo } from "react";
import ProductCard from "./ProductCard";

const Product = ({title, products}) => {
    
    return (
        <>
            <article>
                <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
            </article>
            <section className="my-3 md:grid flex flex-wrap gap-5
                                md:grid-cols-5 md:gap-10 md:my-5">
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