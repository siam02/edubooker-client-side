import PropTypes from 'prop-types';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';
import { FaRegStar, FaStar } from "react-icons/fa";
import { useState } from 'react';
import Swal from 'sweetalert2';


const BookCard = ({ book }) => {


    const { image, name, author_name, _id, category, rating } = book;
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


                fetch(`http://localhost:5000/book/${id}`, {
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


    return (
        <>
            {
                deleted ? '' :

                    <div className="border border-[#13131326] p-6 rounded-2xl flex flex-col">
                        <div className="bg-gray-100 py-8 rounded-2xl">
                            <img src={image} width={100} className='mx-auto' alt="" />
                        </div>
                        <h3 className='font-bold text-2xl my-4'>{name}</h3>
                        <p className='font-medium text-[#131313CC] flex-grow'>By: {author_name}</p>
                        <hr className='border-dashed my-5 border-[#13131326]' />
                        <div className="flex justify-between font-medium text-[#131313CC]">
                            <span>{category}</span>
                            <span className='flex items-center justify-center gap-2'>
                                <Rating
                                    initialRating={rating}
                                    emptySymbol={<FaRegStar />}
                                    fullSymbol={<FaStar />}
                                    readonly
                                />
                            </span>
                        </div>
                        <div className="card-actions justify-center mt-6">
                            <Link to={`/update-book/${_id}`} className="btn btn-primary">Update</Link>
                            <button onClick={() => handleDelete(book._id)} className="btn btn-error">Delete</button>
                        </div>
                    </div>
            }
        </>
    );
};

BookCard.propTypes = {
    book: PropTypes.object.isRequired
}

export default BookCard;