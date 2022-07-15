import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({children, ...rest}) => {
    return (
        <Route {...rest} render={({location}) => {
            return localStorage.getItem("auth") ? children : <Redirect to='/login' from={location}/>
        }}/>
    );
};

export default PrivateRoute
