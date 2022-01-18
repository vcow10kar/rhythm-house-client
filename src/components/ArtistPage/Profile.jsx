import { useSelector, useDispatch } from 'react-redux';
import { artistUpdate, logoutSuccess } from "../../redux/artist/action";
import { Button, TextField } from '@mui/material';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import styles from './artist.module.css';

const Profile = () => {
    const { token, artist } = useSelector(state => state.artist);
    const [update, setUpdate] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const logout = () => {
        dispatch(logoutSuccess());
        history.push('/');
    }

    const handleFormChange = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        const payload = {
            name: {
                firstName: data.get('firstName'),
                lastName: data.get('lastName'),

            },
            username: artist.username,
            email: artist.email,
            bio: data.get('bio').length > 0 ? data.get('bio') : null,
            imageURL: data.get('url').length > 0 ? data.get('url') : null
        }

        dispatch(artistUpdate(payload, token, artist.id));
    }

    const handleUpdate = () => {
        setUpdate(!update);
    }

    const cancelUpdate = () => {
        if(update) {
            setUpdate(!update);
        }
    }

    return (
        <div>

            <h1>{artist.name.firstName} {artist.name.lastName}</h1>

            <div className={styles.logoutDiv}>
                <Button onClick={handleUpdate} disabled={update ? true : false}>{update ? "Editing..." : "Edit Profile?"}</Button>
                <Button onClick={logout} color="error" variant="outlined" sx={{ marginBottom: '40px'}}>LOGOUT</Button>
            </div>


            <form className={styles.albumForm} onSubmit={handleFormChange}>
                <TextField disabled = {update ? false : true} name="firstName" defaultValue={artist.name.firstName} label="First Name" />
                <TextField disabled = {update ? false : true} name="lastName" defaultValue={artist.name.lastName} label="Last Name" />
                <TextField  name="username" defaultValue={artist.username} label="Username" disabled />
                <TextField name="email" defaultValue={artist.email} label="Email Id" disabled />
                <TextField disabled = {update ? false : true} name="bio" defaultValue={artist.bio} label="Bio" />
                <TextField disabled = {update ? false : true} name="url" defaultValue={artist.imageURL} label="Image URL" />

                <div className={styles.actionsDiv}>
                    <Button type="submit" disabled = {update ? false : true} disableElevation variant='contained' sx={{ marginTop: '20px' }}>Update Profile</Button>
                    <Button type="submit" disableElevation sx={{ marginTop: '20px' }} onClick = {cancelUpdate}>Cancel</Button>
                </div>

            </form>


        </div>
    )
}

export default Profile;