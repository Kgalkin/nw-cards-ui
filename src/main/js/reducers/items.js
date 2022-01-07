import {ADD_ITEMS, CLEAR_ITEMS, LOADING, SET_ITEMS_LOADING} from "./actions";

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
        default:
            return state
    }
}