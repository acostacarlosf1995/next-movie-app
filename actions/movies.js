import { types } from "../types/index";

export const favoriteMovies = (string) => {
    return {
        type: types.searchMovie,
        payload: string
    };
};