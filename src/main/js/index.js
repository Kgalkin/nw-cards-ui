import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import App from './components/app/app'
import {Router} from "react-router-dom"
import {createBrowserHistory} from 'history'
import store from "./reducers";

const rootElement = document.getElementById('root');

const history = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>,
    rootElement);