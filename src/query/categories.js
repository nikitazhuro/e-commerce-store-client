import { gql } from '@apollo/client';

const getCategoryList = gql`
  query {
    categories {
      name
    }
  }
`;

export default getCategoryList;
