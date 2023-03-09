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
  IMAGE_PREVIEW,
  ORDER_FORM_MODAL,
  OZON_MODAL,
  USER_AGREEMENT_MODAL,
  VK_MODAL
} from "../../reducers/modal";
import CartContent from "../cart/CartContent";
import OrderForm from "../orderform/OrderForm";
import CreateItem from "../admin/createitem/CreateItem";
import {UserAgreement} from "./UserAgreement";
import {Contacts} from "./Contacts";
import ImagePreview from "./ImagePreview";

class Modal extends Component {
  render() {
    const {
      modalType,
      showModal,
      hideModal,
      data
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
        {this.modalContent(modalType, data)}
      </div>
    </div>
  }

  modalContent = (modalType, data) => {
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
          Сайт принимает платежи с карты любого банка, без комиссии.
          Мы зарегистрированы в системе Тинькофф, которая обеспечивает
          сохранность ваших платежных данных.<br/><br/>
          <strong>Способы доставки:</strong><br/><br/>

          <strong>Простое письмо</strong> - без трекера отслеживания.<br/>
          В заказе только открытки, до 15 штук.<br/>
          При доставке простым письмом высылается пруф - фото упакованного
          заказа с адресом и марками.<br/>
          Стоимость <strong>65</strong> рублей<br/><br/>

          Магазин не несет ответственности за утерю простого письма Почтой
          России. Мы не занимаемся розыском таких писем.<br/><br/>

          <strong>Заказная бандероль</strong> с трекером отслеживания<br/>
          Стоимость <strong>120</strong> рублей<br/><br/>

          Заказ от 2000 руб доставляется по РФ за счет магазина<br/><br/>

          Доставка в другую страну:<br/>
          Обсуждается индивидуально.
        </div>
      case ABOUT_US_MODAL:
        return <div className={`textModal`}>
          <strong>North Wind Cards – магазин товаров для посткроссинга (обмена
            открытками)</strong><br/><br/>
          Мы продаем авторские почтовые открытки для вашего хобби и
          творчества.<br/><br/>
          Поддерживаем широкий ассортимент и дополняем его каждые три месяца: в
          наличии всегда более ста сюжетов открыток на разные темы.<br/><br/>
          Печатаем их на российском ударопрочном картоне плотностью 310 грамм.
          Это означает, что открытка с меньшей вероятностью будет повреждена в
          почтовом ящике или по пути к адресату.<br/><br/>
          Оборот картона не мелован, поэтому на нем можно без опаски писать
          разными ручками, линерами и фломастерами, это очень удобно для
          любителей порисовать на оборотах.<br/><br/>
          Особенность наших открыток в специальном матовом покрытии сотф-тач.
          Оно плотное и бархатное на ощупь, всегда приятно удивляет адресатов и
          покупателей.<br/><br/>
          К нам приходят, чтобы обновить обменники, найти необычные открытки
          новых художников и получить в коллекцию традиционные популярные темы
          для удачных обменов.<br/><br/>
          Промокод <strong>NEWWIND</strong> подарит вам три открытки к первому
          заказу на сайте: просто напишите его в комментарии, и мы положим
          подарок в ваш заказ.<br/><br/>
          Ева Северный Ветер<br/><br/>

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
          <a target="_blank" href="https://vk.com/northwindcards">Мы в
            контакте</a>
          <br/>
          <br/>
          <a target="_blank"
             href="https://vk.com/topic-182017496_46570052">Отзывы</a>
        </div>
      case OZON_MODAL:
        return <div className={`textModal`}>
          Для экономии вашего времени и удобства доставки вы можете приобрести
          наборы наших открыток на &nbsp;
          <a target="_blank"
             href="https://www.ozon.ru/seller/north-wind-cards-830240/products/?miniapp=seller_830240">
            <strong>OZON</strong>
          </a>
        </div>
      case IMAGE_PREVIEW:
        return <ImagePreview links={[data.links.preview, data.links.short]}/>;
      default:
        return null;

    }
  }
}

export default connect(state => {
  return ({
    showModal: state.modal.showModal,
    modalType: state.modal.modalType,
    data: state.modal.data
  })
}, {hideModal})(Modal)