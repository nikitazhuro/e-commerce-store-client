import { SET_ITEMS_BY_CATEGORY } from './items-actions';

const initialState = {
  itemsByCategory: [],
};

const itemsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ITEMS_BY_CATEGORY:
      return { ...state, itemsByCategory: [...action.payload] };
    default:
      return { ...state };
  }
};

export default itemsReducer;
