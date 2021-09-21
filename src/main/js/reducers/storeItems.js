import {LOAD_STORE_ITEMS} from "./actions";

export default function storeItems(state = {state: null, items: []}, action) {
    switch (action.type) {
        case LOAD_STORE_ITEMS:
            console.log();
            return {
                ...state,
                state: action.payload.state,
                items: state.items.concat(action.payload.items || [])
            };
        default: {
            return state;
        }

    }
}