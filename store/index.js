import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { moviesReducer } from "../reducers/moviesReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const allReducers = combineReducers({
    movies: moviesReducer,
})

export const store = createStore(
    allReducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);