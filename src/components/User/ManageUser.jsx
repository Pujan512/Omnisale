import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router";

const ManageUser = () => {
    const inputRefs = useRef([]);
    const [msg, setMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(import.meta.env.VITE_API_URL_USER + 'changepassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${document.cookie.split('=')[1]}`
            },
            body: JSON.stringify({
                email: sessionStorage.getItem('email'),
                currentPassword: inputRefs.current[0].value,
                newPassword: inputRefs.current[1].value
            }).then(res => res.json())
            .then(data => {
                setMsg(data.message)
                const msgTimeout = setTimeout(()=>{
                    setMsg('');
                },[2000])
            })
            .catch(err => console.log(err))
            .finally(()=>clearTimeout(msgTimeout))
        })
    }
    return (
        <section className="main h-110.5">
            <h2 className="text-3xl py-2">Change Password</h2>
            {msg.length > 0 && <p className="text-red-500">{msg}</p>}
            <p>Your password must be at least 8 characters.</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-85 py-5 text-sm text-black">
                {/* <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}: </label> */}
                <input
                    placeholder={"Old Password"}
                    className="border-1 rounded-sm w-full p-2"
                    type="password"
                    ref={el => inputRefs.current[0] = el}
                />
                {/* <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}: </label> */}
                <input
                    placeholder={"New Password"}
                    className="border-1 rounded-sm w-full p-2"
                    type="password"
                    ref={el => inputRefs.current[1] = el}
                />
                {/* <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}: </label> */}
                <input
                    placeholder={"Confirm New Password"}
                    className="border-1 rounded-sm w-full p-2"
                    type="password"
                    ref={el => inputRefs.current[2] = el}
                />
                <Link className="text-blue-500 text-right" to="/forgotPassword">Forgot your password?</Link>
                <input type="submit" value="Change Password" className="border-1 rounded-sm cursor-pointer size-fit p-2 text-red-500 hover:text-white hover:bg-red-500" />
            </form>
        </section>
    )
}

export default ManageUser;