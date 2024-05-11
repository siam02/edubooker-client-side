import Rating from "react-rating";
import { Link, useLoaderData } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { SiteDetailsContext } from "../providers/SiteDetailsProvider";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const BookDetails = () => {
    const { siteName } = useContext(SiteDetailsContext);
    const book = useLoaderData();
    const { image, name, author_name, category, short_description, rating, quantity, _id } = book;
    const [submitText, setSubmitText] = useState("Submit");
    const [bookQuantity, setBookQuantity] = useState(quantity);
    const { user } = useContext(AuthContext);
    const [is_borrowed, setIsBorrowed] = useState(false);


    useEffect(() => {
        fetch(`http://localhost:5000/borrowed-book-count?id=${_id}&email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                if (data.count > 0) {
                    setIsBorrowed(true);
                } else {
                    setIsBorrowed(false);
                }
            })

    }, [_id, user.email]);

    const handleBorrow = e => {
        e.preventDefault();
        setSubmitText(
            <span className="loading loading-spinner loading-xs"></span>
        )

        if (is_borrowed) {
            document.getElementById('borrow_modal').close();
            toast.error("You have already borrowed this book");
            setSubmitText("Submit");
            return null;
        }

        if (bookQuantity > 0) {
            const form = e.target;

            const return_date = form.return_date.value;
            const book_id = _id;
            const user_name = user.displayName;
            const user_email = user.email;
            const borrowed_date = new Date().toISOString().slice(0, 10);

            const borrowBook = { return_date, book_id, user_name, user_email, borrowed_date }

            fetch('http://localhost:5000/borrowed-book', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(borrowBook)
            })
                .then(res => res.json())
                .then(data => {
                    setSubmitText("Submit");
                    setIsBorrowed(true);
                    const newBookQuantity = bookQuantity - 1;
                    setBookQuantity(newBookQuantity);

                    const updateBook = { quantity: newBookQuantity };

                    fetch(`http://localhost:5000/update-book-quantity/${_id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(updateBook)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                        })
                        .catch(err => console.log(err))

                    if (data.insertedId) {
                        document.getElementById('borrow_modal').close();
                        Swal.fire({
                            title: 'Success!',
                            text: 'You have succesfully borrowed this book',
                            icon: 'success',
                            confirmButtonText: 'Great'
                        })

                        form.reset();
                    }
                })
                .catch(error => {
                    toast.error(error);
                })


            console.log(_id);
        } else {
            toast.error("This book is not available currently.");
        }

    }

    return (
        <div className='mt-14 mb-40'>
            <Helmet>
                <title>{name} - {siteName}</title>
            </Helmet>
            <div className="grid gap-12 lg:grid-cols-2 grid-cols-1">
                <div className='bg-gray-100 dark:bg-gray-800 flex justify-center items-center rounded-2xl p-10 sm:p-20'>
                    <img src={image} className='w-full' alt="" />
                </div>
                <div className='lg:p-0 p-6 flex flex-col'>
                    <h1 className='font-bold text-4xl '>{name}</h1>
                    <p className='my-5 font-medium text-xl'>By: {author_name}</p>
                    <hr className='border-[#13131326]' />
                    <Link to={`/category/${category}`} className='my-4 font-medium underline text-xl'>{category}</Link>
                    <hr className='' />
                    <p className=' mt-6 flex-grow'><strong className='font-medium'>Review: </strong>{short_description}</p>

                    <hr className='' />
                    <div className="grid grid-cols-2 max-w-sm gap-3 mt-6">
                        <span className=''>Quantity:</span>
                        <span className=' font-semibold'>{bookQuantity}</span>
                        <span className=''>Rating:</span>
                        <span className=' font-semibold'><Rating
                            initialRating={rating}
                            emptySymbol={<FaRegStar />}
                            fullSymbol={<FaStar />}
                            readonly
                        /></span>
                    </div>
                    <div className="flex gap-4 justify-end mt-8">
                        <button disabled={bookQuantity > 0 ? false : true} className="btn btn-primary rounded-lg sm:text-lg !h-auto sm:px-7 sm:py-4 font-semibold" onClick={() => document.getElementById('borrow_modal').showModal()}>Borrow</button>
                    </div>
                </div>
            </div>
            <dialog id="borrow_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Borrow {name} book?</h3>
                    <p className="py-4">If you want to borrow this book, please select the return date.</p>
                    <div className="modal-action mt-0 justify-center">
                        <form className="flex flex-col gap-8" onSubmit={handleBorrow}>
                            <div>
                                <label htmlFor="return_date" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Return Date
                                </label>
                                <input
                                    id="return_date"
                                    name="return_date"
                                    type="date"
                                    min={new Date().toISOString().slice(0, 10)}
                                    required
                                    className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full"
                                />
                            </div>
                            <div className="flex gap-4">
                                <button type="submit" className="btn btn-primary">{submitText}</button>
                                <button type="button" className="btn btn-secondary" onClick={() => document.getElementById('borrow_modal').close()}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default BookDetails;