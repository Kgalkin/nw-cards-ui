import {combineReducers, createStore} from 'redux'
import cartItems from './cartItems'
import modal from './modal'
import tags from "./tags";
import items from "./items";

const rootReducer = combineReducers({
    cartItems,
    modal,
    tags,
    items
});

const store = createStore(rootReducer);

export default store
