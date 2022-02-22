import { useContext } from "react"
import {Redirect, Route} from "react-router-dom"
import UserContext from "../Context/UserContext"

function PrivateRoute({exact, path, children}){
    const {currUser} = useContext(UserContext)
    if (!currUser) return <Redirect to="/login"/>

    return (
        <Route exact={exact} path={path}>
            {children}
        </Route>
    )
}

export default PrivateRoute