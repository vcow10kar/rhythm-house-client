import { getAlbumsRequest } from "../../utils/networkRequests";
import { ALBUMS_FAILURE, ALBUMS_SUCCESS, ALBUMS_LOADING, ARTIST_ALBUMS, ADD_ALBUM } from "./actionTypes";

const initState = {
    albums: [],
    loading: false,
    failure: false,
    artistsAlbum: [],
}

const reducer = (state = initState, {type, payload}) => {
    
    switch(type) {
        case ALBUMS_LOADING: {
            return {
                ...state,
                loading: true,
                failure: false
            }
        }

        case ALBUMS_FAILURE: {
            return {
                ...state,
                loading: false,
                failure: true
            }
        }

        case ALBUMS_SUCCESS: {
            return {
                ...state,
                loading: false,
                failure: false,
                albums: [...payload]
            }
        }

        case ARTIST_ALBUMS: {
            return {
                ...state,
                loading: false,
                failure: false,
                artistsAlbum: [...payload]  
            }
        }

        case ADD_ALBUM: {
            return {
                ...state,
                loading: false,
                failure: false,
                artistsAlbum: [...state.artistsAlbum, payload],
                albums: [...state.albums, payload]  
            }
        }
        
        default: {
            return state;
        }
    }
}

export {reducer};