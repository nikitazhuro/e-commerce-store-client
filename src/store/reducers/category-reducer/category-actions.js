export const SET_ACTIVE_CATEGORY = 'SET_ACTIVE_CATEGORY';
export const SET_CATEGORYLIST = 'SET_CATEGORYLIST';

export const setActiveCategoryAction = (payload) => ({
  type: SET_ACTIVE_CATEGORY,
  payload,
});
export const setCategoryListAction = (payload) => ({
  type: SET_CATEGORYLIST,
  payload,
});
