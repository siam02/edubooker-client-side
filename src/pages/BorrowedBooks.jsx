import { Helmet } from "react-helmet";
import { AuthContext } from "../providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { SiteDetailsContext } from "../providers/SiteDetailsProvider";
import { toast } from "react-toastify";
import BorrowedBookCard from "../components/BorrowedBookCard";


const BorrowedBooks = () => {

    const { user } = useContext(AuthContext);
    const { siteName } = useContext(SiteDetailsContext);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://edubooker-server-side.vercel.app/borrowed-book/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setBooks(data)
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                toast.error(error);
            })
    }, [user.email])

    return (
        <div className="my-28">
            <Helmet>
                <title>My Borrowrd Books - {siteName}</title>
            </Helmet>
            <h2 className="text-3xl font-bold mb-4">My Borrowed Books</h2>
            <div className="my-16">
                {
                    loading ? <div className="flex justify-center my-10"><span className="loading loading-lg loading-spinner text-primary"></span></div>
                        :
                        <>
                            {
                                books.length === 0 ? (
                                    <p className="text-red-600">You haven&apos;t borrowed any books yet.</p>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {books.map((book) => <BorrowedBookCard key={book._id} borrowedBook={book} showDetailsBtn={false}></BorrowedBookCard>)}
                                    </div>
                                )
                            }
                        </>
                }
            </div>
        </div>
    );
};

export default BorrowedBooks;