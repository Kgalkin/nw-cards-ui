import React, {Component} from 'react'
import './OrderForm.scss'
import {connect} from "react-redux";
import {clearCart} from "../../reducers/actions";

class OrderForm extends Component {
    constructor() {
        super();
        this.validateForm = this.validateForm.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: localStorage.getItem('email') || '',
            address: localStorage.getItem('address') || '',
            index: localStorage.getItem('index') || '',
            validationActive: false,
        }
    }

    render() {
        const className = 'orderForm';
        const errorClass = 'error';
        return <div className={className}>
            <div className={`${className}_email`}>
                <label>Электронная почта</label>
                <div>
                    <input className={`${this.state.validationActive && !this.validateEmail() ? errorClass : ''}`}
                           placeholder={'Email'} value={this.state.email}
                           onChange={e => this.handleChange(e, 'email')}/>
                </div>
            </div>
            <div className={`${className}_address`}>
                <label>Адрес</label>
                <div>
                    <textarea className={`${this.state.validationActive && !this.state.address ? errorClass : ''}`}
                              placeholder={'Адрес'} value={this.state.address}
                              onChange={e => this.handleChange(e, 'address')}/>
                </div>
            </div>
            <div className={`${className}_index`}>
                <label>Индекс</label>
                <div>
                    <input className={`${this.state.validationActive && !this.state.index ? errorClass : ''}`}
                           placeholder={'Индекс'} value={this.state.index}
                           onChange={e => this.handleChange(e, 'index')}/>
                </div>
            </div>
            <button onClick={() => {
                if (this.validateForm()) this.createOrder(this.state.email, this.state.address, this.state.index, this.props.cartItems);
            }}>Оформить заказ
            </button>
        </div>;
    }

    handleChange(event, what) {
        localStorage.setItem(what, event.target.value);
        this.setState({[what]: event.target.value})
    }

    createOrder(email, address, index, cartItems, clearCart) {
        let order = {email, address, index, items: []};
        Object.entries(cartItems).forEach((v) => order.items.push({count: v[1].count, id: Number(v[0])}));
        fetch("http://localhost:8001/api/createOrder", {
            method: 'POST',
            body: JSON.stringify(order)
        })
            .then(response => {
                    clearCart();
                    window.location.reload();
                    response.text();
                },
                error => error)
            .then(text => {
                alert(text)
            });
    }

    validateForm() {
        this.setState({validationActive: true});
        return this.validateEmail() && this.state.address && this.state.index;
    }

    validateEmail() {
        return this.state.email.match('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])');
    }
}

export default connect(state => ({cartItems: state.cartItems}), {clearCart})(OrderForm)