import React, {Component} from "react";
import Image from "../../image/Image";
import "./OrderInfo.scss"
import {patchOrder} from "../../../utils/apiUtils";
import {isFinalState} from "./OrderUtils";
import {isNumber} from "../../../utils/utils";

const className = "order_info"

export class OrderInfo extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {order} = this.props
        return <div className={className}>
            <div className={`${className}_actions`}>
                {this.createSetDeliveryPriceAction()}
                {this.createRevokeOrderAction()}
            </div>
            <div className={`${className}_description`}>
                <div className={`${className}_description_item`}>
                    <div className={`${className}_description_item_label`}>Имя:</div>
                    <div className={`${className}_description_item_value`}>{order.data.name}</div>
                </div>
                <div className={`${className}_description_item`}>
                    <div className={`${className}_description_item_label`}>Почта:</div>
                    <div className={`${className}_description_item_value`}>{order.data.email}</div>
                </div>
                <div className={`${className}_description_item`}>
                    <div className={`${className}_description_item_label`}>Адрес:</div>
                    <div className={`${className}_description_item_value`}>{order.data.address}</div>
                </div>
                <div className={`${className}_description_item`}>
                    <div className={`${className}_description_item_label`}>Индекс:</div>
                    <div className={`${className}_description_item_value`}>{order.data.index}</div>
                </div>
                <div className={`${className}_description_item`}>
                    <div className={`${className}_description_item_label`}>Доставка</div>
                    <div className={`${className}_description_item_value`}>{order.data.deliveryOption.price}</div>
                    <div>{`(${order.data.deliveryOption.description})`}</div>
                </div>

            </div>
            <table className={`${className}_table`}>
                <thead>
                <tr>
                    <th>View</th>
                    <th>Id</th>
                    <th>Название</th>
                    <th>Количество</th>
                    <th>Стоимость</th>
                    <th>Итого</th>
                </tr>
                </thead>
                <tbody>
                {order.data.items.map(item => this.createRow(`${className}_row_${order.id}`, item))}
                </tbody>
            </table>
        </div>
    }

    createRow = (prefix, item) => {
        console.log(item)
        return <tr className={`${prefix}_item_${item?.id}`}>
            <td><Image links={item.data.links}/></td>
            <td>{item.id}</td>
            <td>{item.data.title}</td>
            <td>{item.count}</td>
            <td>{item.price}</td>
            <td>{item.price * item.count}</td>
        </tr>
    }

    createSetDeliveryPriceAction = () => {
        return this.props.order.data.deliveryOption.price > 0 || isFinalState(this.props.order.state) ? null :
            <button className={`${className}_actions_setdeliveryprice`}
            onClick={() => {
                const deliveryPrice = prompt("Укажите цену доставки")
                if (isNumber(deliveryPrice)){
                   this.sendPatchOrder({advance: "SET_DELIVERY_PRICE", deliveryPrice})
                       .then(r => window.location.reload())
                } else {
                    alert("Вы ввели нечитаемое чисо")
                }
            }
            }>Задать цену доставки</button>
    }

    createRevokeOrderAction = () => {
        return isFinalState(this.props.order.state) ? null :
            <button
                className={`${className}_actions_revokeorder`}
                onClick={() => {
                    if (confirm("Вы хотите отменить заказ ?"))
                        this.sendPatchOrder({advance: "REVOKE"})
                            .then(r => window.location.reload())
                }}>Cancel Order</button>
    }

    sendPatchOrder = (payload) => {
        return patchOrder(this.props.order.id, payload)
    }

}