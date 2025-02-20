import { Link } from "react-router";
import { getCurrentUser } from "../authService";

const Footer = () => {
    const bytes = atob(sessionStorage.getItem("adminRole"));
    const text = new TextDecoder('utf-8').decode(new Uint8Array([...bytes].map(char => char.charCodeAt(0))));
    return (
        <footer className="bg-zinc-800 w-full text-white h-15 flex items-center justify-between px-10 relative bottom-0">
            <div className="flex flex-col items-center">
                <p>Payment method</p>
                <img src="/logo/Khalti_Logo_white.png" alt="logo" className="h-8 " />
            </div>
            <ul className="flex gap-10">
                <li className="cursor-pointer hover:bg-gray-700 p-2">About Us</li>
                <li className="cursor-pointer hover:bg-gray-700 p-2">Terms & Conditions</li>
                <li className="cursor-pointer hover:bg-gray-700 p-2">Privacy Policy</li>
                <li className="cursor-pointer hover:bg-gray-700 p-2">
                    <a href="mailto:omnisalemarket@gmail.com">Contact Us</a>
                </li>
                {getCurrentUser() && text == "PujanNirjala" && <li className="cursor-pointer hover:bg-gray-700 p-2"><Link to="/admin">Admin</Link></li>}
            </ul>
            <span>&copy;2025 OmniSale</span>
        </footer>
    )
}

export default Footer;