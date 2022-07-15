import React, {Component} from 'react'
import './App.scss';
import {Route, Switch, withRouter} from "react-router-dom"
import StoreItems from "../admin/storeitems/StoreItems";
import {loadAllTags} from "../../utils/apiUtils";
import OrdersList from "../admin/orders/OrdersList";
import PrivateRoute from "./PrivateRoute";
import {OrderPreview} from "../orderform/OrderPreview";
import StickyCartHeader from "../stickyheader/StickyCartHeader";
import Menu from "../admin/menuselectitems/Menu";
import Content from "../content/Content";
import Modal from "../modal/Modal";
import {LoginForm} from "./LoginForm";
import {AdminBoard} from "../adminboard/board/AdminBoard";
import HeaderInfoLine from "../cart/HeaderInfoLine";
import Footer from "../footer/Footer";

class App extends Component {
  componentDidMount() {
    loadAllTags();
  }

  render() {
    return <>
      <div className='app'>
        <Switch>
          <PrivateRoute path='/admin/items'>
            <StoreItems/>
          </PrivateRoute>
          <PrivateRoute path='/admin/orders'>
            <OrdersList/>
          </PrivateRoute>
          <PrivateRoute path='/admin'>
            <AdminBoard/>
          </PrivateRoute>
          <Route path='/login' render={props => <LoginForm {...props}/>}/>
          <Route path='/orders/:uuid' render={props =>
              <OrderPreview uuid={props.match.params.uuid}/>
          }/>
          <Route path='/'>
            <StickyCartHeader stickyContent={
              <>
                <HeaderInfoLine/>
                <Menu/>
              </>}
                              mainContent={<>
                                <Content/>
                                <Footer/>
                              </>}/>
          </Route>
        </Switch>
      </div>
      <Modal/>
    </>;
  }
}

export default withRouter(App)