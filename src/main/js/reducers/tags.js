import {ADD_ACTIVE_TAGS, UPDATE_TAGS} from "./actions";

export default function tags(state = {state: null, values: [], activeTags:[1]}, action) {
  switch (action.type) {
    case UPDATE_TAGS:
      return {
        ...state,
        ...action.payload
      };
    case ADD_ACTIVE_TAGS: {
      return {
        ...state,
        activeTags: [...action.payload.activeTags || []],
        method: action.payload.tagsMethod
      }

    }
    default:
      return state;
  }

}