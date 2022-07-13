import axios from "axios";

const API_KEY = "dfa1345af4b42814b7229dbfa7ab4cfc"

const moviesApi = axios.create({
    baseURL: `https://api.themoviedb.org/3/movie`
})

export default moviesApi;