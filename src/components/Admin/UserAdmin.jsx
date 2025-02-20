import { useState } from "react"
import { useEffect } from "react"

export default function UserAdmin() {
    const [users, setUsers] = useState([]);
    const normalUsers = users.filter(u => u.id != sessionStorage.getItem('user'));

    const fetchUsers = () => {
        fetch(import.meta.env.VITE_API_URL_ADMIN,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${document.cookie.split('=')[1]}`
            }
        })
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        fetch(import.meta.env.VITE_API_URL_ADMIN + id,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${document.cookie.split('=')[1]}`
            }
        }).then(()=>{
            const updatedUsers = users.filter(u => u.id != id)
            setUsers(updatedUsers);
        })
        .catch(err => console.log(err))
    }

    useEffect(()=>{
        fetchUsers();
    },[])
    return (
        <section>
            <table className="w-full table-auto ">
                <thead>
                    <tr className="text-center bg-gray-200">
                        <th className="w-12">S.N.</th>
                        <th className="w-50">User ID</th>
                        <th className="w-25">First Name</th>
                        <th>Middle Name</th>
                        <th className="w-25">Last Name</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-500 text-center">
                    {normalUsers.length > 0 && normalUsers.map((user, index) => {
                        return <tr key={index}>
                            <td className="py-2">{index + 1}</td>
                            <td className="overflow-x-auto">{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.middleName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td><button onClick={() => handleDelete(user.id)} className="cursor-pointer bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md">Delete</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </section>
    )
}