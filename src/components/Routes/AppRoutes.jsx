import {Switch, Route} from 'react-router-dom';
import ArtistPage from '../ArtistPage/ArtistPage';
import Login from '../Login/Login';
import MainPage from '../MainPage/MainPage';
import Register from '../Register/Register';


const AppRoutes = () => {
    return (
        <div>
            <Switch>
                <Route path = '/' exact component={MainPage}/>
                <Route path = '/album' component = {MainPage}/>
                <Route path = '/login' component = {Login}/>
                <Route path = '/register' component = {Register}/>
                <Route path = '/artistPage' component = {ArtistPage}/>
            </Switch>
        </div>
    )
}

export default AppRoutes;