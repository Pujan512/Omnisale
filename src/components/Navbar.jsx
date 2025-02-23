import { useRef, useState } from "react";
import { getCurrentUser } from "../authService";
import { Link, useNavigate, useSearchParams } from "react-router";
import UserPopup from "./User/UserPopup";
import { useEffect } from "react";
import { logout } from "../authService";

const Navbar = () => {
    const navigate = useNavigate();
    const searchRefxl = useRef(null);
    const searchRefmd = useRef(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [ham, setHam] = useState('|||');
    const [searchParams, setSearchParams] = useSearchParams();
    const [text, setText] = useState('');
    useEffect(() => {
        if (sessionStorage.getItem("adminRole")) {
            const bytes = atob(sessionStorage.getItem("adminRole"));
            const decoded = new TextDecoder('utf-8').decode(new Uint8Array([...bytes].map(char => char.charCodeAt(0))));
            setText(decoded);
        }
    }, [text])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const togglePopup = () => {
        setIsPopupVisible(prev => !prev);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    const handleSearch = (searchRef) => {
        const query = searchRef.current.value.trim();
        if (query) {
            setSearchParams({ query });
            searchRef.current.value = '';
            navigate(`/search?query=${query}`)
        }
    }

    return (
        <nav className="flex justify-between items-center bg-zinc-800 text-white sticky top-0 py-2 px-4 lg:px-10 text-lg" >
            <div className="flex gap-3 lg:gap-5 items-center">
                <div className="lg:hidden rotate-90 text-3xl cursor-pointer" onClick={() => setHam(prev => prev == "|||" ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg> : "|||")}>{ham}</div>
                <Link className="cursor-pointer text-xl lg:text-2xl" to="/"><img className="h-10" src="/OmniLogo.png" alt="logo"/></Link>
                <Link className="hidden lg:inline cursor-pointer" to="/" onClick={scrollToTop}>Home</Link>
                <a href="/#category" className="hidden lg:inline cursor-pointer" >Category</a>
            </div>

            {ham != "|||" && <div className={`lg:hidden flex absolute left-0 top-14 w-full bg-zinc-600 flex-col items-center z-99`}>
                <div className="p-2">
                    <div className="border-1 p-2 rounded-md min-w-sm flex">
                        <input className=" flex-auto px-5 focus:outline-none" type="text" placeholder="Search" ref={searchRefmd} onKeyDown={(e) => { if (e.key == 'Enter') { handleSearch(searchRefmd); setHam("|||") } }} />
                        <button className="cursor-pointer hover:bg-zinc-600 rounded-full p-2" onClick={() => { handleSearch(searchRefmd); setHam("|||") }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </button>
                    </div>
                </div>
                <Link className="hover:text-red-400" to="/" onClick={() => { scrollToTop(); setHam("|||") }}>Home</Link>
                <a href="/#category" className="cursor-pointer hover:text-red-400 p-2" onClick={() => setHam("|||")}>Category</a>
                <Link className="pb-2" to="/about" onClick={() => setHam("|||")}>About Us</Link>
            </div>}

            <div className="hidden lg:flex">
                <div className="border-1 p-2 rounded-md min-w-sm flex">
                    <input className=" flex-auto px-5 focus:outline-none" type="text" placeholder="Search" ref={searchRefxl} onKeyDown={(e) => { if (e.key == 'Enter') handleSearch(searchRefxl) }} />
                    <button className="cursor-pointer hover:bg-zinc-600 rounded-full p-2" onClick={() => handleSearch(searchRefxl)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </button>
                </div>
            </div>
            {getCurrentUser() ?
                <div className="flex gap-2">
                    {text == "PujanNirjala" ? <>
                        <Link className="pt-2 px-2 cursor-pointer" to={"/admin"}>Admin</Link>
                        <a className="cursor-pointer bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-md" onClick={() => { logout(); navigate('/'); window.location.reload() }}>Logout</a>
                    </> : <>
                        <button className="text-red-400 border-1 font-semibold text-base lg:text-xl rounded-md flex gap-2 pr-4 items-center hover:bg-red-500 hover:text-white cursor-pointer" onClick={() => navigate('/AddProd')}>
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
                        <UserPopup isVisible={isPopupVisible} onClose={closePopup} />
                    </>}
                </div>
                :
                <div className="flex gap-2 text-base
                                lg:gap-5 lg:text-xl lg:w-60 lg:relative lg:justify-end lg:right-0">
                    <Link className="cursor-pointer bg-zinc-700 hover:bg-zinc-600 text-white lg:px-4 px-3 py-2 rounded-md" to="/login" >Login</Link>
                    <Link className="cursor-pointer bg-zinc-700 hover:bg-zinc-600 text-white lg:px-4 px-3 py-2 rounded-md" to="/signup">Sign Up</Link>
                </div>
            }
        </nav>
    )
}

export default Navbar;