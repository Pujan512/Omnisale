import { useState } from "react";
import ManageUser from "./ManageUser";
import ManageProducts from "./ManageProducts";
import Purchase from "./Purchase";

const User = () => {

    const [active, setActive] = useState('B')
    const renderComponent = () => {
        switch (active) {
            case 'B':
                return <ManageProducts />;
            case 'C':
                return <Purchase />;
        }
    }

    return (
        <section className="flex flex-1 flex-col lg:flex-row">
            <aside className="px-10 py-5 text-zinc-700 bg-gray-200">
                <nav>
                    <ul className="flex justify-between lg:flex-col gap-5 text-xl">
                        <li className={`${(active == 'B')?"text-red-600":""} cursor-pointer`} onClick={() => setActive('B')}>My Products</li>
                        <li className="lg:hidden">|</li>
                        <li className={`${(active == 'C')?"text-red-600":""} cursor-pointer`} onClick={() => setActive('C')}>My Orders</li>
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

export default User;