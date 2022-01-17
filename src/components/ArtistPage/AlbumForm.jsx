import { TextField, Button } from "@mui/material";
import axios from "axios";
import styles from './artist.module.css';
import { LoginContext } from "../context/LoginContext";
import { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addNewAlbum } from "../../redux/album/action";

const AlbumForm = ({setAlbum}) => {

   const {token, artist} = useSelector(state => state.artist);
   
   const dispatch = useDispatch();

    const handleAlbumSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        const payload = {
            name: data.get('name'),
            genre: data.get('genre'),
            year: data.get('year'),
            coverURL: data.get('coverURL'),
        }

        dispatch(addNewAlbum(payload, token));
        
    }
    return (
        <div>
            <form className={styles.albumForm} onSubmit={handleAlbumSubmit}>
                <TextField variant = "outlined" name = "name" label = "Name" required placeholder='Enter Album Name'/>
                <TextField variant = "outlined" name = "genre" label = "Genre" required placeholder='Enter Genre'/>
                <TextField variant = "outlined" name = "year" label = "Year" required placeholder='Enter Year'/>
                <TextField variant = "outlined" name = "coverURL" label = "Cover URL" required placeholder='Enter Cover URL'/>

                <Button type = "submit" disableElevation variant = "contained" sx = {{marginTop: '10px'}}>Create New Album</Button>
            </form>
        </div>
    )
}

export default AlbumForm;