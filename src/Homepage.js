import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./Context/UserContext";
import {Button} from "reactstrap"

function Homepage(){
    const {currUser} = useContext(UserContext)

    if (currUser) return (
        <div className="container text-center">
            <h1>Jobly</h1> 
            <p>All the jobs in one, convenient place</p>
            <h3>Welcome Back, {currUser.firstName}</h3>
        </div>
    )

    return (
        <div className="container text-center">
            <h1>Welcome to Jobly</h1>
            <p>Please login or signup to access our amazing features</p>
            <NavLink to="/login"><button className="btn btn-primary m-2">Login</button></NavLink>
            <NavLink to="/signup"><button className="btn btn-primary">Signup</button></NavLink>
        </div>
    )
}

export default Homepage