import { useContext } from "react";
import { Helmet } from "react-helmet";
import { SiteDetailsContext } from "../providers/SiteDetailsProvider";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { useLoaderData } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {

    const { siteName } = useContext(SiteDetailsContext);
    const latestBooks = useLoaderData();

    return (
        <div>
            <Helmet>
                <title>Home - {siteName}</title>
            </Helmet>
            <div className="hero my-28">
                <div className="hero-content gap-10 !p-0 grid grid-cols-1 lg:grid-cols-2">
                    <div className="">
                        <h1 className="text-5xl font-bold">Explore <span className="text-red-600"><Typewriter words={['Novel', 'Thriller', 'History', 'Drama', 'Sci-Fi']} loop={0} /></span></h1>
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
        </div>
    );
};

export default Home;