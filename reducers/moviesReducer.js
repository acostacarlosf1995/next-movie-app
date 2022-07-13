import { types } from "../types/index";

const INITIAL_STATE = false;

export const moviesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.onMouseEnterHover:
            return state = true;

        case types.onMouseLeaveHover:
            return state = false;

        default:
            return state;
    }
};