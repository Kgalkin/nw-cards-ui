import React, {Component} from 'react'
import {connect} from "react-redux";
import "./CartContent.scss"
import {clearCart, hideModal, showModal} from "../../reducers/actions";
import CartContentRow from "./CartContentRow";
import {isEmptyObj} from "../../utils/utils";
import {ORDER_FORM_MODAL} from "../../reducers/modal";

class CartContent extends Component {
    constructor(props) {
        super(props);
        this.className = "сartContent";
    }

    render() {
        const {
            cartContent,
            clearCart,
            hideModal,
            showModal
        } = this.props;
        const content = [];
        const createItem = item => {
            return {
                id: item[0],
                title: item[1].title,
                count: item[1].count,
                price: item[1].price
            };
        };
        if (isEmptyObj(cartContent))
            hideModal();
        let totalPrice = 0;
        content.push(<CartContentRow key={content.length}
                                     item={{
                                         id: null,
                                         title: "Название",
                                         count: "Количество",
                                         price: "Цена, руб",
                                         total: "Итого, руб"
                                     }}/>);
        Object.entries(cartContent || {}).forEach((item, i) => {
            content.push(<CartContentRow key={content.length} item={createItem(item)}/>);
            totalPrice += item[1].count * item[1].price;
        });
        content.push(<CartContentRow key={content.length}
                                     item={{id: null, title: "", count: "", price: "", total: totalPrice}}/>);
        return <div className={this.className}>
            <div className={`${this.className}_grid`}>{content}</div>
            <div className={`${this.className}_buttonContainer`}>
                <button onClick={() => {
                    clearCart();
                    hideModal();
                }}>Очистить корзину
                </button>
                <button onClick={() => showModal({modalType: ORDER_FORM_MODAL})}>Перейти к оформлению</button>
            </div>
        </div>
    }
}

export default connect(state => ({cartContent: state.cartItems}), {clearCart, hideModal, showModal})(CartContent);
