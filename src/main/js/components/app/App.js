import React from 'react'
import './App.scss';
import {createBrowserRouter, redirect, RouterProvider, Outlet} from "react-router-dom"
import StickyCartHeader from "../stickyheader/StickyCartHeader";
import Content from "../content/Content";
import HeaderInfoLine from "../cart/HeaderInfoLine";
import Footer from "../footer/Footer";
import Menu from "../menuselectitems/Menu";
import Modal from "../modal/Modal";
import LoginForm from "./LoginForm";
import {AdminBoard} from "../adminboard/board/AdminBoard";
import OrdersList from "../admin/orders/OrdersList";
import StoreItems from "../admin/storeitems/StoreItems";
import {loadAllTags} from "../../utils/apiUtils";
import OrderPreview from "../orderform/OrderPreview";
import {PaymentReceived} from "../pymentreceived/PaymentReceived";

const privateRouteLoader = () => {
  if (localStorage.getItem("auth")) {
    return null
  }
  return redirect('/login');
}

const router = createBrowserRouter([
  {
    path: "admin",
    loader: privateRouteLoader,
    element: <AdminBoard/>,
    children: [
      {
        path: "orders",
        element: <OrdersList/>
      },
      {
        path: "items",
        element: <StoreItems/>
      }
    ]
  },
  {
    path: "login",
    element: <LoginForm/>
  },
  {
    path: "/content",
    element: (
        <StickyCartHeader
            stickyContent={<>
              <HeaderInfoLine/>
              <Menu/>
            </>}
            mainContent={<>
              <Content/>
              <Footer/>
            </>}/>
    )
  },
  {
    path: "/orders/:uuid",
    element: <OrderPreview/>
  },
  {
    path: "/paymentreceived",
    element: <PaymentReceived/>
  },
  {
    path: "*",
    loader: () => redirect('/content?tags=1')
  }
]);

export default function App(props) {
  loadAllTags();
  return <>
    <RouterProvider router={router}/>
    <Modal/>
  </>
  /*   return <>
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
           <Route path='/paymentreceived'><PaymentReceived/> </Route>
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
     </>;*/
}