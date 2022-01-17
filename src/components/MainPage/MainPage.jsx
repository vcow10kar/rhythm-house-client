import { useState, useEffect } from "react";
import axios from 'axios';
import Album from "./Album";
import styles from './album.module.css';
import { Button, TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { getAlbums } from "../../redux/album/action";
import { useDispatch, useSelector } from "react-redux";

const MainPage = () => {

    const {loading, failure, albums} = useSelector(state => state.album);

    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(albums);
    const [data, setData] = useState([...albums]);
    const [sort, setSort] = useState('ascending');

    const dispatch = useDispatch();

    const getAlbumData = () => {
        dispatch(getAlbums(null));
    }

    const sortDataByYear = () => {
        if (sort === 'ascending') {
            console.log('sorting ...');
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
        //sortDataByYear();
    }, []);
    return (
        <div>
            <div className={styles.actionsDiv}>
                <TextField InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color = "primary" />
                        </InputAdornment>
                    ),
                }} onInput={searchAlbum} type="text" variant="outlined" placeholder="Search Albums..." sx={{ width: '400px' }} />
                <Button onClick={sortDataByYear} variant="contained" disableElevation>Sort {sort === 'ascending' ? `(Oldest)` : `(Latest)`}</Button>
            </div>
            <div>
                {albums.length > 0 ?
                    <div className={styles.albums}>
                        {albums.map(el => {
                            return <Album key={el._id} data={el} />
                        })}
                    </div>
                    : null}
            </div>
        </div>
    )
}

export default MainPage;