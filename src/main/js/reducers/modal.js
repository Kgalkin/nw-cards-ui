import {HIDE_MODAL, SHOW_MODAL, SHOW_ORDER_FORM} from "./actions"
import CartContent from "../components/cart/CartContent"
import OrderForm from "../components/orderform/OrderForm"
import React from 'react'

export default function modal(state = {content: <CartContent/>}, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                showModal: true
            };
        case HIDE_MODAL:
            return {
                ...state,
                content: <CartContent/>,
                showModal: false
            };
        case SHOW_ORDER_FORM:
            return {
                ...state,
                content: <OrderForm/>
            };
        default:
            return state;
    }
}