import { Button } from "@mui/material";
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { artist } = useSelector(state => state.artist);

    return (
        <div className={styles.navbar}>
            <div className={styles.appLogo}>

                <img onClick={() => window.location.href = '/'} src='/assets/logo.png' alt='rhythm-logo' />

            </div>

            <div>

                {artist ?
                    <Link to='/artistPage'>
                        <Button variant="outlined">
                            Hi, {artist.name.firstName}
                        </Button>
                    </Link>
                    :
                    <Link to='/login'>
                        <Button variant="outlined">
                            Artist Gateway
                        </Button>
                    </Link>
                }
            </div>
        </div>
    )
}

export default Navbar;