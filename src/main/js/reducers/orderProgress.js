import {CREATE_ORDER} from "./actions";

export default function orderProgress(state = {}, action) {
    switch (action.type) {
        case CREATE_ORDER:
            return {
                ...state,
                orderProgress: 'send'
            };

        default: return state;

    }
}