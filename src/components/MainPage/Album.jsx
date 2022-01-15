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
        axios.get(`http://localhost:5000/song/album/${data._id}`)
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
            <p>{data.artist.name.firstName} {data.artist.name.lastName}</p>
            <p>{data.year}</p>

            <AlbumSongs album = {data} songs = {songs} open = {open} handleClose = {handleClose} handleOpen = {handleOpen}/>
        </div>
    )
}

export default Album;