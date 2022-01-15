import { useState, useEffect } from "react";
import axios from 'axios';
import Album from "./Album";
import styles from './album.module.css';
import { Button } from "@mui/material";

const MainPage = () => {
    const [data, setData] = useState([]);

    const getAlbumData = () => {
        axios.get('http://localhost:5000/album')
            .then((res) => {
                setData(res.data.albums);
            })
            .catch(err => {
                console.log('Error:', err);
            })
    }

    useEffect(() => {
        getAlbumData();
    }, []);
    return (
        <>
            <div>
                <Button onClick = {} variant = "contained" sx = {{marginBottom: '20px'}} disableElevation>Sort By Year</Button>
            </div>
            <div>
                {data.length > 0 ?
                    <div className={styles.albums}>
                        {data.map(el => {
                            return <Album key={el._id} data={el} />
                        })}
                    </div>
                    : null}
            </div>
        </>
    )
}

export default MainPage;