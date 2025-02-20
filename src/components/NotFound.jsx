import { Link } from "react-router";

export default function NotFound() {

    return (
        <section className="main h-110.5 items-center flex flex-col justify-center gap-2">
            <p className="text-8xl">404 Not Found</p>
            <p className="text-gray-700">This page doesn't exist</p>
            <Link to='/' className="hover:text-white hover:bg-red-500 border-1 cursor-pointer text-red-500 p-2 size-fit rounded-sm">Back To Homepage</Link>
        </section>
    )
}