import { useState, useEffect } from "react";
import axios from 'axios';
import Album from "./Album";
import styles from './album.module.css';
import { Button, Select, TextField, MenuItem, FormControl } from "@mui/material";
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { getAlbums } from "../../redux/album/action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useTheme } from "@emotion/react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const MainPage = () => {
    const theme = useTheme();

    const { loading, failure, albums, pages, genres } = useSelector(state => state.album);
    const history = useHistory();

    const queryObj = new URLSearchParams(history.location.search);

    const queryValues = {
        sort: queryObj.get('sort'),
        page: queryObj.get('page') || 1,
        genres: queryObj.get('genres') ? queryObj.get('genres').split(',') : []
    }

    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(albums);
    const [data, setData] = useState([...albums]);
    const [sort, setSort] = useState(queryValues.sort);
    const [currPage, setCurrPage] = useState(queryValues.page);
    const [filter, setFilter] = useState("");
    const [filters, setFilters] = useState(queryValues.genres);

    const dispatch = useDispatch();

    const getAlbumData = (query) => {
        dispatch(getAlbums(query));
    }

    const sortDataByYear = () => {
        if (sort === 'asc') {
            setSort('desc');
        } else {
            setSort('asc');
        }

    }

    const searchAlbum = (e) => {
        let temp = data.filter(el => el.name.toLowerCase().includes(e.target.value.toLowerCase()) ? true : false);
        setFilteredData(temp);
    }

    const changeCurrentPage = (i) => {
        setCurrPage(i);
    }

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setFilters(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    useEffect(() => {
        const urlParams = new URLSearchParams()

        if (currPage > 1) {
            urlParams.append("page", currPage);
        } else if (currPage == 1) {
            urlParams.delete("page");
        }

        if (sort) {
            urlParams.append('sort', sort);
        }

        if(filters.length > 0 && filters) {
            urlParams.append('genres', filters.join(","));
        }

        history.push({ search: urlParams.toString() })

        const query = history.location.search;

        getAlbumData(query);
    }, [currPage, sort, filters]);


    return (
        <div>
            <div className={styles.actionsDiv}>
                <TextField InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="primary" />
                        </InputAdornment>
                    ),
                }} onInput={searchAlbum} type="text" variant="outlined" placeholder="Search Albums..." sx={{ width: '400px' }} />
                <Button onClick={sortDataByYear} variant="contained" disableElevation>Sort {sort === 'ascending' ? `(Oldest)` : `(Latest)`}</Button>
            {/* </div> */}

            {/* <div className={styles.filtersDiv}> */}
                {genres ?
                    <FormControl sx={{ minWidth: 200, marginBottom: '20px' }}>
                        <InputLabel id="demo-multiple-chip-label">Genres</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={filters}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Genres" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {genres.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, filters, theme)}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    : null}
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



            <div className={styles.pagination}>
                {pages.length > 0 ?

                    pages.map(el => {
                        return <Button variant={el == currPage ? "contained" : null} onClick={() => changeCurrentPage(el)} key={`buttonKey-${el}`} sx={{ width: '16px', margin: '30px 10px' }}>{el}</Button>
                    })
                    : <Button>1</Button>
                }

            </div>



        </div>
    )
}

export default MainPage;