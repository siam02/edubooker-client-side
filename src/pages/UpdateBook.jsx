import { Helmet } from "react-helmet";
import { SiteDetailsContext } from "../providers/SiteDetailsProvider";
import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UpdateBook = () => {
    const { siteName } = useContext(SiteDetailsContext);
    const [updateText, setUpdateText] = useState("Submit");
    const book = useLoaderData();
    const { image, name, author_name, rating, category, _id } = book;
    const [bookImage, setBookImage] = useState(image);


    const handleSubmit = e => {
        e.preventDefault();

        setUpdateText(
            <span className="loading loading-spinner loading-xs"></span>
        )

        const form = e.target;
        const image = form.image.value;
        const name = form.name.value;
        const author_name = form.author_name.value;
        const category = form.category.value;
        const rating = parseInt(form.rating.value);

        if (rating < 1 || rating > 5) {
            toast.error("Rating must be between 1 to 5");
            setUpdateText("Submit");
            return 0;
        }

        const updateBook = { image, name, rating, author_name, category }

        fetch(`http://localhost:5000/book/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateBook)
        })
            .then(res => res.json())
            .then(data => {
                setUpdateText("Submit");
                setBookImage(image);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Book Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'Awesome'
                    })
                }
            })
            .catch(error => {
                toast.error(error);
            })


    }


    return (
        <div className="mt-10">
            <Helmet>
                <title>Update Book -  - {siteName}</title>
            </Helmet>
            <h2 className="text-3xl font-bold mb-4">Update Book - {name}</h2>
            <div className="mb-4">
                <img src={bookImage} alt="" className="mx-auto rounded-xl h-96" />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Image (URL)
                        </label>
                        <input
                            id="image"
                            name="image"
                            type="url"
                            required
                            defaultValue={image}
                            className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Book Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            defaultValue={name}
                            className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="author_name" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Author Name
                        </label>
                        <input
                            id="author_name"
                            name="author_name"
                            type="text"
                            defaultValue={author_name}
                            required
                            className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Rating
                        </label>
                        <input
                            id="rating"
                            name="rating"
                            type="number"
                            min="1" max="5"
                            required
                            defaultValue={rating}
                            placeholder="1-5"
                            className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            type="text"
                            required
                            defaultValue={category}
                            className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full"
                        >
                            <option value="Novel">Novel</option>
                            <option value="Thriller">Thriller</option>
                            <option value="History">History</option>
                            <option value="Drama">Drama</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md btn btn-primary"
                    >
                        {updateText}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateBook;