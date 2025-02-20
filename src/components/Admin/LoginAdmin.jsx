import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import Loading from "../Loading"
import { auth, logout } from "../../authService";

const LoginAdmin = () => {
    const inputRefs = useRef([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formFields = ['email', 'password']
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { email: inputRefs.current[0].value, password: inputRefs.current[1].value }
        try {
            setLoading(true);
            logout();
            await auth("adminlogin", formData);
            navigate('/admin');
            window.location.reload()
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="main flex flex-col h-110.5 justify-center items-center">
            {loading && <Loading />}
            <form onSubmit={handleSubmit} className={`${loading && "hidden"} flex flex-col gap-2 w-85 bg-zinc-700 p-5 pb-10 rounded-md text-white text-sm`}>
                <h2 className="text-3xl py-2">Admin Login</h2>
                {formFields.map((name, index) => (
                    <div key={name}>
                        {/* <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}: </label> */}
                        <input
                            placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                            className="border-1 rounded-sm w-full p-2"
                            type={name}
                            id={name}
                            ref={el => inputRefs.current[index] = el}
                        />
                    </div>
                ))}
                {error && <p className="text-red-500">{error}</p>}
                <input type="submit" value="Login" className="border-1 rounded-sm cursor-pointer w-20 p-2 text-red-500 hover:text-white hover:bg-red-500" />
            </form>
        </section>
    )
}

export default LoginAdmin;