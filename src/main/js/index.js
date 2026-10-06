import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import App from './components/app/App'
import store from "./reducers";
import {BrowserRouter} from "react-router-dom";
import {createRoot} from "react-dom/client";

const rootElement = document.getElementById('root');

const root = createRoot(rootElement)
root.render(<Provider store={store}>
              <App/>
            </Provider>)