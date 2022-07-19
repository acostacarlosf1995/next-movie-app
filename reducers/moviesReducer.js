import { types } from "../types/index";

const INITIAL_STATE = '';

export const moviesSearchReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.searchMovie:
            return action.payload;

        default:
            return state;
    }
};