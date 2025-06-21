import {Layout} from "../components/layouts";
import {Text, Spacer} from "@nextui-org/react";
import {moviesApi} from "../api";
import {MoviesCard} from "../components/movies";
import { MoviesCardSimple } from "../components/movies/MoviesCardSimple";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Virtual } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const API_KEY = "dfa1345af4b42814b7229dbfa7ab4cfc"

export default function Home({ topRatedMovies, upcomingMovies }) {

    return (
      <Layout title="Homepage">
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)' /* Restamos la altura del navbar */ }}>
          <section style={{ height: '50%', display: 'flex', flexDirection: 'column', padding: '10px 0', backgroundColor: 'transparent' }}>
            <Text color='white' h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Top Rated Movies</Text>
            <Swiper
                modules={[Navigation, Virtual]}
                virtual
                navigation
                spaceBetween={15}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                  1280: { slidesPerView: 5 },
                }}
                style={{ width: '100%', height: '100%' }}
            >
                {topRatedMovies.slice(0, 12).map( (movies, index) =>
                    <SwiperSlide key={movies.id} virtualIndex={index}>
                      <MoviesCard movies={movies} />
                    </SwiperSlide>
                )}
            </Swiper>
          </section>

          <Spacer y={1} />

          <section style={{ height: '50%', display: 'flex', flexDirection: 'column', padding: '10px 0', backgroundColor: 'transparent' }}>
            <Text color='white' h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Upcoming Releases</Text>
             <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={15}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 4 },
                  1024: { slidesPerView: 6 },
                  1280: { slidesPerView: 8 },
                }}
                style={{ width: '100%', height: '100%' }}
            >
                {upcomingMovies.map( (movie) =>
                    <SwiperSlide key={movie.id}>
                      <MoviesCardSimple movie={movie} />
                    </SwiperSlide>
                )}
            </Swiper>
          </section>
        </div>
      </Layout>
  )
}

export async function getStaticProps(context) {

    const topRatedPromise = moviesApi.get(`/top_rated?api_key=${API_KEY}`);
    const upcomingPromise = moviesApi.get(`/upcoming?api_key=${API_KEY}`);

    const [topRatedResponse, upcomingResponse] = await Promise.all([topRatedPromise, upcomingPromise]);

    const topRatedMovies = topRatedResponse.data.results.map( movie => ({
        title: movie.title || 'No Title',
        id: movie.id,
        poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/images/poster-holder.jpg',
        rate: movie.vote_average
    }));

    const upcomingMovies = upcomingResponse.data.results.map( movie => ({
        title: movie.title || 'No Title',
        id: movie.id,
        poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/images/poster-holder.jpg',
        rate: movie.vote_average
    }));

    return {
        props: {
            topRatedMovies,
            upcomingMovies
        },
    }
}
