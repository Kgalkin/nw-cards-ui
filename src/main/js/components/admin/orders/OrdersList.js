import React, {Component} from "react";
import {loadOrders} from "../../../utils/apiUtils";
import Order from "./Order";
import "./OrderList.scss"
import {LOADING} from "../../../reducers/actions";
import {PAGE_SIZE} from "../../content/Content";

const className = "order_list"
export default class OrdersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }

        this.loadOrdersPage = () => {
            loadOrders("none")
                .then(orders => {
                    this.setState({orders})
                })
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            if (((this.props.items?.items?.length % PAGE_SIZE === 0) && document.scrollingElement.scrollHeight / (document.scrollingElement.scrollTop + document.scrollingElement.scrollWidth) < 1.2
                && this.props.items.state !== LOADING)) {
                this.loadOrdersPage();
            }
        });
        this.loadOrdersPage()
    }

    render() {
        return <table className={className}>
            <thead>
            <tr>
                <th>Номер</th>
                <th>Имя</th>
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
        return orders.map(order => <Order key={order.id} order={order}/>)
    }
}
