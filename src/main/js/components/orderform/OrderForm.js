import React, {Component} from 'react'
import './OrderForm.scss'
import {connect} from "react-redux";
import {clearCart} from "../../reducers/actions";
import {HOST_AND_PORT, loadDeliveryOptions} from "../../utils/apiUtils";

const className = 'orderForm';
const errorClass = 'error';

class OrderForm extends Component {
    constructor() {
        super();
        this.newOrder = this.newOrder.bind(this);
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
            loading: false,
            deliveryOptions: null
            //contactOption: null
        }
    }

    componentDidMount() {
        loadDeliveryOptions()
            .then(r => this.setState({deliveryOptions: r}))
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
                            onChange={e => this.setState({country: e.target.value, deliveryOption: null})}>
                        <option value='' style={{display: 'none'}}/>
                        <option value="RU">Россия</option>
                        <option value="OTHER">Другая</option>
                    </select>
                </div>
                {this.handleCountry()}
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
                    {this.state.deliveryOptions.filter(o => o.price > 0)
                        .map(o => this.radioInput(`${o.description} - ${o.price} руб.`, o.id))}
                </>;
            case 'OTHER':
                return <div className={`${className}_deliveryChoice`}>
                    {this.state.deliveryOptions.filter(o => o.price < 0)
                        .map(o => this.radioInput(`${o.description}`, o.id))}
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

    newOrder() {
        const {
            name, email, address, index, deliveryOption
        } = this.state;
        let order = {data: {name, email, address, index, deliveryOption: {id: Number(deliveryOption)}, items: []}};
        Object.entries(this.props.cartItems).forEach((v) => order.data.items.push({
            count: v[1].count,
            id: Number(v[0])
        }));
        this.setState({loading: true});
        fetch(`${HOST_AND_PORT}/api/orders`, {
            method: 'POST',
            body: JSON.stringify(order)
        })
            .then(response => {
                    this.setState({loading: false});
                    if (response.status === 201) {
                        this.props.clearCart();
                        return response.json();
                    } else {
                        alert("Чтото пошло не так при создании заказа. Пожалуйста попробуйте позже.")
                    }
                },
                error => {
                    this.setState({loading: false});
                    alert("Чтото пошло не так при создании заказа. Пожалуйста попробуйте позже.")
                })
            .then(json => window.location.replace(`/orders/${json.uuid}`))
    }

    validateForm() {
        this.setState({validationActive: true});
        return this.state.name &&
            this.validateEmail() &&
            this.state.address &&
            this.state.index &&
            this.state.country &&
            this.state.deliveryOption;
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