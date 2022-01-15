import {Routes, Route} from 'react-router-dom';
import ArtistPage from '../ArtistPage/ArtistPage';
import Login from '../Login/Login';
import MainPage from '../MainPage/MainPage';
import Register from '../Register/Register';


const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path = '/' exact element = {<MainPage/>}/>
                <Route path = '/login' element = {<Login/>}/>
                <Route path = '/register' element = {<Register/>}/>
                <Route path = '/artistPage' element = {<ArtistPage/>}/>
            </Routes>
        </div>
    )
}

export default AppRoutes;