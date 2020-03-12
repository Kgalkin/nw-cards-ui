import {ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, UPDATE_COUNT} from './actions'

function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('cart')) || {};
}

function withLocalStorageSave(o) {
    localStorage.setItem('cart', JSON.stringify(o));
    return o;
}

const initState = getFromLocalStorage();

export default function cartItems(state = initState, action) {
    return withLocalStorageSave(cartItemsInner(state, action));
}

function cartItemsInner(state, action) {
    switch (action.type) {
        case ADD_TO_CART:
            let contain = state[action.payload.id];
            let count = action.payload.count + ((contain || 0) && contain.count);
            return {
                ...state,
                [action.payload.id]: {
                    title: action.payload.title,
                    count,
                    price: action.payload.price,
                    inStock: action.payload.inStock
                }
            };
        case UPDATE_COUNT:
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    count: action.payload.count,
                }
            };
        case REMOVE_FROM_CART:
            const newState = {...state};
            delete (newState[`${action.payload.id}`]);
            return newState;
        case CLEAR_CART:
            return {};
        default:
            return state;
    }
}