import { useState } from "react";
import UserAdmin from "./UserAdmin";
import CategoryAdmin from "./CategoryAdmin";
import ProductAdmin from "./ProductAdmin";
import OrderAdmin from "./OrderAdmin";

const Dashboard = () => {

    const [active, setActive] = useState('A')
    const renderComponent = () => {
        switch (active) {
            case 'A':
                return <UserAdmin />;
            case 'B':
                return <CategoryAdmin />;
            case 'C':
                return <ProductAdmin />;
            case 'D':
                return <OrderAdmin />;
        }
    }

    return (
        <section className="flex min-h-135">
            <aside className="px-10 py-5 text-zinc-700 bg-gray-200">
                <nav>
                    <ul className="flex flex-col gap-5 text-xl">
                        <li className={`${(active == 'A')?"text-red-600":""} cursor-pointer`} onClick={() => setActive('A')}>Manage Users</li>
                        <li className={`${(active == 'B')?"text-red-600":""} cursor-pointer`} onClick={() => setActive('B')}>Manage Categories</li>
                        <li className={`${(active == 'C')?"text-red-600":""} cursor-pointer`} onClick={() => setActive('C')}>Manage Products</li>
                        <li className={`${(active == 'D')?"text-red-600":""} cursor-pointer`} onClick={() => setActive('D')}>Manage Orders</li>
                    </ul>
                </nav>
            </aside>

            <section className="flex-1 py-5 px-10">
                {
                    renderComponent()
                }
            </section>
        </section>
    )
}

export default Dashboard;