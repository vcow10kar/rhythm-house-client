import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styles from './album.module.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    border: '1px solid #384AF1',
    background: '#000',
    padding: '10px'
};



const AlbumSongs = ({ album, songs, open, handleClose }) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={styles.albumDetails}>
                        <img className={styles.albumCover} src={album.coverURL} alt="album cover" />
                        <div>
                            <h1 className={styles.albumName}>{album.name}</h1>
                            <p>{album.artist.name.firstName} {album.artist.name.lastName}</p>
                            <p>{album.year}</p>
                            <p>{songs.length} {songs.length > 1 ? 'songs' : 'song'}</p>
                        </div>
                    </div>

                    <div className={styles.albumSongsHeader}>
                        <h2>Songs in <span className = {styles.songsHeader}>{album.name}</span></h2>
                    </div>
                    {songs.map((el, i) => {
                        return (
                            <div key = {`album-${i}`} className={styles.albumSongDetails}>
                                <p>{i + 1}. {el.name}</p>
                                <p>{el.duration.minutes}:{el.duration.seconds < 10 ? `0${el.duration.seconds}` : `${el.duration.seconds}`}</p>
                            </div>
                        )
                    })}
                </Box>

            </Modal>

        </div>
    )
}

export default AlbumSongs;