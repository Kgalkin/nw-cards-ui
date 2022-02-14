import React from "react";
import Image from "../image/Image";
import {loadOrderByUuid} from "../../utils/apiUtils";
import "./OrderPreview.scss"
import {Loading} from "../loading/Loading";

const className = "order_preview"

export class OrderPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: null
        }
    }

    componentDidMount() {
        loadOrderByUuid(this.props.uuid)
            .then(r => r.json())
            .then(r => {
                    console.log({order: r});
                    this.setState({order: r});
                }
            )
    }

    render() {
        console.log(this.state.order?.data?.items)
        const {order} = this.state
        if (!order) {
            return <Loading/>
        }
        const totalPrice = order.data.items.map(i => i.count * i.price)
            .reduce((a, b) => a + b) + order.data.deliveryOption.price
        return <div className={className}>
            <div className={`${className}_description`}>
                {`Вы оформили заказ в магазине NorthwindCards здесь вы можете еще раз просмотреть ваш заказ и оплатить его.
                    Если заказ не будет оплачен в течение 3х дней, он будет расформирован.` + (order.state.includes("email_sent") &&
                    " На вашу почту было отправлено письмо с информацией по заказу. В письме есть ссылка для возврата на эту страницу.")
                }
            </div>
            <div className={`${className}_button_container`}>
                <button>{`Oплатить ${totalPrice}руб`}</button>
            </div>
            <table className={`${className}_table`}>
                <thead>
                <tr>
                    <th>Превью</th>
                    <th>Название</th>
                    <th>Количество</th>
                    <th>Стоимость</th>
                    <th>Итого</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Доставка</td>
                    <td colSpan={2}>{order.data.deliveryOption.description}</td>
                    <td>{order.data.deliveryOption.price}</td>
                    <td>{order.data.deliveryOption.price}</td>
                </tr>
                {order.data.items.map(item => this.createRow(`${className}_row_${order.id}`, item))}
                </tbody>
            </table>
        </div>
    }

    createRow = (prefix, item) => {
        return <tr className={`${prefix}_item_${item?.id}`}>
            <td><Image links={item.data.links}/></td>
            <td>{item.data.title}</td>
            <td>{item.count}</td>
            <td>{item.price}</td>
            <td>{item.price * item.count}</td>
        </tr>
    }
}