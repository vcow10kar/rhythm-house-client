import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({path, children}) => {
    const {token, artist} = useSelector(state => state.artist);

    if(token && artist) {
        return <Route path = {path}>{children}</Route>
    }

    return <Redirect to = '/'/>
}

export default PrivateRoute;