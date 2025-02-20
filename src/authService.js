import { jwtDecode } from "jwt-decode";

const auth = async( authType, formData ) => {
    const res = await fetch(import.meta.env.VITE_API_URL_USER + authType, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });
    const data = await res.json();
    if(!res.ok)
    {
        throw new Error(data.message);
    }
    else{
        if(authType == "adminlogin")
            sessionStorage.setItem("adminRole",data.adminRole)
        sessionStorage.setItem("user",data.userId)
        sessionStorage.setItem("email",data.email)
        sessionStorage.setItem("userName",`${data.firstName}${data.middleName ? ' '+data.middleName.split('')[0]+'.' : ''} ${data.lastName}`)
        sessionStorage.setItem("location",data.location)
        document.cookie = `token=${data.token}`    
    }
}

const logout = () => {
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("location")
    sessionStorage.removeItem("userName")
    sessionStorage.removeItem("email")
    sessionStorage.removeItem("adminRole")
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const getCurrentUser = () => {
    if (!document.cookie)
        return "";
    const token = document.cookie.split('=')[1];
    const decoded = jwtDecode(token);
    return decoded;
}

export {
    auth,
    logout,
    getCurrentUser
}