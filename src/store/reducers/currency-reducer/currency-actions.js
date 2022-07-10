export const SET_CURRENCY = 'SET_CURRENCY';
export const SET_CURRENCYLIST = 'SET_CURRENCYLIST';

export const setActiveCurrencyAction = (payload) => ({
  type: SET_CURRENCY,
  payload,
});
export const setCurrencyListAction = (payload) => ({
  type: SET_CURRENCYLIST,
  payload,
});
