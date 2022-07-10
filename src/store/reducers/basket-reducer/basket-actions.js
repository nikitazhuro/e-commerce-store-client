export const SET_BASKET_ITEM = 'SET_BASKET_ITEM';
export const SET_BASKET_ITEM_INCREMENT = 'SET_BASKET_ITEM_INCREMENT';
export const SET_BASKET_ITEM_DICREMENT = 'SET_BASKET_ITEM_DICREMENT';

export const setBasketItemAction = (payload) => ({
  type: SET_BASKET_ITEM,
  payload,
});
export const setBasketItemIncrementAction = (payload) => ({
  type: SET_BASKET_ITEM_INCREMENT,
  payload,
});
export const setBasketItemDicrementAction = (payload) => ({
  type: SET_BASKET_ITEM_DICREMENT,
  payload,
});
