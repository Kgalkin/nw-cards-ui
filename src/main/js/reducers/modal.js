import {HIDE_MODAL, SHOW_MODAL} from "./actions"
import React from 'react'

export const CART_MODAL = "CART_MODAL";
export const ORDER_FORM_MODAL = "ORDER_FORM_MODAL";
export const CREATE_ITEM_MODAL = "CREATE_ITEM_MODAL";

export default function modal(state = {}, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                modalType: action.payload.modalType,
                showModal: true
            };
        case HIDE_MODAL:
            return {
                ...state,
                showModal: false
            };
        default:
            return state;
    }
}