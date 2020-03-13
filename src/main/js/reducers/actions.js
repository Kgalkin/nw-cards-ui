export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_COUNT = 'UPDATE_COUNT';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';

export const CREATE_ORDER = "CREATE_ORDER";
export const ORDER_FAILED = "ORDER_FAILED";
export const ORDER_SUCCEED = "ORDER_SUCCEED";

export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const SHOW_CART_FORM = 'SHOW_CART_FORM';
export const SHOW_ORDER_FORM = 'SHOW_ORDER_FORM';


export const addToCart = payload => ({type: ADD_TO_CART, payload});
export const removeFromCart = id => ({type: REMOVE_FROM_CART, payload: {id}});
export const updateCount = payload => ({type: UPDATE_COUNT, payload});
export const clearCart = () => ({type: CLEAR_CART});

export const showModal = () => ({type: SHOW_MODAL});
export const hideModal = () => ({type: HIDE_MODAL});
export const showOrderForm = () => ({type: SHOW_ORDER_FORM});
