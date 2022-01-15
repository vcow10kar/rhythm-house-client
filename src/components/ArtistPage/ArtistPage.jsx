import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { LoginContext } from "../context/LoginContext";
import Album from "./Album";
import AlbumForm from "./AlbumForm";
import styles from './artist.module.css';
import SongForm from "./SongForm";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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
    const { artistObj } = useContext(LoginContext);
    const [album, setAlbum] = useState(null);
    const [albums, setAlbums] = useState([]);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getArtistAlbums = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/album/${artistObj.id}`)
            .then(res => {
                console.log(res);
                setAlbums([...res.data.albums]);
            })
            .catch(err => {
                console.log('Error:', err);
            })
    }

    useEffect(() => {
        getArtistAlbums();
    }, []);
    return (
        <div className={styles.artistPage}>
            <h1>{artistObj.name.firstName} {artistObj.name.lastName}</h1>

            
            <Tabs value={value} onChange={handleChange} indicatorColor="primary" sx = {{margin: '20px 0px', fontSize: '28px'}} aria-label="basic tabs example" centered>
                <Tab label={`Profile`} />
                <Tab label={`Albums`} />
                <Tab label={`Create New Album`} />
            </Tabs>

            <TabPanel value={value} index={0}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className={styles.albumDiv}>
                    {albums.map(el => {
                        return <Album key={el._id} data={el} />
                    })}
                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <AlbumForm setAlbum={setAlbum} />
            </TabPanel>
        </div>
    )
}

export default ArtistPage;