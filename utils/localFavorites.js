import Cookies from "js-cookie";

const toggleFavorite = (id) => {

    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    // Cookies.set(JSON.stringify(id), JSON.stringify(id))

    if ( favorites.includes(id) ) {
        favorites = favorites.filter( movieId => movieId !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}

const existInFavorites = (id) => {

    if ( typeof window === 'undefined' ) return false;

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    return favorites.includes(id);
}

const favoriteMovies = () => {

    return JSON.parse(localStorage.getItem('favorites') || '[]');

}

export default {
    toggleFavorite,
    existInFavorites,
    favoriteMovies,
}