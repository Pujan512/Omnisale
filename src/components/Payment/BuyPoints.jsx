import { Link } from "react-router";
import Payment from "./Payment";

const BuyPoints = () => {
    const points = [20, 120, 300, 2000];
    const prices = [10, 50, 100, 500];
    return (
        <div className="flex justify-center">
            <section className="w-100 bg-zinc-700 p-5 pb-10 rounded-md text-white my-20 fixed" >
                <h2 className="text-3xl text-center mb-5">Buy Points</h2>
                <Link className="text-red-500 relative left-86 bottom-17.5 cursor-pointer" to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x-square z-0" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg>
                </Link>
                <article className="grid grid-cols-2 gap-5 justify-items-center">
                    {points.map((point, index) => {
                        return <div className="w-40 p-2 border-1 flex flex-col gap-2" key={index}>
                            <div className="flex gap-2 justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-coin inline text-yellow-500" viewBox="0 0 16 16">
                                    <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                                </svg>
                                <span className="font-semibold">{point}</span>
                            </div>
                            <Payment price={prices[index]} btnName={`Rs.${prices[index]}`} order={"Points"} orderId={point} />
                        </div>
                    })}
                </article>
            </section>
        </div>
    )
}

export default BuyPoints;