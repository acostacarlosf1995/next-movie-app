import {useEffect , useState} from 'react'

import {Button, Card, Container, Grid, Text} from "@nextui-org/react";
import Image from "next/image";

import confetti from 'canvas-confetti';

import {Layout} from "../../components/layouts";
import { localFavorites } from '../../utils';
import {moviesApi} from "../../api";

const API_KEY = "dfa1345af4b42814b7229dbfa7ab4cfc"

const MovieNamePage = ({ movies }) => {

    const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites( movies.id ));

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite( movies.id );
        setIsInFavorites( !isInFavorites );

        if ( isInFavorites ) return

        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0
            }
        })
    }

    console.log(isInFavorites)

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
                                bordered={ isInFavorites ? 'false' : 'true' }
                                onClick={ onToggleFavorite }
                            >
                                {isInFavorites ? 'In Favorites' : 'Save in Favorites'}
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

    const movieName = data.results.map( movieNamePath => ({
        title: movieNamePath.title.split(' ').join('-'),
        id: movieNamePath.id
    }))
    // console.log(movieName)

    return {
        paths: movieName.map( ( name ) => ({
            params: { name: name.title.toString(), id: name.id.toString() }
        })),
        fallback: false // false or 'blocking'
    };
}

export async function getStaticProps({ params }) {

    const { name, id } = params
    console.log(name, id)

    const { data } = await moviesApi.get(`/${id}?api_key=${API_KEY}`)

    return {
        props: {
            movies: data
        },
    }
}

export default MovieNamePage;