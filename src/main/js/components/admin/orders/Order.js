import React, {Component} from "react";
import "./Order.scss"
import {OrderInfo} from "./OrderInfo";

const className = 'order'

export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    render() {
        const {order} = this.props
        console.log(order)
        return <>
            <tr className={className} onClick={() => this.setState({expanded: !this.state.expanded})}>
                <td className={`${className}_id`}>{order.id}</td>
                <td className={`${className}_state`}>{order.state}</td>
                <td className={`${className}_created`}>{new Date(order.created).toLocaleString()}</td>
                <td className={`${className}_totalPrice`}>{order.data.items
                    .map(order => order.price * order.count)
                    .reduce((a, b) => a + b)}</td>
            </tr>
            {this.state.expanded ? <tr><td colSpan='100%'><OrderInfo order = {order}/></td></tr> : null}
            </>
    }
}