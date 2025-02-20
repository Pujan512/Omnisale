import { useState, useRef } from "react";
import { Link } from "react-router";
import VerifyOtp from "./VerifyOtp";

export default function ResetPassword() {
    const otpRef = useRef();
    const passRef = useRef([]);
    const [otpData, setotpData] = useState(null);
    const email = sessionStorage.getItem('email');
    const [msg, setMsg] = useState('');

    const handleVerify = (e) => {
        e.preventDefault();
        const otpObj = { email: email, otp: otpRef.current.value }
        fetch(import.meta.env.VITE_API_URL_USER + "verifyotp",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(otpObj)
        }).then(res => {
            const data = res.json()
            if(!res.ok)
            {
                setMsg(data.Message);
                throw Error(data.Message);
            }
            return data;
        })
        .then(data => {
            setotpData(data);
        }).catch(err => console.log(err));
    }

    const handlePassword = (e) => {
        e.preventDefault();
        if(passRef.current[0].value != passRef.current[1].value){
            setMsg("error");
            setTimeout(()=>{
                setMsg("error")
            },[2000])
            return false;
        }
        
        fetch(import.meta.env.VITE_API_URL_USER + "resetpassword",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...otpData, newPassword: passRef.current[0].value})
        }).then((res)=>{
            if(!res.ok){
                setMsg(res.json())
            }
            passRef.current.forEach(el => el.value = '');
            setMsg('success');
        }).catch(err=>console.log(err))
    }

    return (
        <section className="main h-110.5">
            {otpData == null ? <VerifyOtp otpRef={otpRef} handleSubmit={handleVerify}/>:
            <form onSubmit={handlePassword} key="pass" className="flex flex-col gap-2 w-85 py-5 text-sm text-black">
                <h2 className="text-3xl py-2">Reset Password</h2>
                <p>Your password must be at least 8 characters.</p>
                <input className="border-1 rounded-sm w-full p-2" type="password" placeholder="Password" id="password" ref={el => passRef.current[0] = el}/>

                {msg == 'error' && <p className="text-red-500">Confirm Password doesn't match with Password.</p>}
                <input className="border-1 rounded-sm w-full p-2" type="password" placeholder="Confirm Password" id="confirmPassword" ref={el => passRef.current[1] = el}/>

                <input className="size-fit border-1 p-2 cursor-pointer text-red-500 hover:bg-red-500 hover:text-white rounded-sm" type="submit" value="Change Password" />
            </form>}
                {msg == 'success' && <>
                    <p className="text-green-500">Password has been reset successfully.</p>
                    <Link to='/login'>Go to login</Link>
                </>}
        </section>
    )
}