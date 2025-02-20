import { useContext } from "react";
import { ProductContext } from "../../Context/OmniContext";
import { useSearchParams } from "react-router";
import ProductCard from "./ProductCard";
import { useState } from "react";

const SearchResults = () => {
    const { products } = useContext(ProductContext);
    const [searchParams] = useSearchParams();
    const [sort, setSort] = useState('');
    const searchQuery = searchParams.get('query') || '';

    const unSoldProducts = products.filter(p => !p.isSold);
    const filteredItems = unSoldProducts.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [...products];

    const sortedProducts = [...filteredItems].sort((a, b) => {
        if (sort === 'Name') {
            return a.name.localeCompare(b.name);
        }if (sort === 'Price') {
            return a.price - b.price;
        }if (sort === 'Data'){
            return new Date(a.date) - new Date(b.date);
        }
        return 0;
    });

    return (
        <section className="main">
            {filteredItems.length > 0 ?
                <article>
                    <section className="px-5 py-2 bg-gray-100 flex justify-between items-center">
                        <p className="text-2xl text-semibold">Search Results:</p>
                        <form>
                            <label htmlFor="sort" className="mx-2">Sort By :</label>
                            <select id="sort" name="sort" onChange={(e)=>setSort(e.target.value)}>
                                <option disabled>Sort By:</option>
                                <option value={'Name'}>Name</option>
                                <option value={"Price"}>Price</option>
                                <option value={"Date"}>Listed Date</option>
                            </select><br />
                        </form>
                    </section>
                    <section className="my-5 grid grid-cols-5 gap-10">
                        {sortedProducts.map((product, index) => {
                            return <ProductCard
                                key={index}
                                imageName={product.imageNames[0]}
                                name={product.name}
                                price={product.price}
                                id={product.id}
                            />
                        })}
                    </section></article> :
                <div className="flex justify-center pt-40 text-gray-500">
                    <p className="text-5xl">Nothing found, try searching again.</p>
                </div>}
        </section>
    )
}

export default SearchResults;