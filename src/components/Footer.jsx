import { Link } from "react-router";

const Footer = () => {
    
    return (
        <footer className="text-[0.75rem] lg:text-sm px-2 lg:text-base bg-zinc-800 w-full text-white lg:h-15 flex items-center mt-auto justify-around lg:justify-between lg:px-10">
            <div className="lg:flex flex-col items-center hidden">
                <p>Payment method</p>
                <img src="/logo/Khalti_Logo_white.png" alt="logo" className="h-8 " loading="lazy"/>
            </div>
            <ul className="flex gap-2 lg:gap-10">
                <li className="cursor-pointer hover:bg-gray-700 p-2"><Link to="/about">About Us</Link></li>
                <li className="hidden lg:flex cursor-pointer hover:bg-gray-700 p-2"><Link to="/terms">Terms & Conditions</Link></li>
                <li className="cursor-pointer hover:bg-gray-700 p-2"><Link to="/privacy">Privacy Policy</Link></li>
                <li className="cursor-pointer hover:bg-gray-700 p-2">
                    <a href="mailto:omnisalemarket@gmail.com">Contact Us</a>
                </li>
            </ul>
            <span>&copy;2025 OmniSale</span>
        </footer>
    )
}

export default Footer;