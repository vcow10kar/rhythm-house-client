import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import styles from './login.module.css';

const Login = () => {

    const {handleCheckUser} = useContext(LoginContext);

    const handleLogin = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        const payload = {
            username: data.get('username'),
            password: data.get('password')
        }

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/artist/login`, payload)
        .then((res) => {
            localStorage.setItem('token', res.data.token);
            handleCheckUser();
            window.location.href = '/';
        })
        .catch(err => {
            console.log('Error:', err);
        })
    }

    return (
        <div className={styles.loginStack}>
            <h1>LOGIN HERE</h1>
            <form onSubmit={handleLogin}>
                <TextField name = "username" type="text" required placeholder="Enter Username..." sx={{ color: 'white' }} variant="outlined" label="Username" />
                <TextField name = "password" type="password" required placeholder="Enter Password..." sx={{ color: 'white' }} variant="outlined" label="Password" />
                <Button type="submit" variant="contained" disableElevation  sx = {{marginTop: '20px'}}>Login</Button>
            </form>
            <h2>Don't have an account? <Link to='/register'>Register!</Link></h2>
        </div>
    )
}

export default Login;