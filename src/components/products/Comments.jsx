import { useState } from "react";
import { getCurrentUser } from "../../authService";

const Comments = ({ comments, setComments, productId, creatorId }) => {

    const [comment, setComment] = useState('');
    const handleDelete = (id) => {
        fetch(import.meta.env.VITE_API_URL_COMMENT + id, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${document.cookie.split('=')[1]}`
            }
        }).then(() => {
            const updatedComments = comments.filter(c => c.id != id);
            setComments(updatedComments);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(import.meta.env.VITE_API_URL_COMMENT + productId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${document.cookie.split('=')[1]}`
            },
            body: JSON.stringify({
                "content": comment,
                "userId": sessionStorage.getItem('user'),
                "createdBy": sessionStorage.getItem('userName')
            })
        }).then(res => res.json())
            .then(data => {
                setComments([...comments, data])
                setComment('');
            })
    }

    return (
        <article>
            <div className="border-1 rounded-sm px-8 py-6 flex flex-col gap-3">
            <p className="text-3xl font-semibold">Comments</p>
            {getCurrentUser() && <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input className="border-1 rounded-sm p-2 flex-1" type="text" id="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                <input type="submit" value="Add" className="cursor-pointer border-1 rounded-sm p-2 px-4 text-red-500 hover:text-white hover:bg-red-500" />
            </form>}
                {comments && comments.length > 0 &&
                    comments.map((commentObj, index) => {
                        return (
                            <div key={index} className="bg-gray-200 px-4 py-2 relative">
                                <div>
                                    <p className="text-xl font-semibold">{commentObj.createdBy}</p>
                                    <p className="text-sm text-gray-700">{commentObj.createdDate.split('T')[0]}</p>
                                </div>
                                <p>{commentObj.content}</p>
                                {commentObj.userId == sessionStorage.getItem("user") && <button className="cursor-pointer rounded-sm text-red-500 absolute right-2 top-2" onClick={() => handleDelete(commentObj.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                    </svg>
                                </button>}
                            </div>
                        )
                    })
                }
            </div>
        </article>
    )
}

export default Comments;