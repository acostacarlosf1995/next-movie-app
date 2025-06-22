import React from 'react'
import { useRouter } from 'next/router'
import {Text, Grid, Pagination} from "@nextui-org/react";

import {Layout} from "../../components/layouts";
import {searchMoviesApi} from "../../api";
import { MoviesCard } from '../../components/movies';

const API_KEY = "dfa1345af4b42814b7229dbfa7ab4cfc"

const ResultsPage = ({ searchResults, totalPages, currentPage, searchTerm }) => {

    const router = useRouter()

    const onPageChange = (page) => {
        router.push(`/search/${searchTerm}?page=${page}`)
    }

    return (
        <Layout title={`Search ${searchTerm}`}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                    marginBottom: "10px"
                }}>
                <Text color='white' h3 >{`Results for "${searchTerm}"`}</Text>
            </div>
            <Grid.Container gap={2} justify="center">
              {searchResults.slice(0, 12).map((movie) => (
                <Grid xs={8} sm={6} md={4} lg={2} key={movie.id}>
                  <MoviesCard movies={movie} />
                </Grid>
              ))}
            </Grid.Container>

            { totalPages > 1 && (
                <div style={{ padding: '2rem 0', display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        total={totalPages}
                        initialPage={currentPage}
                        onChange={onPageChange}
                        color="primary"
                    />
                </div>
            )}
        </Layout>
    )
}

export async function getServerSideProps(ctx) {

    const { id: searchTerm, page = 1 } = ctx.query;

    const { data } = await searchMoviesApi.get(`/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${page}&include_adult=false`);

    const searchResults = data.results.map( movie => ({
        title: movie.title || 'No Title',
        id: movie.id,
        poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/images/poster-holder.jpg',
        rate: movie.vote_average
    }));

    return {
        props: {
            searchResults,
            totalPages: data.total_pages > 500 ? 500 : data.total_pages,
            currentPage: Number(page),
            searchTerm
        }
    };
}

export default ResultsPage;