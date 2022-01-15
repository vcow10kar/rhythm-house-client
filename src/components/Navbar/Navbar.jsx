import { Button } from "@mui/material";
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import { LoginContext } from "../context/LoginContext";
import { useContext } from 'react';

const Navbar = () => {
    const { artistObj } = useContext(LoginContext);

    
    return (
        <div className={styles.navbar}>
            <div className={styles.appLogo}>
                <Link to='/'>
                    <img src='/assets/logo.png' alt='rhythm-logo' />
                </Link>
            </div>

            <div>
                <Button variant="outlined">
                    {artistObj ?
                        <Link to='/artistPage'>
                            Hi, {artistObj.name.firstName}
                        </Link>
                        :
                        <Link to='/login'>
                            Artist Gateway
                        </Link>
                    }
                </Button>
            </div>
        </div>
    )
}

export default Navbar;