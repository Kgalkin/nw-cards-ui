export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';


export const addToCart = payload => ({type: ADD_TO_CART, payload});
export const clearCart = () =>({type: CLEAR_CART});

export const showModal = () => ({type: SHOW_MODAL});
export const hideModal = () => ({type: HIDE_MODAL});
