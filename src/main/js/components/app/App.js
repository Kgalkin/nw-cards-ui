import React, {Component} from 'react'
import StickyCartHeader from "../stickyheader/StickyCartHeader";
import './App.scss';
import Content from './../content/Content'
import Modal from "../modal/Modal";
import CartInfo from "../cart/CartInfo";
import {Route, Switch, withRouter} from "react-router-dom"
import StoreItems from "../admin/storeitems/StoreItems";
import Menu from "../admin/menuselectitems/Menu";


class App extends Component {

    render() {
        this.state;
        return <>
            <div className='app'>
                <Switch>
                    <Route path='/admin/items'>
                        <StoreItems/>
                    </Route>
                    <Route path='/admin/orders'>
                        <StoreItems/>
                    </Route>
                    <Route path='/'>
                        <StickyCartHeader stickyContent={
                            <>
                                <CartInfo/>
                                <Menu/>
                            </>}
                                          mainContent={
                                              <Content/>}/>
                    </Route>
                </Switch>
            </div>
            <Modal/>
        </>;
    }
}

export default withRouter(App)