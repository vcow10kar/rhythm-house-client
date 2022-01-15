import { useState, useEffect } from "react";
import axios from 'axios';
import Album from "./Album";
import styles from './album.module.css';
import { Button, TextField } from "@mui/material";

const MainPage = () => {
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([]);
    const [sort, setSort] = useState('ascending');

    const getAlbumData = () => {
        axios.get('http://localhost:5000/album')
            .then((res) => {
                setData(res.data.albums);
                setFilteredData(res.data.albums);
            })
            .catch(err => {
                console.log('Error:', err);
            })
    }

    const sortDataByYear = () => {
        if (sort === 'ascending') {
            let temp = filteredData.sort((a, b) => a.year - b.year);
            setFilteredData([...temp]);
            setSort('descending');
        } else {
            let temp = filteredData.sort((a, b) => b.year - a.year);
            setFilteredData([...temp]);
            setSort('ascending');
        }

    }

    const searchAlbum = (e) => {
        let temp = data.filter(el => el.name.toLowerCase().includes(e.target.value.toLowerCase()) ? true : false);
        setFilteredData(temp);
    }

    useEffect(() => {
        getAlbumData();
        sortDataByYear();
    }, []);
    return (
        <div>
            <div className = {styles.actionsDiv}>
                <TextField onInput={searchAlbum} type = "text" variant = "outlined" label = "Search Albums" placeholder="Search Albums..."/>
                <Button onClick={sortDataByYear} variant="contained" disableElevation>Sort {sort === 'ascending' ? `(Oldest)` : `(Latest)`}</Button>
            </div>
            <div>
                {data.length > 0 ?
                    <div className={styles.albums}>
                        {filteredData.map(el => {
                            return <Album key={el._id} data={el} />
                        })}
                    </div>
                    : null}
            </div>
        </div>
    )
}

export default MainPage;