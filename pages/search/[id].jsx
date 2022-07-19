import React from 'react'
import { useRouter } from 'next/router'
import {Grid, Text} from "@nextui-org/react";

import {Layout} from "../../components/layouts";
import {searchMoviesApi} from "../../api";
import {MoviesCard} from "../../components/movies";

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
            <Grid.Container
                gap={ 2 }
                justify='flex-start'
                className="animate__animated animate__fadeInUp"
            >
                {searchResults.map( (movies) =>
                    <MoviesCard
                        key={movies.id}
                        movies={movies}
                    />
                )}
            </Grid.Container>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {

    const searchTerm = ctx.query.id

    const { data } = await searchMoviesApi.get(`/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`)

    const searchResults = data.results.map( movie => ({
        title: movie.title,
        id: movie.id,
        poster: `http://image.tmdb.org/t/p/w500${movie.poster_path}`,
        rate: movie.vote_average
    }))

    return {
        props: {
            searchResults
        }
    }
}

export default ResultsPage;