import React from 'react'
import { useRouter } from 'next/router'
import {Text} from "@nextui-org/react";

import {Layout} from "../../components/layouts";
import {searchMoviesApi} from "../../api";
import {MoviesCard} from "../../components/movies";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Virtual } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const API_KEY = "dfa1345af4b42814b7229dbfa7ab4cfc"

const ResultsPage = ({ searchResults }) => {

    const router = useRouter()

    const titleResult = router.query.id.replaceAll('-', ' ')

    return (
        <Layout title={`Search ${titleResult}`}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                    marginBottom: "10px"
                }}>
                <Text color='white' h3 >{`Results for "${titleResult}"`}</Text>
            </div>
            <Swiper
              modules={[Navigation, Virtual]}
              virtual
              navigation
              spaceBetween={10}
              breakpoints={{
                // when window width is >= 640px
                640: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                // when window width is >= 768px
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                // when window width is >= 1024px
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 25,
                },
              }}
              style={{
                width: '100%',
                height: '100%',
              }}
            >
                {searchResults.map( (movies, index) =>
                    <SwiperSlide key={movies.id} virtualIndex={index}>
                      <MoviesCard
                          movies={movies}
                      />
                    </SwiperSlide>
                )}
            </Swiper>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {

    const searchTerm = ctx.query.id

    const { data } = await searchMoviesApi.get(`/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`)

    const searchResults = data.results.map( movie => ({
        title: movie.title || 'No Title',
        id: movie.id,
        poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/images/poster-holder.jpg',
        rate: movie.vote_average
    }))

    return {
        props: {
            searchResults
        }
    }
}

export default ResultsPage;