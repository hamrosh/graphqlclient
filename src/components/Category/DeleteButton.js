import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { DELETE_CATEGORY } from './gql/Mutations';

class DeleteButton extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_CATEGORY}
        errorPolicy="all"
        onError={e => console.log(e.message)}
        onCompleted={data => console.log(data)}
        refetchQueries={['AllCategories']}
      >
        {(delCategory, { data, loading, error }) => {
          return (
            <div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  delCategory({
                    variables: {
                      id: this.props.categoryid
                    }
                  });
                  this.props.deleted();
                }}
              >
                Delete
              </button>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
export default DeleteButton;
