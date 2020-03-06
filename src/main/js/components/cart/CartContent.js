import React, {Component} from 'react'
import {connect} from "react-redux";
import "./CartContent.scss"
import {clearCart, hideModal} from "../../reducers/actions";
import CartContentRow from "./CartContentRow";

class CartContent extends Component {
    constructor() {
        super();
        this.className = "сartContent";
    }

    render() {
        const {
            cartContent,
            clearCart,
            hideModal
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
            </div>
        </div>
    }
}

export default connect(state => ({cartContent: state.cartItems}), {clearCart, hideModal})(CartContent);
