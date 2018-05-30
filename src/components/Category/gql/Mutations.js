import gql from 'graphql-tag';
export const ADD_CATEGORY = gql`
  mutation addCategory($input: CategoryInput) {
    addCategory(input: $input) {
      id
      category
    }
  }
`;
