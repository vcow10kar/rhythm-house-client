import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from './album.module.css';
import AlbumSongs from './AlbumSongs';

const Album = ({ data }) => {
    const [songs, setSongs] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/song/album/${data._id}`)
            .then((res) => {
                setSongs(res.data.songs);
            })
            .catch(err => {
                console.log('Error:', err);
            })
    }, [])
    return (
        <div className={styles.albumDiv}>
            <img onClick={handleOpen} src={data.coverURL} alt="cover url" />
            <h2 className={styles.albumName}>{data.name}</h2>
            <p><em>{data.artist.name.firstName} {data.artist.name.lastName}</em></p>
            <p className={styles.songInfo}>Genre: <span className={styles.songsHeader}>{data.genre}</span></p>
            <p className={styles.songInfo}>Year of Release: <span className={styles.songsHeader}>{data.year}</span></p>

            <AlbumSongs album = {data} songs = {songs} open = {open} handleClose = {handleClose} handleOpen = {handleOpen}/>
        </div>
    )
}

export default Album;