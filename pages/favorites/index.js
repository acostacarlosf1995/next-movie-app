import {Grid} from "@nextui-org/react";

import {Layout} from "../../components/layouts";
import {NoFavorites} from "../../components/ui";
import {MoviesCardFavorites} from "../../components/movies";

const API_KEY = "dfa1345af4b42814b7229dbfa7ab4cfc"

const FavoritesPage = ({ dataCookies }) => {

    return (
        <Layout title="Favorites">

            {
                dataCookies.length === 0
                    ? (<NoFavorites />)
                    : (
                        <Grid.Container
                            gap={ 2 }
                            justify='flex-start'
                        >
                            {dataCookies.map( (movies) =>
                                <MoviesCardFavorites
                                    key={movies.id}
                                    title={movies.title}
                                    id={movies.id}
                                    poster={`http://image.tmdb.org/t/p/w500${movies.poster_path}`}
                                    rate={movies.vote_average}
                                />
                            )}
                        </Grid.Container>
                    )

            }

        </Layout>
    )
}

export async function getServerSideProps(ctx) {

    const cookiesMovies = Object.keys(ctx.req.cookies).map( cookiesId => {
        return Number(cookiesId)
    })

    const data = Promise.all(
        cookiesMovies.map(async (i) => await (await fetch(`https://api.themoviedb.org/3/movie/${i}?api_key=${API_KEY}`)).json())
    )

    const dataCookies = await data

    return {
        props: {
            dataCookies
        }
    }
}

export default FavoritesPage;