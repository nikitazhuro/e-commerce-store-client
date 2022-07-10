import { SET_ACTIVE_CATEGORY, SET_CATEGORYLIST } from './category-actions';

const initialState = {
  categoryList: [],
  activeCategory: '',
};

export default function categoryReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_ACTIVE_CATEGORY:
      return { ...state, activeCategory: action.payload };
    case SET_CATEGORYLIST:
      return { ...state, categoryList: [...action.payload] };
    default:
      return { ...state };
  }
}
