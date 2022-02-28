import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({children, ...rest}) => {
    console.log("in private route")
    return (
        <Route {...rest} render={({location}) => {
            console.log("login")
            return localStorage.getItem("auth") ? children : <Redirect to='/login' from={location}/>
        }}/>
    );
};

export default PrivateRoute
