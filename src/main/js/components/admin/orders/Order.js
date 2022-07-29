import React, {Component} from "react";
import "./Order.scss"
import {OrderInfo} from "./OrderInfo";
import {isFinalState} from "./OrderUtils";

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
        return <>
            <tr className={className} style={{backgroundColor: this.setOrderColor()}} onClick={() => this.setState({expanded: !this.state.expanded})}>
                <td className={`${className}_id`}>{order.id}</td>
                <td className={`${className}_name`}>{order.data.name}</td>
                <td className={`${className}_state`}>{order.state}</td>
                <td className={`${className}_created`}>{new Date(order.created).toLocaleString('en-US', {hour12: false})}</td>
                <td className={`${className}_totalPrice`}>{order.data.items
                    .map(order => order.price * order.count)
                    .reduce((a, b) => a + b)}</td>
            </tr>
            {this.state.expanded ? <tr>
                <td colSpan='100%'><OrderInfo order={order}/></td>
            </tr> : null}
        </>
    }

    setOrderColor = () => {
        const {order} = this.props
        if (isFinalState(order.state)) {
            return "#889596"
        }
        if (order.state === 'payment_received'){
            return "#37ff3f"
        }
        if (order.data.deliveryOption.price < 0) {
            return "#f7f79b"
        }
    }
}