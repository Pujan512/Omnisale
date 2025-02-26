import { useState, useRef } from "react";
import { Link, Links, useNavigate } from "react-router";
import { auth } from "../../authService";
import Loading from "../Loading";

const Login = () => {
    const inputRefs = useRef([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formFields = ['email', 'password']

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {};
        inputRefs.current.map((ref, index) => {
            formData[formFields[index]] = ref.value
        });

        try {
            setLoading(true);
            await auth("login", formData);
            navigate('/');
            window.location.reload();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={`main flex flex-col items-center justify-center flex-1`}>
            {loading && <Loading />}
            <form onSubmit={handleSubmit} className={`${loading && "hidden"} flex flex-col gap-2 w-85 bg-zinc-700 p-5 pb-10 rounded-md text-white text-sm`}>
                <h2 className="text-3xl py-2">Login</h2>
                {formFields.map((name, index) => (
                    <div key={name}>
                        {/* <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}: </label> */}
                        <input
                            placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                            className="border-1 rounded-sm w-full p-2"
                            type={name}
                            id={name}
                            ref={el => inputRefs.current[index] = el}
                            required
                        />
                    </div>
                ))}
                <Link className="cursor-pointer text-xs text-blue-400 text-right" to="/forgotPassword">Forgot Password?</Link>
                {error && <p className="text-red-500">{error}</p>}
                <input type="submit" value="Login" className="border-1 rounded-sm cursor-pointer p-2 text-red-500 hover:text-white hover:bg-red-500" />
            </form>
            <p className={`${loading && "hidden"} text-sm`}>Don't have an account? <Link className="text-blue-600" to="/signup">Sign Up</Link></p>
            <Link className={`${loading && "hidden"} text-sm text-blue-600`} to='/adminLogin'>Admin Login</Link>
        </section>
    )
}

export default Login;