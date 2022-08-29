import React from "react";
import Image from "../image/Image";
import {loadOrderByUuid, requestPayment} from "../../utils/apiUtils";
import "./OrderPreview.scss"
import {Loading} from "../loading/Loading";

const className = "order_preview"

export class OrderPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: null,
            link: null
        }
        this.handlePayment = () => {
            requestPayment(this.state.order.id)
                .then(r => {
                    if (r.status===200){
                        r.json().then(json =>{
                            this.setState({link: json.link})
                            window.location.href = json.link})
                    } else {
                        alert("Чтото пошло не так с генерацией платежной формы,\nсвяжитесь с нами пожалуйста.")
                    }
                })

        }
    }

    componentDidMount() {
        loadOrderByUuid(this.props.uuid)
            .then(r => r.json())
            .then(r => {
                    this.setState({order: r});
                }
            )
    }

    render() {
        const {order} = this.state
        if (!order) {
            return <Loading/>
        }
        const totalPrice = order.data.items.map(i => i.count * i.price)
            .reduce((a, b) => a + b) + order.data.deliveryOption.price
        return <div className={className}>
            <div className={`${className}_description`}>
                {`Вы оформили заказ в магазине NorthwindCards. 
                Здесь вы можете еще раз просмотреть ваш заказ и оплатить его. 
                Заказ, не оплаченный в течение трех дней, будет расформирован.` + (order.state.includes("email_sent") ?
                    " На вашу почту было отправлено письмо с информацией по заказу. В письме есть ссылка для возврата на эту страницу." : "")
                }
            </div>
            <div className={`${className}_button_container`}>
                {this.canBePayed(order) ? this.buttonOrLink(totalPrice) : null}
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
                    <td>{this.canBePayed(order) ? order.data.deliveryOption.price : "?"}</td>
                    <td>{this.canBePayed(order) ? order.data.deliveryOption.price : "?"}</td>
                </tr>
                {order.data.items.map(item => this.createRow(`${className}_row_${order.id}`, item))}
                </tbody>
            </table>
        </div>
    }

    canBePayed = (order) => {
        return order.state === 'created' && order.data.deliveryOption.price >= 0
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

    buttonOrLink = (totalPrice) => {
        return this.state.link == null ?
            <button onClick={this.handlePayment}>
                {`Oплатить ${totalPrice}руб`}
            </button> :
            <div className={`${className}_paymentLink`}>Если вы не были автоматически перенаправлены на страницу оплаты, вы можете перейти по &nbsp;
                <a href = {`${this.state.link}`}>ссылке</a>
            </div>
    }
}