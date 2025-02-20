import { useState } from "react"
import Loading from "../Loading";

export default function VerifyOtp({ otpRef, handleSubmit }) {

    const [msg, setMsg] = useState("The OTP has been sent to your email. ");
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        setLoading(true);
        fetch(import.meta.env.VITE_API_URL_USER + "resendotp", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sessionStorage.getItem('email'))
        }).then((res) => {
            if (res.ok)
                setMsg("New OTP has been sent to your email.");
        }).catch(err => console.log(err))
            .finally(() => setLoading(false));
    }
    return (
        <section className="main h-110.5 flex flex-col items-center">
            <form onSubmit={handleSubmit} className="w-85 flex flex-col gap-2">
                <div className="h-12 py-5">{loading ? <Loading /> : <strong>{msg}</strong>}</div>
                <a className="text-blue-700 cursor-pointer text-sm hover:underline" onClick={handleClick}>Resend OTP</a>
                <input className="border-1 w-full p-2 rounded-sm" type="text" placeholder="Enter OTP" ref={otpRef} />
                <input className="size-fit p-2 rounded-sm text-red-500 cursor-pointer border-1 hover:bg-red-500 hover:text-white" type="submit" value="Verify" />
            </form>
        </section>
    )
}