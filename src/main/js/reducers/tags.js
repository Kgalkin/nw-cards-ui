import {ADD_ACTIVE_TAGS, UPDATE_TAGS} from "./actions";

export default function tags(state = {state: null, values: []}, action) {
  switch (action.type) {
    case UPDATE_TAGS:
      let activeTags = [];
      if (state.values?.length === 0) {
        activeTags = action.payload?.values
        ?.filter(t => "postcard" === t.data?.speciality)
        .map(t => t.id);
      }
      return {
        ...state,
        ...action.payload,
        activeTags
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