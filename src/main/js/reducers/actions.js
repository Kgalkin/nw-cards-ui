export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_COUNT = 'UPDATE_COUNT';
export const UPDATE_INSTOCK = 'UPDATE_INSTOCK';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';

export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const SHOW_CART_FORM = 'SHOW_CART_FORM';
export const SHOW_ORDER_FORM = 'SHOW_ORDER_FORM';
export const ADD_ITEMS = 'ADD_ITEMS';
export const SET_ITEMS_LOADING = 'SET_ITEMS_LOADING';
export const UPDATE_ITEM = 'UPDATE_ITEM';

export const CLEAR_ITEMS = 'CLEAR_ITEMS';
export const UPDATE_TAGS = 'UPDATE_TAGS';
export const ADD_ACTIVE_TAGS = 'ADD_ACTIVE_TAGS';


export const LOADING = 'Loading';

export const addToCart = payload => ({type: ADD_TO_CART, payload});
export const updateInStock = payload => ({type: UPDATE_INSTOCK, payload});
export const removeFromCart = id => ({type: REMOVE_FROM_CART, payload: {id}});
export const updateCount = payload => ({type: UPDATE_COUNT, payload});
export const clearCart = () => ({type: CLEAR_CART});

export const addItems = payload => ({type: ADD_ITEMS, payload});
export const clearItems = () => ({type: CLEAR_ITEMS})
export const setItemsLoading = () => ({type: SET_ITEMS_LOADING})
export const updateItem = (payload) => ({type: UPDATE_ITEM, payload})

export const updateTags = payload => ({type: UPDATE_TAGS, payload});
export const addTags = payload => ({});
export const addActiveTags = payload => ({type:ADD_ACTIVE_TAGS, payload});

export const createOrder = () => ({type: CREATE_ORDER});
export const orderFailed = () => ({type: ORDER_FAILED});
export const orderSucceed = () => ({type: ORDER_SUCCEED});

export const showModal = (payload) => ({type: SHOW_MODAL, payload});
export const hideModal = () => ({type: HIDE_MODAL});
export const showOrderForm = () => ({type: SHOW_ORDER_FORM});

