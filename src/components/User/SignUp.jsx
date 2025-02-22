import { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { auth } from "../../authService";
import SearchLocation from "./SearchLocation";
import Loading from "../Loading";

const SignUp = () => {
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [terms, setTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState('')

    const formFields = ['firstname', 'middlename', 'lastname', 'email', 'password', 'confirmPassword']

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')

        const formData = {
            "location": (location)
        };
        inputRefs.current.map((ref, index) => {
            formData[formFields[index]] = ref.value
        });

        if (formData.password != formData.confirmPassword) {
            setError('confirmPass');
            return false;
        }

        if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/.test(formData.password)) {
            setError('password');
            return false;
        }

        if(!terms){
            setError('terms');
            return false;
        }
        if(!formData.location){
            setError('location');
            return false;
        }

        setLoading(true);
        fetch(import.meta.env.VITE_API_URL_USER + "register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }).then(res => res.json())
            .then(data => {
                sessionStorage.setItem("email", data.email)
                navigate(`/confirmEmail`)
            }).catch(error =>
                console.log(error))
            .finally(() =>
                setLoading(false)
            )

    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    return (
        <>
            <section className={`main flex flex-col items-center justify-center flex-1`}>
            {loading && <Loading />}
                <form onSubmit={handleSubmit} className={`${loading && "hidden"} flex flex-col gap-2 lg:w-110 bg-zinc-700 p-5 pb-10 rounded-md text-white text-sm`}>
                <h2 className="text-2xl">Create an account</h2>
                    {formFields.filter(el => el != "confirmPassword").map((name, index) => (
                        <div key={name}>
                            {error == name && <p className="text-red-400">{name.charAt(0).toUpperCase()+name.slice(2)} error</p>}
                            {name == "password" && <p className="text-xs text-gray-300">Password must have at least 8 characters and must contain an uppercase, number and non-alphanumeric.</p>}
                            {/* <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}: </label><br /> */}
                            <input
                                placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                                className="border-1 rounded-sm p-2 w-full"
                                type={name}
                                id={name}
                                ref={el => inputRefs.current[index] = el}
                                onKeyDown={handleKeyPress}
                                required = {name != "middlename"}
                            />
                        </div>
                    ))}
                    {error == 'confirmPass' && <p className="text-red-400">Confirm Password doesn't match with Password.</p>}
                    <div>
                        {/* <label htmlFor="confirmPassword">Confirm Password: </label><br /> */}
                        <input
                            placeholder="Confirm Password"
                            className="border-1 rounded-sm p-2 w-full"
                            type='password'
                            id='confirmPassword'
                            ref={el => inputRefs.current[5] = el}
                            onKeyDown={handleKeyPress}
                            required
                        />
                    </div>

                    {error == 'location' && <p className="text-red-400">Please choose the location after searching location.</p>}
                    <SearchLocation setLocation={setLocation} />

                    {error == 'terms' && <p className="text-red-400">Please check the box after reading terms and conditions.</p>}
                    <div className="flex items-center">
                        <input className="w-5 h-5 mr-2" type="checkbox" name="terms" id="terms" checked={terms} onChange={() => setTerms(!terms)}/><br />
                        <label htmlFor="terms" className="text-sm"> I hereby accept all the <Link className="text-blue-400" to='/terms'>Terms & Conditions</Link> of OmniSale.</label>
                    </div>

                    <input type="submit" value="SignUp" className="border-1 rounded-sm cursor-pointer lg:w-20 p-2 text-red-400 hover:text-white hover:bg-red-500" />
                </form>
                <p className={`${loading && "hidden"} text-sm`}>Already have an account? <Link className="text-blue-600" to="/login">Log in</Link></p>
            </section>
        </>
    )
}

export default SignUp;