import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
  UPDATE_COUNT,
  UPDATE_INSTOCK
} from './actions'

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
      let count = action.payload.count + (contain?.count || 0);
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          count
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
    case UPDATE_INSTOCK:
      let copy = {...state};
      Object.entries(state).forEach(store => {
        let found = action.payload.find(it => {
            return it.id === Number(store[0])
        });
        if (found) {
          copy[found.id].price = found.price;
          copy[found.id].inStock = found.inStock;
        } else {
          delete copy[store[0]];
        }
      })
      return copy;
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