import { loginArtistRequest, updateArtistProfileRequest } from "../../utils/networkRequests";
import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, UPDATE_SUCCESS } from "./actionTypes";

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

const updateSuccess = (payload) => {
    return {
        type: UPDATE_SUCCESS,
        payload: payload
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

const artistUpdate = (payload, token, id) => async (dispatch) => {
    dispatch(loginLoading());

    try {
        const {data} = await updateArtistProfileRequest(payload, token, id);

        localStorage.setItem('artistObj', JSON.stringify(data.artist));


        dispatch(updateSuccess(data.artist));

    } catch (err) {
        dispatch(loginFailure());
    }
}

export { loginArtist, logoutSuccess, artistUpdate};