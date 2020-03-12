import {HIDE_MODAL, SHOW_MODAL, SHOW_ORDER_FORM} from "./actions"
import CartContent from "../components/cart/CartContent"
import OrderForm from "../components/orderform/OrderForm"
import React from 'react'
const cartContent = <CartContent/>;
const orderForm = <OrderForm/>;
export default function modal(state = {content: cartContent}, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                showModal: true
            };
        case HIDE_MODAL:
            return {
                ...state,
                content: cartContent,
                showModal: false
            };
        case SHOW_ORDER_FORM:
            return {
                ...state,
                content: orderForm
            };
        default:
            return state;
    }
}