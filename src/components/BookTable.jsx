import PropTypes from 'prop-types';
import { useState } from 'react';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';
import { FaRegStar, FaStar } from "react-icons/fa";
import Swal from 'sweetalert2';
const BookTable = ({ books }) => {

    const [loadBooks, setLoadBooks] = useState(books);

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

                            const remaining = books.filter(book => book._id !== id);
                            setLoadBooks(remaining);
                        }
                    })

            }
        })
    }

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead className="bg-white dark:bg-slate-950">
                    <tr className="text-gray-900 dark:text-gray-400" >
                        <th className="text-left py-2">Name</th>
                        <th className="text-left py-2">Rating</th>
                        <th className="text-left py-2">Author Name</th>
                        <th className="text-left py-2">Category</th>
                        <th className="text-left py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loadBooks.map(book =>
                        <tr key={book._id}>
                            <td className="py-2">{book.name}</td>
                            <td className="py-2">
                                <Rating
                                    initialRating={book.rating}
                                    emptySymbol={<FaRegStar />}
                                    fullSymbol={<FaStar />}
                                    readonly
                                />
                            </td>
                            <td className="py-2">{book.author_name}</td>
                            <td className="py-2">{book.category}</td>
                            <td className="py-2">
                                <Link to={`/update-book/${book._id}`} className="text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-500 hover:text-indigo-700 mr-2">Update</Link>
                                <button onClick={() => handleDelete(book._id)} className="text-red-600 dark:text-red-400 dark:hover:text-red-500 hover:text-red-700">Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

BookTable.propTypes = {
    books: PropTypes.array.isRequired,
}

export default BookTable;