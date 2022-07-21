import Cookies from "js-cookie";

const toggleFavorite = (id) => {

    if (JSON.stringify(id) === Cookies.get(JSON.stringify(id))) {
        Cookies.remove(JSON.stringify(id))
    } else {
        Cookies.set(JSON.stringify(id), JSON.stringify(id))
    }
}

const existInFavorites = (id) => {

    // if ( typeof window === 'undefined' ) return false;

    if (JSON.stringify(id) === Cookies.get(JSON.stringify(id))) {
        return true
    } else {
        return false
    }
}

export default {
    toggleFavorite,
    existInFavorites,
}