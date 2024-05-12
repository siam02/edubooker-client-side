import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { SiteDetailsContext } from "../providers/SiteDetailsProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AddCategory = () => {
    const { siteName } = useContext(SiteDetailsContext);
    const [addText, setAddText] = useState('Add Category');

    const handleSubmit = e => {
        e.preventDefault();

        setAddText(
            <span className="loading loading-spinner loading-xs"></span>
        )

        const form = e.target;
        const image = form.image.value;
        const name = form.name.value;

        const newCategory = { image, name }

        fetch('https://edubooker-server-side.vercel.app/category', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newCategory)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAddText("Add Category");
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'New Category Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Great'
                    })

                    form.reset();
                }
            })
            .catch(error => {
                toast.error(error);
            })
    }

    return (
        <div className="mt-16">
            <Helmet>
                <title>Add New Category - {siteName}</title>
            </Helmet>
            <h2 className="text-3xl font-bold mb-4">Add Country</h2>
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
                            Category Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full"
                        />
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

export default AddCategory;