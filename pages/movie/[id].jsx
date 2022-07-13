import React from 'react'
import {Layout} from "../../components/layouts";
import {moviesApi} from "../../api";

const API_KEY = "dfa1345af4b42814b7229dbfa7ab4cfc"

const MoviePage = ({ movies }) => {

    console.log(movies)

    return (
        <Layout title={movies.title}>
            <h1>{movies.title}</h1>
        </Layout>
    )
}

export async function getStaticPaths(context) {

    const { data } = await moviesApi.get(`/top_rated?api_key=${API_KEY}`)

    return {
        paths: data.results.slice(0, 12).map( ({ id }) => ({
            params: { id: id.toString() }
        })),
        fallback: false // false or 'blocking'
    };
}

export async function getStaticProps({ params }) {

    const { id } = params

    const { data } = await moviesApi.get(`/${id}?api_key=${API_KEY}`)

    console.log(data)

    return {
        props: {
            movies: data
        },
    }
}

export default MoviePage;