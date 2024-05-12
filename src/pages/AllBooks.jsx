import { useContext, useEffect, useState } from "react";
import { SiteDetailsContext } from "../providers/SiteDetailsProvider";
import { Helmet } from "react-helmet";
import BookCard from "../components/BookCard";
import { toast } from "react-toastify";
import { MdKeyboardArrowDown } from "react-icons/md";
import BookTable from "../components/BookTable";
import axios from "axios";

const AllBooks = () => {


    const { siteName } = useContext(SiteDetailsContext);
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [count, setCount] = useState(0);
    const [view, setView] = useState("card");

    const numberOfPages = Math.ceil(count / itemsPerPage);

    const pages = [...Array(numberOfPages).keys()];

    useEffect(() => {
        fetch('https://edubooker-server-side.vercel.app/bookCount')
            .then(res => res.json())
            .then(data => setCount(data.count))
    }, [])

    useEffect(() => {
        setLoading(true);

        const API = `https://edubooker-server-side.vercel.app/book?page=${currentPage}&size=${itemsPerPage}`;

        axios.get(API, {withCredentials:true})
        .then (res => {
            setBooks(res.data),
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            toast.error(err.message);

        })




        // fetch()
        //     .then(res => res.json())
        //     .then(data => {
        //         setBooks(data);
        //         setLoading(false);
        //     })
    }, [currentPage, itemsPerPage]);

    const handleItemsPerPage = e => {
        const val = parseInt(e.target.value);
        console.log(val);
        setItemsPerPage(val);
        setCurrentPage(0);
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handleFilter = () => {
        setLoading(true);
        const newBooks = books.filter(book => book.quantity > 0);
        setBooks(newBooks);
        setLoading(false);

    }

    const handleView = view => {
        setLoading(true);
        setView(view);
        setLoading(false);
    }

    const handleSort = () => {
        setLoading(true);
        fetch(`https://edubooker-server-side.vercel.app/book-sort-by-rating`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setBooks(data);
                setLoading(false);
            })
            .catch(error => {
                toast.error(error);
                setLoading(false);
            })
    }


    return (
        <div className="mx-auto px-4 py-8">
            <Helmet>
                <title>All Books - {siteName}</title>
            </Helmet>
            <div className="flex justify-between mb-4 lg:flex-row flex-col">
                <h2 className="text-3xl font-bold mb-4">All Books</h2>
                <div className="space-x-4">
                    <button className="btn" onClick={handleFilter}>Show available books</button>
                    <details className="dropdown">
                        <summary className="m-1 btn">View By <MdKeyboardArrowDown className="w-6 h-6" /></summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                            <li><button onClick={() => handleView("table")}>Table</button></li>
                            <li><button onClick={() => handleView("card")}>Card</button></li>
                        </ul>
                    </details>
                    <details className="dropdown">
                        <summary className="m-1 btn">Sort By <MdKeyboardArrowDown className="w-6 h-6" /></summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                            <li><button onClick={handleSort}>Rating</button></li>
                        </ul>
                    </details>
                </div>
            </div>
            {
                loading ? <div className="flex justify-center my-10"><span className="loading loading-lg loading-spinner text-primary"></span></div>
                    :
                    <>
                        {
                            view === "card" &&
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {books.map((book) => <BookCard key={book._id} book={book} ></BookCard>)}
                            </div>
                        }
                        {
                            view === "table" &&
                            <BookTable books={books}></BookTable>
                        }
                    </>

            }

            <div className='pagination'>


            </div>
            <div className="flex justify-center mt-12 items-center gap-3">
                <div className="join">
                    <button className="join-item btn" onClick={handlePrevPage}>«</button>
                    {
                        pages.map(page => <button
                            className={`join-item btn ${currentPage === page ? 'btn-primary' : undefined}`}
                            onClick={() => setCurrentPage(page)}
                            key={page}
                        >{page}</button>)
                    }
                    <button className="join-item btn" onClick={handleNextPage}>»</button>
                </div>
                <select className="select select-bordered" value={itemsPerPage} onChange={handleItemsPerPage}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    );
};

export default AllBooks;