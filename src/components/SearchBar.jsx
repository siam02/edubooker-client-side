import { FaSearch } from "react-icons/fa";
import PropTypes from 'prop-types';
import axios from "axios";
import { toast } from "react-toastify";

const SearchBar = ({ setLoading, setBooks, currentPage, itemsPerPage, setCount }) => {

    const search = e => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const q = form.q.value;

        const API = `https://edubooker-server-side.vercel.app/book/search?page=${currentPage}&size=${itemsPerPage}&q=${q}`;

        axios.get(API, { withCredentials: true })
            .then(res => {
                setBooks(res.data);
                if (q) {
                    setCount(res.data.length);
                } else {
                    fetch('https://edubooker-server-side.vercel.app/bookCount')
                        .then(res => res.json())
                        .then(data => setCount(data.count))
                }
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                toast.error(error.message);

            })
    }

    return (
        <div>
            <form className="join" onSubmit={search}>
                <input className="input input-bordered join-item" name="q" type="text" placeholder="Search....." />
                <button className="btn join-item"><FaSearch /></button>
            </form>
        </div>
    );
};

SearchBar.propTypes = {
    setLoading: PropTypes.func,
    setBooks: PropTypes.func,
    currentPage: PropTypes.number,
    itemsPerPage: PropTypes.number,
    setCount: PropTypes.func
}

export default SearchBar;