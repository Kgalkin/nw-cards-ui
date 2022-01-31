import {ADD_ACTIVE_TAGS, UPDATE_TAGS} from "./actions";

export default function tags(state = {state: null, values: []}, action) {
    switch (action.type) {
        case UPDATE_TAGS:
           /* console.group("reducers.tags UPDATE_TAGS")
            console.log(action)
            console.groupEnd()*/
            return {
                ...state,
                ...action.payload
            };
        case ADD_ACTIVE_TAGS: {
            return {
                ...state,
                activeTags: [...action.payload.activeTags, ...state.activeTags || []]
            }

        }
        default:
            return state;
    }

}