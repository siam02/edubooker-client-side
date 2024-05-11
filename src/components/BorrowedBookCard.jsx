import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BookCard from './BookCard';

const BorrowedBookCard = ({borrowedBook}) => {

    const {book_id, return_date, borrowed_date} = borrowedBook;
    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/book/${book_id}`)
            .then(res => res.json())
            .then(data => {
                setBook(data)
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                toast.error(error);
            })
    }, [book_id])

    return (
        <>
            {
                loading ? <div className="flex justify-center my-10"><span className="loading loading-lg loading-spinner text-primary"></span></div> :
                <BookCard book={book} is_borrowed={true} returnDate={return_date} borrowedDate={borrowed_date} ></BookCard>
            }
        </>
        
    );
};

BorrowedBookCard.propTypes = {
    borrowedBook: PropTypes.object.isRequired,
}

export default BorrowedBookCard;