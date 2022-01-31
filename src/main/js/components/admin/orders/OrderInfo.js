import React, {Component} from "react";
import {loadItemsIds} from "../../../utils/apiUtils";
import Image from "../../image/Image";
import  "./OrderInfo.scss"

const className = "order_info"

export class OrderInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            items: []
        }

        this.concatItems = (items, orderItems) => {
            let merged = [];
            for (let i = 0; i < orderItems.length; i++) {
                merged[i] = ({
                    ...items.filter(it => it.id === orderItems[i].id)[0],
                    ...orderItems[i]
                })
            }
            console.group("OrderInfo")
            console.log(merged)
            console.log()
            return merged;
        }

        this.loadItems = () => {
            this.setState({loading: true})
            loadItemsIds(this.props.order.data.items.map(it => it.id))
                .then(r => r.json())
                .then(r => this.setState({
                    items: this.concatItems(r.items, this.props.order.data.items),
                    loading: false
                }))
        }
    }

    componentDidMount() {
        this.loadItems()
    }

    render() {
        const {order} = this.props
        return this.state.loading ? <div>Loading...</div> :
            <table className={className}>
                <thead>
                <th>View</th>
                <th>Id</th>
                <th>Название</th>
                <th>Количество</th>
                <th>Стоимость</th>
                <th>Итого</th>
                </thead>
                <tbody>
                {this.state.items.map(item => this.createRow(`${className}_row_${order.id}`, item))}
                </tbody>
            </table>
    }

    createRow = (prefix, item) => {
        return <tr className={`${prefix}_item_${item?.id}`}>
            <td><Image links = {item.data.links}/></td>
            <td>{item.id}</td>
            <td>{item.data.title}</td>
            <td>{item.count}</td>
            <td>{item.price}</td>
            <td>{item.price*item.count}</td>
        </tr>
    }

}