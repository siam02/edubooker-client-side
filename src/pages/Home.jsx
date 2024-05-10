import { useContext } from "react";
import { Helmet } from "react-helmet";
import { SiteDetailsContext } from "../providers/SiteDetailsProvider";

const Home = () => {

    const { siteName } = useContext(SiteDetailsContext);

    return (
        <div>
            <Helmet>
                <title>Home - {siteName}</title>
            </Helmet>
            
        </div>
    );
};

export default Home;