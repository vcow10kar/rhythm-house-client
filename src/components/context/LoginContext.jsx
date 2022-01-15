import axios from "axios";
import { useState, useEffect } from "react";
import { createContext } from "react";

export const LoginContext = createContext({});

export default function AuthContext({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [artistObj, setArtistObj] = useState(JSON.parse(localStorage.getItem('artistObj')));

    console.log("Artist:", artistObj);

    const handleCheckUser = () => {
        let tok = localStorage.getItem('token');
        if (!artistObj) {
            axios.get(`http://localhost:5000/artist/getArtist`,{
                headers: {
                    'Authorization': `Bearer ${tok}`
                }
            })
                .then(res => {
                    localStorage.setItem('artistObj', JSON.stringify(res.data.artist));
                    setArtistObj(JSON.parse(res.data.artist));
                    window.location.href = '/';
                })
                .catch(err => {
                    console.log('Error:', err);
                })
        } else {
            setArtistObj(JSON.parse(localStorage.getItem('artistObj')))
        }
    }

    return (
        <LoginContext.Provider value={{token, setToken, artistObj, handleCheckUser}}>{children}</LoginContext.Provider>
    )
}