import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link, useLoaderData } from "react-router-dom";
import { SiteDetailsContext } from "../providers/SiteDetailsProvider";
import CategoryCard from "../components/CategoryCard";

const Categories = () => {
    const { siteName } = useContext(SiteDetailsContext);
    const categories = useLoaderData();

    return (
        <div>
            <Helmet>
                <title>All Book Categories - {siteName}</title>
            </Helmet>
            <div className="flex justify-between items-center mb-4 mt-12 lg:flex-row flex-col">
                <div>
                    <h2 className="text-3xl font-bold mb-4">All Categories</h2>
                    <p className="max-w-3xl">Discover a wide range of literary genres and themes in our All Categories section, catering to every reader&apos;s taste and interest.</p>
                </div>
                <div>
                    <Link to="/add-category" className="btn btn-primary">Add Category</Link>
                </div>
            </div>
            <div className="my-16">
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((category) => <CategoryCard key={category._id} category={category} ></CategoryCard>)}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Categories;