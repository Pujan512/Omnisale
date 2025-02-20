import { useRef, useState } from "react";
import { getCurrentUser } from "../authService";
import { Link, useNavigate, useSearchParams } from "react-router";
import UserPopup from "./User/UserPopup";

const Navbar = () => {
    const navigate = useNavigate();
    const searchRef = useRef(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const togglePopup = () => {
        setIsPopupVisible(prev => !prev);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    const handleSearch = () => {
        const query = searchRef.current.value.trim();
        if (query) {
            setSearchParams({ query });
            searchRef.current.value = '';
            navigate(`/search?query=${query}`)
        }
    }

    return (
        <nav className="flex justify-between items-center bg-zinc-800 text-white sticky top-0 py-2 px-10 text-lg" >
            <div className="flex gap-5 items-center">
                <Link className="cursor-pointer text-2xl" to="/">OmniSale</Link>
                <Link className="cursor-pointer" to="/" onClick={scrollToTop}>Home</Link>
                <a href="/#category" className="cursor-pointer">Category</a>
            </div>

            <div className="flex border-1 p-2 rounded-md min-w-sm ">
                <input className="flex-auto px-5 focus:outline-none" type="text" placeholder="Search" ref={searchRef} onKeyDown={(e) => { if (e.key == 'Enter') handleSearch() }} />
                <button className="cursor-pointer hover:bg-zinc-600 rounded-full p-2" onClick={handleSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                </button>
            </div>
            {getCurrentUser() ?
                <div className="flex gap-2 w-60 relative justify-end right-0">
                    <button className="text-red-400 border-1 font-semibold text-xl rounded-md flex gap-2 pr-4 items-center hover:bg-red-500 hover:text-white cursor-pointer" onClick={() => navigate('/AddProd')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-plus inline " viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg> Add
                </button>
                    <Link className="cursor-pointer p-2 hover:bg-zinc-600" to="/cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16" >
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                    </Link>
                    <a className="userIcon cursor-pointer p-2 hover:bg-zinc-600" onClick={togglePopup}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="userIcon bi bi-person-circle" viewBox="0 0 16 16">
                            <path className="userIcon" d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path className="userIcon" fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                        </svg>
                    </a>
                    <UserPopup isVisible={isPopupVisible} onClose={closePopup}/>
                    <Link className="cursor-pointer" to="/admin" onClick={scrollToTop}>Admin</Link>
                </div>
                :
                <div className="flex gap-5 w-60 relative justify-end right-0">
                    <Link className="cursor-pointer bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-md" to="/login" >Login</Link>
                    <Link className="cursor-pointer bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-md" to="/signup">Sign Up</Link>
                </div>
            }
        </nav>
    )
}

export default Navbar;