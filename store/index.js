import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import {moviesSearchReducer} from "../reducers/moviesReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const allReducers = combineReducers({
    searchMovie: moviesSearchReducer,
})

export const store = createStore(
    allReducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);