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
        console.log(tok);
        if (!artistObj) {
            axios.get(`http://localhost:5000/artist/getArtist`,{
                headers: {
                    'Authorization': `Bearer ${tok}`
                }
            })
                .then(res => {
                    localStorage.setItem('artistObj', JSON.stringify(res.data.artist));
                    setArtistObj(res.data.artist);
                })
                .catch(err => {
                    console.log('Error:', err);
                })
        } else {
            setArtistObj(JSON.parse(localStorage.getItem('artistObj')))
        }
    }

    useState(() => {
        handleCheckUser();
    }, []);

    return (
        <LoginContext.Provider value={{token, setToken, artistObj, handleCheckUser}}>{children}</LoginContext.Provider>
    )
}