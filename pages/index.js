import {Layout} from "../components/layouts";
import {Grid, Text} from "@nextui-org/react";
import {moviesApi} from "../api";
import {MoviesCard} from "../components/movies";

const API_KEY = "dfa1345af4b42814b7229dbfa7ab4cfc"

export default function Home({ topRatedMovies }) {

    return (
      <Layout title="Homapage">
          <div
              style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
              marginBottom: "10px"
          }}>
              <Text color='white' h3 >Top Rated Movies</Text>
          </div>
          <Grid.Container
              gap={ 2 }
              justify='flex-start'
          >
              {topRatedMovies.slice(0, 12).map( (movies) =>
                  <MoviesCard
                      key={movies.id}
                      movies={movies}
                  />
              )}
          </Grid.Container>
      </Layout>
  )
}

export async function getStaticProps(context) {

    const { data } = await moviesApi.get(`/top_rated?api_key=${API_KEY}`)

    const topRatedMovies = data.results.map( movie => ({
        title: movie.title,
        id: movie.id,
        poster: `http://image.tmdb.org/t/p/w500${movie.poster_path}`,
        rate: movie.vote_average
    }))

    return {
        props: {
            topRatedMovies
        },
    }
}
