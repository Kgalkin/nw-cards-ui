import React, {Component} from 'react'
import './OrderForm.scss'
import {connect} from "react-redux";
import {clearCart} from "../../reducers/actions";

const simplePrice = 50;
const orderedPrice = 80;
const firstClassPrice = 120;
const className = 'orderForm';
const errorClass = 'error';

class OrderForm extends Component {
    constructor() {
        super();
        this.validateForm = this.validateForm.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDeliveryOptionSelect = this.handleDeliveryOptionSelect.bind(this);
        this.state = {
            name: localStorage.getItem('name') || '',
            email: localStorage.getItem('email') || '',
            address: localStorage.getItem('address') || '',
            index: localStorage.getItem('index') || '',
            validationActive: false,
            country: '',
            deliveryOption: null,
            loading: false
            //contactOption: null
        }
    }

    render() {
        return <div className={className}>
            <div className={`${className}_info`}>
                <span className={`${className}_infoHeader`}>Информация по заказу</span>
                <div className={`${className}_name`}>
                    <label>Фамилия Имя Отчество</label>
                    <div>
                        <input className={`${this.state.validationActive && !this.state.name ? errorClass : ''}`}
                               placeholder={'ФИО'} value={this.state.name}
                               onChange={e => this.handleChange(e, 'name')}/>
                    </div>
                </div>
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

            </div>
            <div className={`${className}_delivery`}>
                <span className={`${className}_deliveryHeader`}>Доставка</span>
                <div className={`${className}_deliverySelectCountry`}>
                    <label>Укажите страну: </label>
                    <select className={`${this.state.validationActive && !this.state.country ? errorClass : ''}`}
                            value={this.state.country}
                            onChange={e => this.setState({country: e.target.value})}>
                        <option value='' style={{display: 'none'}}/>
                        <option value="RU">Россия</option>
                        <option value="OTHER">Другая</option>
                    </select>
                </div>
                {this.handleCountry(className, errorClass)}
            </div>
            <button disabled={this.state.loading} onClick={() => {
                if (this.validateForm())
                    this.newOrder(this.state.email, this.state.address, this.state.index, this.props.cartItems);
            }}>Оформить заказ
            </button>
        </div>;
    }

    handleCountry() {
        switch (this.state.country) {
            case 'RU':
                return <>
                    {this.radioInput(`Простое письмо без трекера по РФ, до 10 открыток - ${simplePrice}₽`, simplePrice)}
                    {this.radioInput(`Заказная бандероль по РФ - ${orderedPrice}₽`, orderedPrice)}
                    {this.radioInput(`Заказная бандероль по РФ 1класс ${firstClassPrice}₽`, firstClassPrice)}
                </>;
            case 'OTHER':
                return <div className={`${className}_deliveryChoice`}>
                    Доставка за границу рассчитывается индивидуально. Итоговая стоимость доставки будет отправлена вам на почту вместе с реквизитами.
                 {/*   <div>
                        <textarea placeholder="Предпочтительный способ связи для уточнения стоимости доставки"/>
                    </div>*/}
                </div>;
            default :
                return null

        }
    }

    radioInput(label, value) {
        return <div className={`${className}_deliveryChoice`}>
            <label
                className={`${this.state.validationActive && !this.state.deliveryOption ? errorClass : ''}`}>
                <input type="radio" name="delivery" value={value}
                       checked={Number(this.state.deliveryOption) === value}
                       onChange={this.handleDeliveryOptionSelect}/>{label}
            </label>
        </div>
    }

    handleChange(event, what) {
        localStorage.setItem(what, event.target.value);
        this.setState({[what]: event.target.value})
    }

    newOrder(email, address, index, cartItems, clearCart) {
        let order = {email, address, index, items: []};
        Object.entries(cartItems).forEach((v) => order.items.push({count: v[1].count, id: Number(v[0])}));
        this.setState({loading: true});
        fetch("http://localhost:8001/api/createOrder", {
            method: 'POST',
            body: JSON.stringify(order)
        })
            .then(response => {
                    clearCart();
                    window.location.reload();
                    response.text();
                },
                error => {
                    this.setState({loading: false});
                    return error;
                })
            .then(text => {
                alert(text)
            });
    }

    validateForm() {
        this.setState({validationActive: true});
        return this.state.name &&
            this.validateEmail() &&
            this.state.address &&
            this.state.index &&
            this.state.country &&
            (this.state.deliveryOption ||this.state.country === 'OTHER');
    }

    handleDeliveryOptionSelect(e) {
        if (e.target.checked) {
            this.setState({deliveryOption: e.target.value})
        }
    }

    validateEmail() {
        return this.state.email.match('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])');
    }
}

export default connect(state => ({cartItems: state.cartItems}), {clearCart})(OrderForm)