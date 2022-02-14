import React, {Component} from 'react'
import StickyCartHeader from "../stickyheader/StickyCartHeader";
import './App.scss';
import Content from './../content/Content'
import Modal from "../modal/Modal";
import CartInfo from "../cart/CartInfo";
import {Route, Switch, withRouter} from "react-router-dom"
import StoreItems from "../admin/storeitems/StoreItems";
import Menu from "../admin/menuselectitems/Menu";
import {loadAllTags} from "../../utils/apiUtils";
import OrdersList from "../admin/orders/OrdersList";
import {OrderPreview} from "../orderform/OrderPreview";


class App extends Component {
    componentDidMount() {
        loadAllTags();
    }

    render() {
        this.state;
        return <>
            <div className='app'>
                <Switch>
                    <Route path='/admin/items'>
                        <StoreItems/>
                    </Route>
                    <Route path='/admin/orders'>
                        <OrdersList/>
                    </Route>
                    <Route path='/orders/:uuid' render={props =>
                        <OrderPreview uuid = {props.match.params.uuid}/>
                    }/>
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