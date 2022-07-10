import { gql } from '@apollo/client';

export const getItemById = gql`
query GET_ITEM_BY_ID ($id: String!){
  product(id: $id) {
    id, name,gallery, inStock, description, attributes {
      name, items {
        value
      }
    },prices {
        amount, currency {
          symbol
        }
      }, brand
  }
}
`;

export const getItemListByCategory = gql`
query getItemListByCategory ($id: String!){
  category(input: {title: $id}) {
    products {
      id, name, brand, inStock, gallery, category, attributes {
        name, items {
          value
        }
      }, prices {
          currency {
            symbol, label
          },
          amount,
        }
    }
  }
}
`;
