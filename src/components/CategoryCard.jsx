import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const CategoryCard = ({ category }) => {
    const { image, name, _id } = category;
    return (
        <div className="card bg-base-100 shadow-xl image-full">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body text-center dark:!text-neutral-200 justify-center">
                <h2 className="card-title justify-center flex-grow text-3xl">{name}</h2>
                <Link to={`/category/${_id}`} className='btn btn-primary'>View</Link>
            </div>
        </div>
    );
};

CategoryCard.propTypes = {
    category: PropTypes.object.isRequired
}

export default CategoryCard;