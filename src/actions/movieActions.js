import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env'


function moviesFetched(movies) {
    return {
        type: actionTypes.FETCH_MOVIES,
        movies: movies
    }
}

function movieFetched(movie) {
    return {
        type: actionTypes.FETCH_MOVIE,
        selectedMovie: movie
    }
}

function movieSet(movie) {
    return {
        type: actionTypes.SET_MOVIE,
        selectedMovie: movie
    }
}

export function setMovie(movie) {
    return dispatch => {
        dispatch(movieSet(movie));
    }
}

export function fetchMovie(movieId) {
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`https://michaelmartinez-csci3916-hw4.herokuapp.com/movies/?_id=${movieId}&reviews=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors',
        }).then((response) => {
            console.log(`Sent req to ${env.REACT_APP_API_URL}/movies?_id=${movieId}&reviews=true`)
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            dispatch(movieFetched(res.data[0]));
        }).catch((e) => console.log(e));
    }
}

export function fetchMovies() {
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`https://michaelmartinez-csci3916-hw4.herokuapp.com/movies?reviews=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors',
        }).then((response) => {
            console.log(`Sent req to ${env.REACT_APP_API_URL}/movies?reviews=true`)
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
             dispatch(moviesFetched(res.data));
        }).catch((e) => console.log(e));
    }
}