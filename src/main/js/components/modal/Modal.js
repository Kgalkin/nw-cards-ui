import React, {Component} from 'react';
import {connect} from "react-redux";
import './Modal.scss'
import {hideModal} from "../../reducers/actions";
import {
    ABOUT_US_MODAL,
    CART_MODAL,
    CREATE_ITEM_MODAL,
    CREATE_TAG_MODAL,
    DELIVERY_INFO_MODAL,
    ORDER_FORM_MODAL
} from "../../reducers/modal";
import CartContent from "../cart/CartContent";
import OrderForm from "../orderform/OrderForm";
import CreateItem from "../admin/createitem/CreateItem";
import AddTag from "../admin/addtag/AddTag";

class Modal extends Component {
    render() {
        const {
            modalType,
            showModal,
            hideModal
        } = this.props;
        const className = 'modal';
        return <div className={className} style={{display: showModal ? "block" : "none"}} onClick={e => {
            if (e.target.className === className) {
                hideModal();
            }
        }}>
            <div className={`${className}_window`}>
                {this.modalContent(modalType)}
            </div>
        </div>
    }

    modalContent = (modalType) => {
        switch (modalType) {
            case CART_MODAL:
                return <CartContent/>;
            case ORDER_FORM_MODAL:
                return <OrderForm/>;
            case CREATE_ITEM_MODAL:
                return <CreateItem/>;
            case DELIVERY_INFO_MODAL:
                return <div className={`textModal`}>
                    Доставка по РФ осуществляется Почтой России, отправка происходит в течение 3-5 дней после оплаты заказа.<br/><br/>
                    <strong>Способы доставки:</strong><br/><br/>

                    <strong>Простое письмо</strong> - без трекера отслеживания.<br/>
                    В заказе только открытки, до 15 штук.<br/>
                    При доставке простым письмом высылается пруф - фото упакованного заказа с адресом и марками.<br/>
                    Стоимость <strong>65</strong> рублей<br/><br/>

                    Магазин не несет ответственности за утерю простого письма Почтой России. Мы не занимаемся розыском таких писем.<br/><br/>

                    <strong>Заказная бандероль</strong> с трекером отслеживания<br/>
                    Стоимость <strong>105</strong> рублей<br/><br/>

                    Заказ от 2000 руб доставляется по РФ за счет магазина<br/><br/>

                    Доставка в другую страну:<br/>
                    Обсуждается индивидуально.
                </div>
            case ABOUT_US_MODAL:
                return <div className={`textModal`}>
                    О нас<br/>
                    Приветствуем вас в магазине North Wind Cards. Печатаем открытки с 2019 года. Делаем посткроссинг красивым и экономным хобби.<br/><br/>

                    Попутного ветра каждой открытке!<br/><br/><br/>


                    <strong>Контакты:</strong> Northwindcards@gmail.com<br/>
                    <strong>Вконтакте:</strong> <a target="_blank" href="https://vk.com/northwindcards">https://vk.com/northwindcards</a><br/>
                    <strong>Telegram:</strong> <a target="_blank" href="https://t.me/northwindcards_store">t.me/northwindcards_store</a><br/>
                    <storng>Now</storng> north_wind_cards<br/>
                </div>
            default:
                return null;

        }
    }
}

export default connect(state => {
    return ({
    showModal: state.modal.showModal,
    modalType: state.modal.modalType
})}, {hideModal})(Modal)