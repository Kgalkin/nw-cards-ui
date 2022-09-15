import React, {Component} from 'react'
import {connect} from "react-redux";
import "./CartContent.scss"
import {clearCart, hideModal, showModal} from "../../reducers/actions";
import CartContentRow from "./CartContentRow";
import {isEmptyObj} from "../../utils/utils";
import {ORDER_FORM_MODAL} from "../../reducers/modal";
import {requestInStockUpdate} from "./CartUtils";

const createItem = item => {
  return {
    id: item[0],
    ...item[1]
  };
};

class CartContent extends Component {
  constructor(props) {
    super(props);
    this.className = "сartContent";
  }

  componentDidMount() {
    requestInStockUpdate(Object.keys(this.props.cartContent));
  }

  render() {
    const {
      cartContent,
      clearCart,
      hideModal,
      showModal
    } = this.props;
    const content = [];
    if (isEmptyObj(cartContent)) {
      hideModal();
    }
    let totalPrice = 0;
    content.push(<CartContentRow key={content.length}
                                 item={{
                                   id: null,
                                   data: {
                                     title: "Название"
                                   },
                                   count: "Количество",
                                   price: "Цена, руб",
                                   total: "Итого, руб"
                                 }}/>);
    Object.entries(cartContent || {}).forEach((item, i) => {
      content.push(<CartContentRow key={content.length}
                                   item={createItem(item)}/>);
      totalPrice += item[1].count * item[1].price;
    });
    content.push(<CartContentRow key={content.length}
                                 item={{
                                   id: null,
                                   title: "",
                                   count: "",
                                   price: "",
                                   total: totalPrice
                                 }}/>);
    const noStamps = this.canNotByStampsMessage();
    return <div className={this.className}>
      <div className={`${this.className}_grid`}>{content}</div>
      {noStamps}
      <div className={`${this.className}_buttonContainer`}>
        <button onClick={() => {
          clearCart();
          hideModal();
        }}>Очистить корзину
        </button>
        <button disabled={noStamps || cartContent && Object.entries(cartContent)
        .some(it => it[1].count > it[1].inStock)}
                onClick={() => {
                  requestInStockUpdate(Object.keys(cartContent))
                  .then(it => {
                    if (!Object.entries(cartContent)
                    .some(it => it[1].count > it[1].inStock)) {
                      showModal({modalType: ORDER_FORM_MODAL});
                    }
                  });
                }}>Перейти к оформлению
        </button>
      </div>
    </div>
  }

  canNotByStampsMessage = () => {
    const contentArray = Object.values(this.props.cartContent || {});
    const stampsTag = 36; //todo REPLACE !!!!!
    const priceForStamps = 500;
    if (contentArray.some(it => it.tags.includes(stampsTag))) {
      const currentPrice = contentArray
      .filter(it => !it.tags.includes(stampsTag))
      .map(it => it.count * it.price)
      .reduce((a, b) => a + b);
      if (currentPrice < priceForStamps) {
        return <div className={`${this.className}_stampsError`}>Заказ марок
          возможен только при сумме заказа других товаров от&nbsp;
          <strong>{`${priceForStamps}р`}</strong>, для
          оформления заказа добавьте товаров (не марок) на сумму&nbsp;
          <strong>{`${priceForStamps - currentPrice}р`}</strong>
          &nbsp;или уберите марки из заказа
        </div>
      }
    }
    return null;
  }
}

export default connect(state => ({cartContent: state.cartItems}),
    {clearCart, hideModal, showModal})(CartContent);
