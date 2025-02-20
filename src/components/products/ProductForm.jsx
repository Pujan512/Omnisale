import { useContext, useMemo, useState, useEffect } from "react";
import { ProductContext, CategoryContext, PointContext } from "../../Context/OmniContext";
import { useNavigate, useParams } from "react-router";

const ProductForm = () => {
    const { products, setProducts } = useContext(ProductContext);
    const { point, setPoint } = useContext(PointContext);
    const { categories } = useContext(CategoryContext);
    const [error, setError] = useState('');
    const userId = sessionStorage.getItem("user");
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        userId: '',
        categoryId: 1,
        ImageNames: [],
        ImageFiles: null,
        description: '',
        available: 1,
        delivery: 'Platform'
    });
    const navigate = useNavigate();
    const { id } = useParams() ?? "";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            ImageFiles: e.target.files
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (point < 20) {
            setError('point');
            setTimeout(() => {
                setError('');
            }, [2000])
            return false;
        }

        const newProduct = new FormData();
        newProduct.append("name", formData.name)
        newProduct.append("price", parseInt(formData.price * 1.05))
        newProduct.append("categoryId", formData.categoryId)
        newProduct.append("description", formData.description)
        newProduct.append("available", formData.available)
        newProduct.append("delivery", formData.delivery)
        newProduct.append("userId", userId)
        Object.keys(formData.ImageFiles).forEach((key) => {
            newProduct.append('ImageFiles', formData.ImageFiles[key]);
        });

        const url = id
            ? `${import.meta.env.VITE_API_URL_PRODUCT}${id}`
            : import.meta.env.VITE_API_URL_PRODUCT;

        fetch(url, {
            method: id ? "PUT" : "POST",
            body: newProduct,
            headers: {
                'Authorization': `Bearer ${document.cookie.split('=')[1]}`
            }
        }).then(response => response.json())
            .then(data => {
                if (id) {
                    const updatedProducts = products.map(p =>
                        p.id === id ? { ...newProduct, id } : p
                    );
                    setProducts(updatedProducts);
                } else {
                    setProducts([...products, data]);
                    fetch(import.meta.env.VITE_API_URL_POINT + userId, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${document.cookie.split('=')[1]}`
                        },
                        body: JSON.stringify(point - 15)
                    }).then(res => res.json())
                        .then(pts => {
                            setPoint(pts.value)
                        }).catch(err => console.log(err))
                }
                navigate('/');
                window.location.reload();
            }).catch(err => {
                console.log(err);
            });
    };


    useEffect(() => {
        if (id) {
            const product = products.find(p => p.id == id);
            if (product) {
                setFormData(product);
            }
        }
    }, []);

    const categoryOptions = useMemo(() => categories.map((category, index) => (
        <option className="text-black" key={index} value={category.id}>{category.name}</option>
    )), [categories]);

    return (
        <section className="main flex justify-center">
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex bg-zinc-700 flex-col gap-4 w-150 px-10 py-5 text-white rounded-sm">
            <p className="text-2xl font-semibold text-center">Enter Product Details</p>
                {/* ProductName */}
                <div className="flex items-center justify-between">
                    <article>
                        <label htmlFor="name">Name: </label>
                        <input id="name" required name="name" type="text" value={formData.name} className="border-1 p-2 w-60" onChange={handleChange} /><br />
                    </article><article>
                        {/* ProductPrice */}
                        <label htmlFor="price">Price: </label>
                        <input id="price" required name="price" type="number" value={formData.price} className="border-1 p-2 w-60" onChange={handleChange} /><br />
                    </article>
                </div><div>
                    {/* ProductCategory */}
                    <label htmlFor="category">Category: </label>
                    <select id="category" name="categoryId" onChange={handleChange} value={formData.categoryId}>
                        <option disabled>Categories:</option>
                        {categoryOptions}
                    </select><br />
                </div><div>
                    {/* ProductImages */}
                    <label htmlFor="images">Product Images: </label>
                    <input type="file" id="images" required multiple accept="image/*" name="imgSrc" onChange={handleFileChange}
                        className=" text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    /><br />
                </div><div className="flex justify-between items-center">
                    <article>
                        {/*Available Quantity*/}
                        <label htmlFor="available">Available Quantity: </label>
                        <input className="border-1 p-2 ml-5 w-15" type="number" name="available" id="available" onChange={handleChange} value={formData.available} />
                    </article><article className="flex gap-2">
                        {/*Delivery*/}
                        <label>Delivery: </label>
                        <input type="radio" name="delivery" id="self" value="Self" onChange={handleChange} checked={formData.delivery == "Self"} />
                        <label htmlFor="self">Self </label>
                        <input type="radio" name="delivery" id="platform" value="Platform" onChange={handleChange} checked={formData.delivery == "Platform"} />
                        <label htmlFor="platform">Platform</label><br />
                    </article>
                </div><div>

                    {/* ProductDescription */}
                    <label htmlFor="description">Description: </label><br />
                    <textarea required className="border-1 p-2 w-full"  rows={10}
                        name="description" id="description" onChange={handleChange} value={formData.description}></textarea>
                </div>
                <input type="submit" value={id ? "Update" : "Add(-20pts)"} className="cursor-pointer rounded-md border-1 hover:text-white text-red-500 py-2 px-4 hover:bg-red-500" />
            </form>
            {error == "point" && <span className="text-red-600">You don't have enough points.</span>}
        </section>
    );
};

export default ProductForm;
