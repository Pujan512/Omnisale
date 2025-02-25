
import { useRef } from "react"
import { useNavigate } from "react-router";
import VerifyOtp from "./VerifyOtp";

export default function ConfirmEmail() {
    const otpRef = useRef(null);
    const navigate = useNavigate();
    const email = sessionStorage.getItem('email');
    // const [countDown, setCountDown] = useState(120);

    const handleSubmit = (e) => {
        e.preventDefault();
        const otpObj = { email: email, otp: otpRef.current.value }
        fetch(import.meta.env.VITE_API_URL_USER + "verifyotp", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(otpObj)
        }).then(res => res.json())
            .then(data => {
                fetch(import.meta.env.VITE_API_URL_USER + "confirmemail", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(res => res.json())
                    .then(user => {
                        sessionStorage.setItem("user", user.userId)
                        sessionStorage.setItem("userName", `${user.firstName}${user.middleName ? ' ' + user.middleName.split('')[0] + '.' : ''} ${user.lastName}`)
                        sessionStorage.setItem("location", user.location)
                        sessionStorage.setItem("email", user.email)
                        document.cookie = `token=${user.token}`
                        navigate('/');
                    }).catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    // useEffect(()=>{
    //     const interval = setInterval(()=>{
    //         if(countDown > 0)
    //         setCountDown(prev => prev - 1);
    //     },[1000])

    //     return ()=>{
    //         clearInterval(interval);
    //     }
    // },[])
    return (
        <section className="main">
            <VerifyOtp otpRef={otpRef} handleSubmit={handleSubmit}/>
        </section>
    )
}