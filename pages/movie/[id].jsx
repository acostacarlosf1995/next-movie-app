import React from 'react'
import { useRouter } from 'next/router'
import Image from "next/image";

import {Layout} from "../../components/layouts";
import {moviesApi} from "../../api";
import {Button, Card, Container, Grid, Text} from "@nextui-org/react";

const API_KEY = "dfa1345af4b42814b7229dbfa7ab4cfc"

const MoviePage = ({ movies }) => {

    const router = useRouter()

    console.log(router)

    return (
        <Layout title={movies.title}>
            <Grid.Container
                css={{
                    marginTop: '5px',
                }}
                gap={ 2 }
            >
                <Grid xs={ 12 } sm={ 4 }>
                    <Card  className="animate__animated animate__fadeInLeft animate__faster 200ms" css={{ padding: '5px' }}>
                        <Card.Body>
                            <Card.Image
                                css={{ borderRadius: '5px' }}
                                src={`http://image.tmdb.org/t/p/w500${movies.poster_path}` || '/no-image.png'}
                                alt={movies.title}
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={ 12 } sm={ 8 }>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between', padding: '10px 30px'}}>
                            <Text h1 >{ movies.title }</Text>
                            <Button
                                color="gradient"
                                ghost
                            >
                                Saved in favorites
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Container css={{
                                padding: '0px 30px'
                            }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        width: "100%",
                                    }}
                                >
                                    <Text size={15} color="rgb(237, 178, 28)" css={{ paddingRight: "10px" }}>
                                        { movies.vote_average }
                                    </Text>
                                    <Image src="/imdb-logo.png" alt="IMDb Logo" width="55" height="48"/>
                                </div>
                            </Container>
                            <Container css={{
                                marginTop: '20px'
                            }}>
                                <Text size={20}>
                                    { movies.overview }
                                </Text>
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}

export async function getStaticPaths(context) {

    const { data } = await moviesApi.get(`/top_rated?api_key=${API_KEY}`)

    return {
        paths: data.results.slice(0, 12).map( ({ id }) => ({
            params: { id: id.toString() }
        })),
        fallback: 'blocking' // false or 'blocking'
    };
}

export async function getStaticProps({ params }) {

    const { id } = params

    const { data } = await moviesApi.get(`/${id}?api_key=${API_KEY}`)

    return {
        props: {
            movies: data
        },
    }
}

export default MoviePage;