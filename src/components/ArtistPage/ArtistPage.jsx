import { useState } from "react";
import AlbumForm from "./AlbumForm";
import styles from './artist.module.css';
import SongForm from "./SongForm";

const ArtistPage = () => {
    const [album, setAlbum] = useState(null);
    return (
        <div className={styles.artistPage}>
            <h1>Artist's Page</h1>

            {!album ?

                <AlbumForm setAlbum={setAlbum} />
                :
                <SongForm album = {album}/>
            }
        </div>
    )
}

export default ArtistPage;