import gql from 'graphql-tag';
// create the query from string as graphql query using gql tag import
export const GET_QUESTION_LIST = gql`
  {
    allCategories {
      id
      category
      createdby
    }
  }
`;
