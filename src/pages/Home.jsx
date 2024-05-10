import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { SiteDetailsContext } from "../providers/SiteDetailsProvider";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { useLoaderData } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { toast } from "react-toastify";
import CategoryCard from "../components/CategoryCard";

const Home = () => {

    const { siteName } = useContext(SiteDetailsContext);
    const latestBooks = useLoaderData();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/category`)
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                toast.error(error);
            })
    }, [])

    return (
        <div>
            <Helmet>
                <title>Home - {siteName}</title>
            </Helmet>
            <div className="hero my-28">
                <div className="hero-content gap-10 !p-0 grid grid-cols-1 lg:grid-cols-2">
                    <div className="">
                        <h1 className="text-5xl font-bold">Explore <span className="text-primary"><Typewriter words={['Novel', 'Thriller', 'History', 'Drama', 'Sci-Fi']} loop={0} /></span></h1>
                        <p className="py-6">Welcome to EduBooker, your gateway to a world of knowledge and adventure. Explore our vast collection of books across multiple genres and embark on a journey of discovery today!</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                    <div className="flex">
                        <Swiper
                            navigation={true}
                            modules={[Navigation]}
                            loop={true}
                            className="rounded-xl"
                        >
                            {
                                latestBooks.map(book => <SwiperSlide key={book._id} className="rounded-xl"><img src={book.image} className="rounded-xl mx-auto h-96" alt="" /></SwiperSlide>)
                            }
                        </Swiper>
                    </div>
                </div>
            </div>
            <div className="my-28">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold">Categories</h2>
                    <p className="max-w-3xl mt-4 mx-auto">Discover a wide range of literary genres and themes in our All Categories section, catering to every reader&apos;s taste and interest.</p>
                </div>
                {
                    loading ? <div className="flex justify-center my-10"><span className="loading loading-lg loading-spinner text-indigo-600"></span></div>
                        :
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {categories.map((category) => <CategoryCard key={category._id} category={category} ></CategoryCard>)}
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default Home;