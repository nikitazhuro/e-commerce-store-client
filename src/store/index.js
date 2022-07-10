import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import categoryReducer from './reducers/category-reducer/category-reducer';
import itemsReducer from './reducers/items-reducer/items-reducer';
import currencyReducer from './reducers/currency-reducer/currency-reducer';
import itemElemReducer from './reducers/itemElem-reducer/itemElem-reducer';
import basketReducer from './reducers/basket-reducer/basket-reducer';

const rootReducer = combineReducers({
  categoryReducer,
  currencyReducer,
  itemsReducer,
  itemElemReducer,
  basketReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
