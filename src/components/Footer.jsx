import { Link } from "react-router";

const Footer = () => {
    
    return (
        <footer className="text-sm px-2 md:text-base bg-zinc-800 w-full text-white md:h-15 flex items-center mt-auto justify-around md:justify-between md:px-10">
            <div className="md:flex flex-col items-center hidden">
                <p>Payment method</p>
                <img src="/logo/Khalti_Logo_white.png" alt="logo" className="h-8 " />
            </div>
            <ul className="flex gap-2 md:gap-10">
                <li className="cursor-pointer hover:bg-gray-700 p-2"><Link to="/about">About Us</Link></li>
                <li className="hidden md:flex cursor-pointer hover:bg-gray-700 p-2"><Link to="/terms">Terms & Conditions</Link></li>
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