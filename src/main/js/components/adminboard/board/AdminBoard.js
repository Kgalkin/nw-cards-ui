import React from "react";
import "./AdminBoard.scss"
import {Link, Outlet} from "react-router-dom";

const className = 'admin_board'

export class AdminBoard extends React.Component {

  render() {
    return <>
      <div className={`${className}_container`}>
        <Link to="items">Товары</Link>
        <Link to="orders">Заказы</Link>
      </div>
      <Outlet/>
    </>
  }
}