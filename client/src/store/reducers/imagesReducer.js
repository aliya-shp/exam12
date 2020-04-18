import {FETCH_IMAGES_SUCCESS} from "../actions/imagesActions";

const initialState = {
  images: [],
};
const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_IMAGES_SUCCESS:
      return {...state, images: action.images};
    default:
      return state;
  }
};

export default imagesReducer;