import styles from './artist.module.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import { useState } from 'react';

const SongDiv = ({ data, i, deleteSong, updateSong }) => {
    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(!edit);
    }

    const cancelEdit = () => {
        console.log('Cancelling edit...');
        setEdit(false);
    }

    const handleSongUpdate = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const payload = {
            name: formData.get('name'),
            duration: {
                minutes: formData.get('minutes'),
                seconds: formData.get('seconds'),
            }
        }

        updateSong(data._id, payload);
        setEdit(false);
    }

    const handleDelete = () => {
        console.log('Deleting...');
        deleteSong(data._id);
    }

    return (
        <form onSubmit={handleSongUpdate}>
            <div className={styles.albumSongDetails}>

                {edit ?
                    <div className={styles.updateSongInfo}>
                        <TextField name="name" defaultValue={data.name} sx={{ width: '60%' }} label="Name" />
                        <TextField name="minutes" defaultValue={data.duration.minutes} sx={{ width: '15%' }} label="Minutes" />
                        <TextField name="seconds" defaultValue={data.duration.seconds} sx={{ width: '15%' }} label="Seconds" />
                    </div>

                    :

                    <div className={styles.songInfo}>
                        <p>{i + 1}. {data.name}</p>
                        <p>{data.duration.minutes}:{data.duration.seconds < 10 ? `0${data.duration.seconds}` : `${data.duration.seconds}`}</p>
                    </div>
                }
                <div className={styles.songButtons}>
                    {edit ?

                        <div>
                            <IconButton color="success" type="submit">
                                <CheckIcon />
                            </IconButton>
                        </div>

                        :
                        // <div>
                            <IconButton color="primary" onClick={handleEdit}>
                                <EditIcon />
                            </IconButton>
                        // </div>
                    }

                    {edit ?

                        <div>
                            <IconButton color="error" onClick={cancelEdit}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        :

                        // <div>
                            <IconButton color="error" onClick = {handleDelete}>
                                <DeleteIcon />
                            </IconButton>
                        // </div>
                    }
                </div>

            </div>
        </form>
    )
}

export default SongDiv;
