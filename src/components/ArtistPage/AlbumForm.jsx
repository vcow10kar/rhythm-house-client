import { TextField, Button } from "@mui/material";
import axios from "axios";
import styles from './artist.module.css';
import { LoginContext } from "../context/LoginContext";
import { useContext } from 'react';


const AlbumForm = ({setAlbum}) => {

    const {token} = useContext(LoginContext);

    const handleAlbumSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        const payload = {
            name: data.get('name'),
            genre: data.get('genre'),
            year: data.get('year'),
            coverURL: data.get('coverURL'),
        }

        axios.post(`http://localhost:5000/album`,payload,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        .then(res => {
            setAlbum(res.data.album);
        })
        .catch(err => {
            console.log('Error:', err);
        }) 
    }
    return (
        <div>
            <h1>Album Form</h1>

            <form className={styles.albumForm} onSubmit={handleAlbumSubmit}>
                <TextField variant = "outlined" name = "name" label = "Name" required placeholder='Enter Album Name'/>
                <TextField variant = "outlined" name = "genre" label = "Genre" required placeholder='Enter Genre'/>
                <TextField variant = "outlined" name = "year" label = "Year" required placeholder='Enter Year'/>
                <TextField variant = "outlined" name = "coverURL" label = "Cover URL" required placeholder='Enter Cover URL'/>

                <Button type = "submit" disableElevation variant = "contained">Create Album</Button>
            </form>
        </div>
    )
}

export default AlbumForm;