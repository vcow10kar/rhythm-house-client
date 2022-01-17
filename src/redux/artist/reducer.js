import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from "./actionTypes";

const token = localStorage.getItem('token');
const artistObj = JSON.parse(localStorage.getItem('artistObj'));

const initState = {
    loading: false,
    token: token,
    failure: false,
    artist: artistObj
}

const reducer = (state = initState, {type, payload}) => {
    switch(type) {
        case LOGIN_LOADING: {
            return {
                ...state,
                loading: true,
                failure: false
            }
        }

        case LOGIN_FAILURE: {
            return {
                ...state,
                loading: false,
                failure: true,
            }
        }

        case LOGIN_SUCCESS: {
            return {
                ...state,
                loading: false,
                failure: false,
                token: payload.token,
                artist: payload.artist
            }
        }

        case LOGOUT_SUCCESS: {
            return {
                ...state,
                loading: false,
                failure: false,
                token: payload.token,
                artist: payload.artist
            }
        }

        default: {
            return state;
        }
    }
}

export {reducer};