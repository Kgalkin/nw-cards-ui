import {HIDE_MODAL, SHOW_MODAL} from "./actions"
import React from 'react'

export const CART_MODAL = "CART_MODAL";
export const ORDER_FORM_MODAL = "ORDER_FORM_MODAL";
export const CREATE_ITEM_MODAL = "CREATE_ITEM_MODAL";
export const DELIVERY_INFO_MODAL = "DELIVERY_INFO_MODAL";
export const ABOUT_US_MODAL = "ABOUT_US_MODAL";
export const VK_MODAL = "VK_MODAL";
export const CONTACTS_MODAL = "CONTACTS_MODAL";
export const USER_AGREEMENT_MODAL = "USER_AGREEMENT_MODAL";
export const IMAGE_PREVIEW = "IMAGE_PREVIEW"

export default function modal(state = {}, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                modalType: action.payload.modalType,
                showModal: true,
                data: {
                    ...state.data,
                    ...action.payload.data
                }
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