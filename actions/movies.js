import { types } from "../types/index";

export const searchMovieResults = (string) => {
    return {
        type: types.searchMovie,
        payload: string
    };
};