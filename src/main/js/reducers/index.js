import {combineReducers, createStore} from 'redux'
import cartItems from './cartItems'
import modal from './modal'
import tags from "./tags";

const rootReducer = combineReducers({
    cartItems,
    modal,
    tags
});

const store = createStore(rootReducer);

export default store
