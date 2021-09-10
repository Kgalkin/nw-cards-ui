import React, {Component} from 'react'
import StickyCartHeader from "../stickyheader/StickyCartHeader";
import './App.scss';
import Content from './../content/Content'
import Modal from "../modal/Modal";
import CartInfo from "../cart/CartInfo";
import CreateItem from "../createitem/CreateItem";
import {Route, Switch, withRouter} from "react-router-dom"


class App extends Component {

    render() {
        this.state;
        return <>
            <div className='app'>
                <Switch>
                    <Route path='/admin'>
                        <CreateItem/>
                    </Route>
                    <Route path='/'>
                        <StickyCartHeader stickyContent={<CartInfo/>} mainContent={
                            <Content/>}/>
                    </Route>
                </Switch>
            </div>
            <Modal/>
        </>;
    }
}

export default withRouter(App)