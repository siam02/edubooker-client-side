import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { SiteDetailsContext } from "../providers/SiteDetailsProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import BookCard from "../components/BookCard";

const CategoryDetails = () => {
    const category = useLoaderData();

    const { name, image } = category;
    const { siteName } = useContext(SiteDetailsContext);
    const [loading, setLoading] = useState(true);

    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/book-by-category/${name}`)
            .then(res => res.json())
            .then(data => {
                setBooks(data);
                setLoading(false);
            })
            .catch(error => {
                toast.error(error);
            })
    }, [name])

    return (
        <div className="my-8">
            <Helmet>
                <title>{name} - {siteName}</title>
            </Helmet>
            <div className="card bg-base-100 shadow-xl h-96 image-full">
                <figure><img src={image} alt="Shoes" className="w-full" /></figure>
                <div className="card-body text-center dark:!text-neutral-200 justify-center">
                    <h2 className="card-title justify-center text-5xl">{name}</h2>
                </div>
            </div>
            <div className="my-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold">All Books in {name} Category</h2>
                    <p className="max-w-3xl mt-4 mx-auto">Explore our curated selection of books in the {name} category, each offering a unique perspective and captivating narrative waiting to be discovered.</p>
                </div>
                {
                    loading ? <div className="flex justify-center my-10"><span className="loading loading-lg loading-spinner text-indigo-600"></span></div>
                        :
                        <div>
                            {
                                books.length === 0 ?
                                    <p className="text-lg text-red-600 text-center">No Books are available for this category</p>
                                    :
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {books.map((book) => <BookCard key={book._id} book={book}></BookCard>)}
                                    </div>
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default CategoryDetails;