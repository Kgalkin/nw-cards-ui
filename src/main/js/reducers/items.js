import {ADD_ITEMS, CLEAR_ITEMS, LOADING, SET_ITEMS_LOADING, UPDATE_ITEM} from "./actions";

export const DEFAULT_STATE = {items: [], nextOffset: 0};

export default function items(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case ADD_ITEMS:
            action.payload.items = [...state.items, ...action.payload.items]
            return action.payload;
        case CLEAR_ITEMS:
            return DEFAULT_STATE;
        case SET_ITEMS_LOADING:
            return {
                state: LOADING,
                ...state
            }
        case UPDATE_ITEM:
            let newItem = action.payload.item;
            return {
                items: state.items.map(i => i.id === newItem.id ? newItem : id),
                ...state
            }
        default:
            return state
    }
}