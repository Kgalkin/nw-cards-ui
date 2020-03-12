import React, {Component} from 'react'
import './OrderForm.scss'

export default class OrderForm extends Component {
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
        </div>;
    }
}