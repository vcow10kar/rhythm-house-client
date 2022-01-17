import { loginArtistRequest } from "../../utils/networkRequests";
import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from "./actionTypes";

const loginLoading = () => {
    return {
        type: LOGIN_LOADING
    }
}

const loginSuccess = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload: payload
    }
}

const loginFailure = () => {
    return {
        type: LOGIN_FAILURE
    }
}

const logoutSuccess = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('artistObj');

    return {
        type: LOGOUT_SUCCESS,
        payload: {
            token: null,
            artist: null
        }
    }
}

const loginArtist = (payload) => async (dispatch) => {
    dispatch(loginLoading());

    try {
        const { data } = await loginArtistRequest(payload);

        localStorage.setItem('token', data.data.token);
        localStorage.setItem('artistObj', JSON.stringify(data.data.artist));


        dispatch(loginSuccess(data.data));
    } catch (err) {
        dispatch(loginFailure());
    }
}

export { loginArtist, logoutSuccess};