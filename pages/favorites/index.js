import {useEffect, useState} from 'react'
import {Card, Grid} from "@nextui-org/react";

import {Layout} from "../../components/layouts";
import {NoFavorites} from "../../components/ui";
import {localFavorites} from "../../utils";
import Cookies from "js-cookie";
import {MoviesCard} from "../../components/movies";
import {searchMoviesApi} from "../../api";

const FavoritesPage = () => {

    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        setFavoriteMovies( localFavorites.favoriteMovies() )
    }, []);

    return (
        <Layout title="Favorites">

            {
                favoriteMovies.length === 0
                    ? (<NoFavorites />)
                    : (
                        // <Grid.Container
                        //     gap={ 2 }
                        //     justify='flex-start'
                        // >
                        //     {topRatedMovies.map( (movies) =>
                        //         <MoviesCard
                        //             key={movies.id}
                        //             movies={movies}
                        //         />
                        //     )}
                        // </Grid.Container>
                        <Grid.Container gap={2} direction='row' justify='flex-start'>
                            {
                                favoriteMovies.map( id => (
                                    <Grid key={id} xs={12} sm={6}>
                                        <Card
                                            isHoverable
                                            isPressable
                                            css={{ padding: 10 }}
                                        >
                                            <Card.Image
                                                src={`http://image.tmdb.org/t/p/w500${id}`}
                                                width={'100%'}
                                                height={140}
                                            />
                                        </Card>
                                    </Grid>
                                ))
                            }
                        </Grid.Container>
                    )

            }

        </Layout>
    )
}

export async function getServerSideProps(ctx) {

    console.log(ctx.req.cookies)

    // const searchTerm = ctx.query.id
    //
    // const { data } = await searchMoviesApi.get(`/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`)
    //
    // const searchResults = data.results.map( movie => ({
    //     title: movie.title,
    //     id: movie.id,
    //     poster: `http://image.tmdb.org/t/p/w500${movie.poster_path}`,
    //     rate: movie.vote_average
    // }))
    //
    return {
        props: {

        }
    }
}

export default FavoritesPage;