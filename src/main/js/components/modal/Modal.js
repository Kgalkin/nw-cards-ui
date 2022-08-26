import React, {Component} from 'react';
import {connect} from "react-redux";
import './Modal.scss'
import {hideModal} from "../../reducers/actions";
import {
  ABOUT_US_MODAL,
  CART_MODAL,
  CONTACTS_MODAL,
  CREATE_ITEM_MODAL,
  DELIVERY_INFO_MODAL,
  ORDER_FORM_MODAL,
  USER_AGREEMENT_MODAL,
  VK_MODAL
} from "../../reducers/modal";
import CartContent from "../cart/CartContent";
import OrderForm from "../orderform/OrderForm";
import CreateItem from "../admin/createitem/CreateItem";
import {UserAgreement} from "./UserAgreement";
import {Contacts} from "./Contacts";

class Modal extends Component {
  render() {
    const {
      modalType,
      showModal,
      hideModal
    } = this.props;
    const className = 'modal';
    return <div className={className}
                style={{display: showModal ? "block" : "none"}} onClick={e => {
      if (e.target.className === className || e.target.className
          === `${className}_close_button`) {
        hideModal();
      }
    }}>
      <div className={`${className}_window`}>
        <div className={`${className}_close`}>
          <div className={`${className}_close_button`}>Закрыть</div>
        </div>
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
          Доставка по РФ осуществляется Почтой России, отправка происходит в
          течение 3-5 дней после оплаты заказа.<br/><br/>
          <strong>Способы доставки:</strong><br/><br/>

          <strong>Простое письмо</strong> - без трекера отслеживания.<br/>
          В заказе только открытки, до 15 штук.<br/>
          При доставке простым письмом высылается пруф - фото упакованного
          заказа с адресом и марками.<br/>
          Стоимость <strong>65</strong> рублей<br/><br/>

          Магазин не несет ответственности за утерю простого письма Почтой
          России. Мы не занимаемся розыском таких писем.<br/><br/>

          <strong>Заказная бандероль</strong> с трекером отслеживания<br/>
          Стоимость <strong>110</strong> рублей<br/><br/>

          Заказ от 2000 руб доставляется по РФ за счет магазина<br/><br/>

          Доставка в другую страну:<br/>
          Обсуждается индивидуально.
        </div>
      case ABOUT_US_MODAL:
        return <div className={`textModal`}>
          Приветствуем в магазине почтовых открыток North Wind Cards - создаем
          открытки с 2019 года.<br/><br/>
          В магазине десятки сюжетов, напечатанных на плотном картоне с приятным
          покрытием софт-тач.<br/><br/>
          Эти открытки снабжены оборотом для написания адреса и вашего послания,
          а еще их можно вложить в подарок или вставить в рамку.<br/><br/>
          Магия бумажной переписки никогда не устаревает. Если вы никогда или
          уже сто лет как не отправляли ни одной открытки – наш магазин к вашим
          услугам, можно начать прямо сейчас!<br/><br/>
          Если вы опытный посткроссер, то для вас в магазине есть не только
          открытки, но и марки, конверты и наклейки для оформления.<br/><br/>

          <strong>Контакты:</strong> Northwindcards@gmail.com<br/>
          <strong>Вконтакте:</strong> <a target="_blank"
                                         href="https://vk.com/northwindcards">https://vk.com/northwindcards</a><br/>
          <strong>Telegram:</strong> <a target="_blank"
                                        href="https://t.me/northwindcards_store">t.me/northwindcards_store</a><br/>
        </div>
      case USER_AGREEMENT_MODAL:
        return <UserAgreement/>
      case CONTACTS_MODAL:
        return <Contacts/>;
      case VK_MODAL:
        return <div className={`textModal`}>
          <a target="_blank" href="https://vk.com/northwindcards">Мы в контакте</a>
          <br/>
          <br/>
          <a target="_blank" href="https://vk.com/northwindcards">Отзывы</a>
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
  })
}, {hideModal})(Modal)