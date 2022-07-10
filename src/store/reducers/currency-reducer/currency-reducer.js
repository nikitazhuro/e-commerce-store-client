import { SET_CURRENCY, SET_CURRENCYLIST } from './currency-actions';

const initialState = {
  currencyList: [],
  activeCurrency: '',
};

const currencyReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENCY:
      return { ...state, activeCurrency: action.payload };
    case SET_CURRENCYLIST:
      return { ...state, currencyList: [...action.payload] };
    default:
      return { ...state };
  }
};

export default currencyReducer;
