import axios from "axios";
import { useState, useEffect } from "react";
import Album from "./Album";
import AlbumForm from "./AlbumForm";
import styles from './artist.module.css';
import SongForm from "./SongForm";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useDispatch, useSelector } from "react-redux";
import { getArtistsAlbums } from "../../redux/album/action";
import { logoutSuccess } from "../../redux/artist/action";
import {Button} from '@mui/material';
import { useNavigate } from "react-router";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}

const ArtistPage = () => {
    const { artist } = useSelector(state => state.artist);
    const {artistsAlbum} = useSelector(state => state.album);
    const [album, setAlbum] = useState(null);
    const [value, setValue] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getAlbums = () => {
        dispatch(getArtistsAlbums(artist.id));
    }

    const logout = () => {
        dispatch(logoutSuccess());
        navigate('/', {});
    }

    useEffect(() => {
        getAlbums();
    }, [])

    return (
        <div className={styles.artistPage}>
            <h1>{artist.name.firstName} {artist.name.lastName}</h1>


            <Tabs value={value} onChange={handleChange} indicatorColor="primary" sx={{ margin: '20px 0px', fontSize: '28px' }} aria-label="basic tabs example" centered>
                <Tab label={`Profile`} />
                <Tab label={`Albums`} />
                <Tab label={`Create New Album`} />
            </Tabs>

            <TabPanel value={value} index={0}>
                {artist.name.firstName}'s Profile

                <Button onClick = {logout} variant = "contained">LOGOUT</Button>
            </TabPanel>
            <TabPanel value={value} index={1}>
                {artistsAlbum ?

                    < div className={styles.albumDiv}>
                        {artistsAlbum.map(el => {
                            return <Album key={el._id} data={el} />
                        })}
                    </div>

                    :
                    <p>No albums available!</p>
                }
            </TabPanel >
            <TabPanel value={value} index={2}>
                <AlbumForm setAlbum={setAlbum} />
            </TabPanel>
        </div >
    )
}

export default ArtistPage;