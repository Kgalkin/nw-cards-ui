import React, {Component} from "react";
import {loadOrders} from "../../../utils/apiUtils";
import Order from "./Order";
import "./OrderList.scss"

const className = "order_list"
export default class OrdersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }

        this.loadOrdersPage = () => {
            loadOrders("iddqd")
                .then(orders => {
                    console.log(orders)
                    this.setState({orders})
                })
        }
    }

    componentDidMount() {
        this.loadOrdersPage()
    }

    render() {
        return <table className={className}>
            <thead>
            <tr>
                <th>Номер</th>
                <th>Статус</th>
                <th>Дата создания</th>
                <th>Полная стоимость</th>
            </tr>
            </thead>
            <tbody>
            {this.constructOrders(this.state.orders)}
            </tbody>
        </table>
    }

    constructOrders = orders => {
        return orders.map(order => <Order order={order}/>)
    }
}
