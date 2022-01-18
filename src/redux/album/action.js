import { addAlbumRequest, getAlbumsRequest, getArtistAlbumsRequest, searchAlbumsRequest } from "../../utils/networkRequests";
import { ALBUMS_FAILURE, ALBUMS_SUCCESS, ALBUMS_LOADING, ARTIST_ALBUMS, ADD_ALBUM, SEARCH_ALBUMS } from "./actionTypes";

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

const searchAlbumsSuccess = (payload) => {
    return {
        type: SEARCH_ALBUMS,
        payload: payload
    }
} 

const getArtistsAlbums = (id) => async (dispatch) => {
    try {
        dispatch(albumLoading());

        const data = await getArtistAlbumsRequest(id);

        dispatch(artistAlbum(data.data.albums));
    } catch (err) {
        console.log(err);
        dispatch(albumFailure());
    }
}

const getAlbums = (query) => async (dispatch) => {
    try {
        dispatch(albumLoading());

        const data = await getAlbumsRequest(query);

        const pages = [];

        for (let i = 1; i <= data.data.pages; i++) {
            pages.push(i);
        }

        dispatch(albumSuccess({ albums: data.data.albums, pages: pages, genres: [...data.data.genres] }));
    } catch (err) {
        dispatch(albumFailure());
    }
}

const addNewAlbum = (payload, token) => async (dispatch) => {
    try {
        dispatch(albumLoading());

        const data = await addAlbumRequest(payload, token);

        dispatch(getArtistsAlbums(data.data.album.artist));

    } catch (err) {
        dispatch(albumFailure());
    }
}

const searchAlbums = (query) => async (dispatch) => {
    try {
        dispatch(albumLoading());

        const data = await searchAlbumsRequest(query);

        dispatch(searchAlbumsSuccess(data.data));
    } catch (err) {
        dispatch(albumFailure());
    }
}

export { getAlbums, getArtistsAlbums, addNewAlbum, searchAlbums };