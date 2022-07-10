import {
  SET_ACTIVE_IMG,
  SET_ACTIVE_ITEM_ID,
  SET_ITEM_ELEM,
} from './itemElem-actions';

const initialState = {
  activeItemId: '',
  activeImg: '',
  itemElem: {},
};

const itemElemReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ACTIVE_ITEM_ID:
      return { ...state, activeItemId: action.payload };
    case SET_ITEM_ELEM:
      return { ...state, itemElem: { ...action.payload } };
    case SET_ACTIVE_IMG: {
      return { ...state, activeImg: action.payload };
    }
    default:
      return { ...state };
  }
};

export default itemElemReducer;
