export const SET_ACTIVE_ITEM_ID = 'SET_ACTIVE_ITEM_ID';
export const SET_ITEM_ELEM = 'SET_ITEM_ELEM';
export const SET_ACTIVE_IMG = 'SET_ACTIVE_IMG';

export const setActiveItemIdAction = (payload) => ({
  type: SET_ACTIVE_ITEM_ID,
  payload,
});
export const setItemElem = (payload) => ({
  type: SET_ITEM_ELEM,
  payload,
});
export const setActiveImgAction = (payload) => ({
  type: SET_ACTIVE_IMG,
  payload,
});
