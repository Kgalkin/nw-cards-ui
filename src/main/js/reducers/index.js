import {combineReducers} from 'redux'
import cartItems from './cartItems'
import modal from './modal'

const rootReducer = combineReducers({
    cartItems,
    modal
});

export default rootReducer
