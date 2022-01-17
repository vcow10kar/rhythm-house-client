import { addAlbumRequest, getAlbumsRequest, getArtistAlbumsRequest } from "../../utils/networkRequests";
import { ALBUMS_FAILURE, ALBUMS_SUCCESS, ALBUMS_LOADING, ARTIST_ALBUMS, ADD_ALBUM } from "./actionTypes";

const albumLoading = () => {
    return {
        type: ALBUMS_LOADING
    }
};

const albumSuccess = (payload) => {
    return {
        type: ALBUMS_SUCCESS,
        payload: payload
    }
};

const albumFailure = () => {
    return {
        type: ALBUMS_FAILURE,
    }
};

const artistAlbum = (payload) => {
    return {
        type: ARTIST_ALBUMS,
        payload: payload
    }
}

const addAlbum = (payload) => {
    return {
        type: ADD_ALBUM,
        payload: payload
    }
}

const getArtistsAlbums = (id) => async(dispatch) => {
    try {
        dispatch(albumLoading());

        const data  = await getArtistAlbumsRequest(id);

        dispatch(artistAlbum(data.data.albums));
    } catch (err) {
        console.log(err);
        dispatch(albumFailure());
    }
}

const getAlbums = (payload) => async (dispatch) => {
    try {
        dispatch(albumLoading());

        const data  = await getAlbumsRequest(payload);

        dispatch(albumSuccess(data.data.albums));
    } catch (err) {
        dispatch(albumFailure());
    }
}

const addNewAlbum = (payload, token) => async (dispatch) => {
    try {
        dispatch(albumLoading());

        const data  = await addAlbumRequest(payload, token);

        dispatch(addAlbum(data.data.album));
        
    } catch (err) {
        dispatch(albumFailure());
    }
}

export { getAlbums, getArtistsAlbums, addNewAlbum };