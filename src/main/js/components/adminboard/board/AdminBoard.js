import React from "react";
import "./AdminBoard.scss"

const className = 'admin_board'

export class AdminBoard extends React.Component {

    render() {
        return <div className={`${className}_container`}>
            <a href="/admin/items">Товары</a>
            <a href="/admin/orders">Заказы</a>
        </div>
    }
}