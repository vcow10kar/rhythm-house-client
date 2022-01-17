import { TextField, Button } from "@mui/material";
import styles from './login.module.css';
import { loginArtist } from "../../redux/artist/action";
import { useDispatch, useSelector } from "react-redux";
import { getArtistsAlbums } from "../../redux/album/action";
import { useHistory } from "react-router-dom";

const Login = () => {

    const { loading, artist, failure } = useSelector(state => state.artist);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        const payload = {
            username: data.get('username'),
            password: data.get('password')
        }

        dispatch(loginArtist(payload));

        history.push('/');
    }

    return (
        <div className={styles.loginStack}>
            <h1>LOGIN HERE</h1>
            <form onSubmit={handleLogin}>
                <TextField name="username" type="text" required placeholder="Enter Username..." sx={{ color: 'white' }} variant="outlined" label="Username" />
                <TextField name="password" type="password" required placeholder="Enter Password..." sx={{ color: 'white' }} variant="outlined" label="Password" />

                {loading ? <p>Logging you in....</p> : null}
                {failure ? <p>Something went wrong!</p> : null}

                <Button type="submit" variant="contained" disableElevation sx={{ marginTop: '20px' }}>Login</Button>
            </form>
            {/* <h2>Don't have an account? <Link to='/register'>Register!</Link></h2> */}
        </div>
    )
}

export default Login;