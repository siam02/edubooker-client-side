import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { SiteDetailsContext } from "../providers/SiteDetailsProvider";

const Categories = () => {
    const { siteName } = useContext(SiteDetailsContext);


    return (
        <div>
            <Helmet>
                <title>All Book Categories - {siteName}</title>
            </Helmet>
            <div className="flex justify-between mb-4 mt-12 lg:flex-row flex-col">
                <h2 className="text-3xl font-bold mb-4">All Categories</h2>
                <div>
                    <Link to="/add-category" className="btn btn-primary">Add Category</Link>
                </div>
            </div>
            
        </div>
    );
};

export default Categories;