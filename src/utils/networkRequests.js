import axios from 'axios';

export const loginArtistRequest = async (payload) => {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/artist/login`, payload);
}

export const getAlbumsRequest = async(payload) => {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/album`)
}

export const getArtistAlbumsRequest = async(id) => {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/album/${id}`);
} 

export const addAlbumRequest = async(payload, token) => {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/album`,payload,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}