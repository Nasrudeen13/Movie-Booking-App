import React from "react";
import "./moviepage.css";
import MoviesCarousel from "../../Components/MoviesCarousel/MoviesCarousel";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import CelebCard from "../../Components/CelebCard/CelebCard";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";

const Page = () => {
  const location = useLocation();
  const pathname = location.pathname;

    const { movieid } = useParams()
   
    const [movie, setMovie] = useState(null)
    console.log(movieid)

    const getMovie = async () => {
        fetch(`http://localhost:8000/movie/movies/${movieid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log(data)
                    setMovie(data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })




    }
   

    useEffect(() => {
        getMovie()
    }, [])

    return (
        <>
            {
                movie &&
                <div className='moviepage'>
                    <div className='c1' style={{
                        backgroundImage: `url(${movie.landscapeImgUrl})`
                    }}>
                        <div className='c11'>
                            <div className='left'>
                                <div className='movie_poster'
                                    style={{
                                        backgroundImage: `url(${movie.portraitImgUrl})`
                                    }}
                                >
                                    <p>In cinemas</p>
                                </div>
                                <div className='movie_details'>
                                    <p className='title'>
                                        {movie.title}
                                    </p>
                                    <p className='rating'>
                                    <i className="bi bi-star p-2"></i>
                                        {movie.rating}/10
                                    </p>
                                    {/* <div className='halls_languages'>
                                <p className='halls'>
                                    {
                                        movie.halls.map((hall, index) => {
                                            return (
                                                <span key={index}>{hall} </span>
                                            )
                                        })
                                    }
                                </p>
                                <p className='languages'>
                                    {movie.languages.map((language, index) => {
                                        return (
                                            <span key={index}>{language} </span>
                                        )
                                    })}
                                </p>
                            </div> */}
                                    <p className='duration_type_releasedat'>
                                        <span className='duration'>
                                            {movie.duration}
                                        </span>
                                        <span>•</span>
                                        <span className='type'>
                                            {movie.genre.join(', ')}
                                        </span>
                                        {/* <span>•</span>
                                <span className='releasedat'>
                                    {movie.releasedate}
                                </span> */}
                                    </p>
                                    <Link
                                        to={`${pathname}/buytickets`}
                                        className='linkstylenone'
                                    >
                                        <button className='bookbtn'>Book Tickets</button>
                                    </Link>

                                </div>
                            </div>
                            <div className='right'>

                                <button className='sharebtn'><i className="bi bi-share shareicon"></i>Share</button>
                            </div>
                        </div>
                    </div>
                    <div className='c2'>
                        <h1>About the Movie</h1>
                        <p>{movie.description}</p>
                        {
                            movie.cast.length>0 &&
                            <div className='circlecardslider'>
                                <div className='line'></div>

                                <h1>Cast</h1>
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={1}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    breakpoints={{
                                        '@0.00': {
                                            slidesPerView: 1,
                                            spaceBetween: 2,
                                        },
                                        '@0.75': {
                                            slidesPerView: 2,
                                            spaceBetween: 2,
                                        },
                                        '@1.00': {
                                            slidesPerView: 3,
                                            spaceBetween: 2,
                                        },
                                        '@1.50': {
                                            slidesPerView: 6,
                                            spaceBetween: 2,
                                        },
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    {
                                        movie.cast.map((cast, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <CelebCard {...cast} />
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            </div>
                        }
                        {
                            movie.crew.length>0 &&
                            <div className='circlecardslider'>
                                <div className='line'></div>

                                <h1>Crew</h1>
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={1}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    breakpoints={{
                                        '@0.00': {
                                            slidesPerView: 1,
                                            spaceBetween: 2,
                                        },
                                        '@0.75': {
                                            slidesPerView: 2,
                                            spaceBetween: 2,
                                        },
                                        '@1.00': {
                                            slidesPerView: 3,
                                            spaceBetween: 2,
                                        },
                                        '@1.50': {
                                            slidesPerView: 6,
                                            spaceBetween: 2,
                                        },
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    {
                                        movie.crew.map((cast, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <CelebCard {...cast} />
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            </div>
                        }
                        <div className='line'></div>
                        <h1>Your might also like</h1>
                        <MoviesCarousel />
                    </div>

                </div>
            }
        </>
    )
}
export default Page;
