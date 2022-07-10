import { gql } from '@apollo/client';

const getCurrencyList = gql`
  query {
    currencies {
      label, symbol
    }
  }
`;

export default getCurrencyList;
