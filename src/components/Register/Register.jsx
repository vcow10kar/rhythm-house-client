import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import styles from './register.module.css';
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

const Register = () => {
    const {handleCheckUser} = useContext(LoginContext);

    return (
        <div className={styles.registerStack}>
            <h1>REGISTER HERE</h1>
            <TextField type="text" required placeholder="Enter First Name..." sx={{ color: 'white' }} variant="outlined" label="First Name" />
            <TextField type="text" required placeholder="Enter Second Name..." sx={{ color: 'white' }} variant="outlined" label="Second Name" />
            <TextField type="text" required placeholder="Enter Email Id..." sx={{ color: 'white' }} variant="outlined" label="Email Id" />
            <TextField type="text" required placeholder="Enter Username..." sx={{ color: 'white' }} variant="outlined" label="Username" />
            <TextField type="password" required placeholder="Enter Password..." sx={{ color: 'white' }} variant="outlined" label="Password" />
            <Button variant="contained" disableElevation>Register</Button>

            <h2>Already have an account? <Link to = '/login'>Login!</Link></h2>
        </div>
    )
}

export default Register;