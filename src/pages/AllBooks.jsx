import { useContext, useEffect, useState } from "react";
import { SiteDetailsContext } from "../providers/SiteDetailsProvider";
import { Helmet } from "react-helmet";
import BookCard from "../components/BookCard";
import { toast } from "react-toastify";

const AllBooks = () => {


    const { siteName } = useContext(SiteDetailsContext);
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [count, setCount] = useState(0);

    const numberOfPages = Math.ceil(count / itemsPerPage);

    const pages = [...Array(numberOfPages).keys()];

    useEffect(() => {
        fetch('http://localhost:5000/bookCount')
            .then(res => res.json())
            .then(data => setCount(data.count))
    }, [])

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/book?page=${currentPage}&size=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => {
                setBooks(data);
                setLoading(false);
            })
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

    const handleSort = () => {
        setLoading(true);
        fetch(`http://localhost:5000/book-sort-by-rating`)
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
                        <summary className="m-1 btn">Sort By</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                            <li><button onClick={handleSort}>Rating</button></li>
                        </ul>
                    </details>
                </div>
            </div>
            {
                loading ? <div className="flex justify-center my-10"><span className="loading loading-lg loading-spinner text-primary"></span></div>
                    :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {books.map((book) => <BookCard key={book._id} book={book} ></BookCard>)}
                    </div>
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