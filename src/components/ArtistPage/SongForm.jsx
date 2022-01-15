import { Button, TextField } from "@mui/material";
import { LoginContext } from "../context/LoginContext";
import styles from './artist.module.css';
import { useContext } from 'react';
import axios from "axios";

const SongForm = ({ album }) => {

    const {token} = useContext(LoginContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        const payload = {
            name: data.get('name'),
            album: album._id,
            duration: {
                minutes: data.get('minutes'),
                seconds: data.get('seconds')
            }
        }

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/song`,payload,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log('Error:', err);
        }) 
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.songForm}>
                <TextField variant="outlined" name="name" label="Name" required placeholder='Enter Album Name' defaultValue={""}/>
                <TextField variant="outlined" name="minutes" label="Minutes" required placeholder='Enter Minutes' defaultValue={""}/>
                <TextField variant="outlined" name="seconds" label="Seconds" required placeholder='Enter Seconds' defaultValue={""}/>

                <Button type = "submit" variant = "contained" disableElevation>Add Song</Button>
            </form>
        </div>
    )
}

export default SongForm;