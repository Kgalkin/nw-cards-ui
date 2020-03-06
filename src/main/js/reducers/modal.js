import {HIDE_MODAL, SHOW_MODAL} from "./actions";

export default function modal(state = {}, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                showModal: true
            };
        case HIDE_MODAL:
            return {
                ...state,
                showModal: false
            };
        default:
            return state;
    }
}