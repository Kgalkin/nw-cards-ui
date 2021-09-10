import {UPDATE_TAGS} from "./actions";

export default function tags(state = {state:null, values: []}, action) {
    switch (action.type) {
        case UPDATE_TAGS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }

}