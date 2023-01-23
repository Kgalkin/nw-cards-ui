import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import App from './components/app/app'
import store from "./reducers";
import {BrowserRouter} from "react-router-dom";

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    rootElement);