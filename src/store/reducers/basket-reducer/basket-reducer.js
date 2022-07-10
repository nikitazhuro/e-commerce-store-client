import attributesCompare from '../../../ulits/AttributesCompare';
import {
  SET_BASKET_ITEM,
  SET_BASKET_ITEM_INCREMENT,
  SET_BASKET_ITEM_DICREMENT,
} from './basket-actions';

const initialState = {
  basketItems: [],
  basketItemCollection: {},
};

export default function basketReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_BASKET_ITEM:
      if (action.payload.id in state.basketItemCollection) {
        if (state.basketItemCollection[action.payload.id]
          .filter((e) => attributesCompare(e.attributes, action.payload.activeAttributes)).length) {
          return {
            ...state,
            basketItemCollection: {
              ...state.basketItemCollection,
              [action.payload.id]: [...state.basketItemCollection[action.payload.id]]
                .map((e) => (attributesCompare(e.attributes, action.payload.activeAttributes)
                  ? { ...e, counte: e.counte + 1 }
                  : e)),
            },
          };
        }
        return {
          ...state,
          basketItems: [
            ...state.basketItems,
            action.payload,
          ],
          basketItemCollection: {
            ...state.basketItemCollection,
            [action.payload.id]: [
              ...state.basketItemCollection[action.payload.id],
              { counte: 1, attributes: action.payload.activeAttributes },
            ],
          },
        };
      }
      return {
        ...state,
        basketItems: [
          ...state.basketItems,
          action.payload,
        ],
        basketItemCollection: {
          ...state.basketItemCollection,
          [action.payload.id]: [{ counte: 1, attributes: action.payload.activeAttributes }],
        },
      };
    case SET_BASKET_ITEM_INCREMENT:
      return {
        ...state,
        basketItemCollection: {
          ...state.basketItemCollection,
          [action.payload.id]: [...state.basketItemCollection[action.payload.id]]
            .map((e) => (
              attributesCompare(e.attributes, action.payload.activeAttributes)
                ? { ...e, counte: e.counte + 1 }
                : e)),
        },
      };
    case SET_BASKET_ITEM_DICREMENT:
      if (state.basketItemCollection[action.payload.id]
        .find((e) => attributesCompare(e.attributes, action.payload.activeAttributes))
        .counte === 1) {
        return {
          ...state,
          basketItemCollection: {
            ...state.basketItemCollection,
            [action.payload.id]: [...state.basketItemCollection[action.payload.id]]
              .filter((e) => !attributesCompare(e.attributes, action.payload.activeAttributes)),
          },
          basketItems: [...state.basketItems
            .filter(
              (e) => !attributesCompare(e.activeAttributes, action.payload.activeAttributes),
            )],
        };
      }
      return {
        ...state,
        basketItemCollection: {
          ...state.basketItemCollection,
          [action.payload.id]: [...state.basketItemCollection[action.payload.id]]
            .map((e) => (attributesCompare(e.attributes, action.payload.activeAttributes)
              ? { ...e, counte: e.counte - 1 }
              : e)),
        },
      };
    default:
      return { ...state };
  }
}
