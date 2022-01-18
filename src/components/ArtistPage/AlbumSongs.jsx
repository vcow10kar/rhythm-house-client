import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styles from './artist.module.css';
import SongDiv from './SongDiv';
import { Button, Icon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    border: '1px solid #384AF1',
    background: '#000',
    padding: '10px'
};



const AlbumSongs = ({ album, open, handleClose }) => {
    const { token } = useSelector(state => state.artist);

    const [songs, setSongs] = useState([]);
    const [update, setUpdate] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(!edit);
    }

    const cancelEdit = () => {
        console.log('Cancelling edit...');
        setEdit(false);
    }

    const deleteSong = (id) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/song/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => {
                setUpdate(!update);
            })
            .catch((err) => {
                console.log('Error:', err);
            })
    }

    const updateSong = (id, payload) => {
        axios.patch(`${process.env.REACT_APP_BACKEND_URL}/song/${id}`, payload,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => {
                setUpdate(!update);
            })
            .catch((err) => {
                console.log('Error:', err);
            })
    }

    const handleNewSong = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const payload = {
            name: formData.get('name'),
            album: album._id,
            duration: {
                minutes: formData.get('minutes'),
                seconds: formData.get('seconds'),
            }
        }

        //console.log(payload);

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/song`, payload,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => {
                setUpdate(!update);
                setEdit(false);
            })
            .catch((err) => {
                console.log('Error:', err);
            })
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/song/album/${album._id}`)
            .then((res) => {
                setSongs(res.data.songs);
            })
            .catch(err => {
                console.log('Error:', err);
            })
    }, [update])
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={styles.albumArtistDetails}>
                        <img className={styles.albumCover} src={album.coverURL} alt="album cover" />
                        <div className={styles.songtext}>
                            <h1 className={styles.albumName}>{album.name}</h1>
                            <p><em>{album.artist.name.firstName} {album.artist.name.lastName}</em></p>
                            <p>Year of Release: {album.year}</p>
                            <p>Genre: {album.genre}</p>
                            <p>{songs.length} {songs.length > 1 ? 'songs' : 'song'}</p>
                        </div>
                    </div>

                    <div className={styles.albumSongsHeader}>
                        <h2>Songs in <span className={styles.songsHeader}>{album.name}</span></h2>
                    </div>
                    <div>
                        {songs.map((el, i) => {
                            return (
                                <SongDiv data={el} i={i} key={`album-${i}`} deleteSong={deleteSong} updateSong={updateSong} />
                            )
                        })}
                    </div>

                    {edit ?
                        <form className={styles.albumSongDetails} onSubmit = {handleNewSong}>
                            <div className={styles.updateSongInfo}>
                                <TextField type = "text" name="name" sx={{ width: '60%' }} label="Name" required/>
                                <TextField type = "number" name="minutes" sx={{ width: '15%' }} label="Minutes" required />
                                <TextField type = "number" name="seconds" sx={{ width: '15%' }} label="Seconds" required />
                            </div>

                            <div>
                                <IconButton color="success" type="submit">
                                    <AddIcon />
                                </IconButton>

                                <IconButton color="error" onClick={cancelEdit}>
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        </form>
                        :

                        <div>
                            <IconButton color="primary" onClick={handleEdit}>
                                <AddCircleIcon fontSize="large" />
                            </IconButton>
                        </div>
                    }

                </Box>

            </Modal>

        </div>
    )
}

export default AlbumSongs;