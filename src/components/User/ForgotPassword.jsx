import { useState } from "react";
import { useRef } from "react"
import { useNavigate } from "react-router";
import Loading from "../Loading";

export default function ForgotPassword() {
    const emailRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch(import.meta.env.VITE_API_URL_USER + "forgotpassword", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailRef.current.value)
        }).then(response => {
            if (response.ok) {
                sessionStorage.setItem('email', emailRef.current.value);
                navigate('/resetPassword');
            }
            return response.json();
        }).then(data => {
            setError(data.message);
            const errTimeout = setTimeout(() => {
                setError('');
            },[2000])
        }).catch(err => {
            console.error(err);
        }).finally(() => {
            setLoading(false);
            clearTimeout(errTimeout);
        });
    }
    return (
        <section className="main h-110.5 flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit} className={`w-85 ${loading && "hidden"}`}>
                <p className="text-sm py-3">Forgot your account's password? Enter your email address and we'll send you an OTP to recover your email.</p>
                <div className="flex flex-col gap-2">
                    <input className="border-1 w-full p-2 rounded-sm" type="email" placeholder="Email" ref={emailRef} />
                {error && <p className="text-red-700">{error}</p>}
                    <input className="border-1 p-2 cursor-pointer rounded-sm size-fit text-red-500 hover:bg-red-500 hover:text-white" type="submit" value="Send OTP" />
                </div>
            </form>
            {loading && <Loading />}
        </section>
    )
}