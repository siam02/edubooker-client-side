import PropTypes from 'prop-types';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';
import { FaRegStar, FaStar } from "react-icons/fa";
import { useState } from 'react';
import Swal from 'sweetalert2';


const BookCard = ({ book, showDetailsBtn, is_borrowed, returnDate, borrowedDate }) => {


    const { image, name, author_name, _id, category, rating, quantity } = book;
    const [deleted, setDeleted] = useState(false);

    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this Book? You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {


                fetch(`https://edubooker-server-side.vercel.app/book/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your choosen Book has been deleted.',
                                'success'
                            )
                            setDeleted(true);
                        }
                    })

            }
        })
    }

    const handleReturn = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to reaturn this book?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, return it!'
        }).then((result) => {
            if (result.isConfirmed) {


                fetch(`https://edubooker-server-side.vercel.app/borrowed-book/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {

                            const updateBook = { quantity: quantity + 1 };

                            fetch(`https://edubooker-server-side.vercel.app/update-book-quantity/${id}`, {
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
                            Swal.fire(
                                'Returned!',
                                'You have successfully returned the book',
                                'success'
                            )
                            setDeleted(true);
                        }
                    })

            }
        })
    }


    return (
        <>
            {
                deleted ? '' :

                    <div>
                        <div className="card bg-base-100 shadow-xl">
                            <figure><img src={image} alt={name} className='h-64 pt-8' /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{name}</h2>
                                <div className='flex items-center gap-2'>
                                    <Rating
                                        initialRating={rating}
                                        emptySymbol={<FaRegStar />}
                                        fullSymbol={<FaStar />}
                                        readonly
                                    />
                                </div>
                                <div className={`flex ${is_borrowed && 'flex-col'} flex-wrap gap-2 mb-4 justify-between`}>
                                    {
                                        is_borrowed || <span><span className='font-medium'>By:</span> {author_name}</span>
                                    }

                                    {
                                        is_borrowed &&
                                        <>
                                            <span><span className='font-medium'>Return Date:</span> {returnDate}</span>
                                            <span><span className='font-medium'>Borrowed Date:</span> {borrowedDate}</span>
                                        </>

                                    }

                                    <span><span className='font-medium'>Category:</span> {category}</span>
                                </div>
                                <div className="card-actions justify-end">
                                    {
                                        showDetailsBtn ?
                                            <Link to={`/book/${_id}`} className="btn w-full btn-primary">Details</Link>
                                            :
                                            is_borrowed ?
                                                <button onClick={() => handleReturn(book._id)} className="btn btn-secondary w-full">Return</button>
                                                :
                                                <>
                                                    <Link to={`/update-book/${_id}`} className="btn btn-primary">Update</Link>
                                                    <button onClick={() => handleDelete(book._id)} className="btn btn-error">Delete</button>
                                                </>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
};

BookCard.propTypes = {
    book: PropTypes.object.isRequired,
    showDetailsBtn: PropTypes.bool,
    is_borrowed: PropTypes.bool,
    returnDate: PropTypes.string,
    borrowedDate: PropTypes.string
}

export default BookCard;