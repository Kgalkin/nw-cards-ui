import React, {Component} from 'react'
import './OrderForm.scss'
import {connect} from "react-redux";

class OrderForm extends Component {
    render() {
        const className = 'orderForm';
        return <div className={className}>
            <div className={`${className}_email`}>
                <label>Электронная почта</label>
                <div>
                    <input placeholder={'Email'}/>
                </div>
            </div>
            <div className={`${className}_address`}>
                <label>Адрес</label>
                <div>
                    <textarea placeholder={'Адрес'}/>
                </div>
            </div>
            <div className={`${className}_index`}>
                <label>Индекс</label>
                <div>
                    <input placeholder={'Индекс'}/>
                </div>
            </div>
            <button onClick={this.createOrder}>Оформить заказ</button>
        </div>;
    }

    createOrder(email, address, index) {
        let order = {email, address, index, items: []};
        Object.entries(cartContent).forEach((v) => order.items.push({count: v[1].count, id: Number(v[0])}))
        fetch("http://localhost:8001/api/createOrder", {
            method: 'POST',
            body: JSON.stringify(order)
        })
            .then(response => response.text(), error => error.text())
            .then(text => {
                window.location.reload();
                alert(text)
            });
    }
}

export default connect(state => ({cartItems: state.cartItems}), null)(OrderForm)