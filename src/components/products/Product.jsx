
import { memo } from "react";
import ProductCard from "./ProductCard";

const Product = ({title, products}) => {
    
    return (
        <>
            <article >
                <h2 className="text-2xl font-semibold">{title}</h2>
            </article>
            <section className="my-5 grid grid-cols-5 gap-10">
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