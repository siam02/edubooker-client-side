import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { SiteDetailsContext } from "../providers/SiteDetailsProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AddBook = () => {

    const { siteName } = useContext(SiteDetailsContext);
    const [addText, setAddText] = useState('Add');
    // const [loading, setLoading] = useState(true);

    

    const handleSubmit = e => {
        e.preventDefault();

        setAddText(
            <span className="loading loading-spinner loading-xs"></span>
        )

        const form = e.target;
        const image = form.image.value;
        const name = form.name.value;
        const author_name = form.name.author_name;
        const category = form.name.category;
        const short_description = form.short_description.value;
        const quantity = parseInt(form.quantity.value);
        const rating = parseInt(form.rating.value);

        const newTouristsSpot = { image, name, quantity, location, short_description, rating, author_name, category }

        fetch('https://southest-explorer-server-opbmjysgv.vercel.app/tourists-spot', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newTouristsSpot)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAddText("Add");
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'New Tourists Spot Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })

                    form.reset();
                }
            })
            .catch(error => {
                toast.error(error);
            })


    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Helmet>
                <title>Add Book on {siteName}</title>
            </Helmet>
            <h2 className="text-3xl font-bold mb-4">Add New Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Image (URL)
                        </label>
                        <input
                            id="image"
                            name="image"
                            type="text"
                            required
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
                            className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Quantity of book
                        </label>
                        <input
                            id="quantity"
                            name="quantity"
                            type="number"
                            required
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
                            className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full"
                        >
                            <option value="Novel">Novel</option>
                            <option value="Thriller">Thriller</option>
                            <option value="History">History</option>
                            <option value="Drama">Drama</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="short_description" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Short Description
                        </label>
                        <textarea
                            id="short_description"
                            name="short_description"
                            required
                            className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full"
                        ></textarea>
                    </div>
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md btn btn-primary"
                    >
                        {addText}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBook;