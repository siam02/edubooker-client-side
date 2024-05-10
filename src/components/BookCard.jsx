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
                                <div className='flex gap-4 mb-4 justify-between'>
                                    <span><span className='font-medium'>By:</span> {author_name}</span>
                                    <span><span className='font-medium'>Category:</span> {category}</span>
                                </div>
                                <div className="card-actions justify-end">
                                    <Link to={`/update-book/${_id}`} className="btn btn-primary">Update</Link>
                                    <button onClick={() => handleDelete(book._id)} className="btn btn-error">Delete</button>
                                </div>
                            </div>
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