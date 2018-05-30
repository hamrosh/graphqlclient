import React, { Component } from 'react';
// import for the mutation connection of react and graphql
import { Mutation } from 'react-apollo';
// import custom defined mutations
import { ADD_CATEGORY } from './gql/Mutations';
// import for the form handling api formik which helps us in creating forms in react in a simple way

import { Formik, Form, Field } from 'formik';
const Yup = require('yup');

class AddCategory extends Component {
  render() {
    return (
      <React.Fragment>
        {/* Declare Mutation Tag , pass the mutation as function and the mutation result */}
        <Mutation
          mutation={ADD_CATEGORY}
          errorPolicy="all"
          onError={e => console.log(e.message)}
          onCompleted={data => console.log(data)}
        >
          {(AddCategory, { data, loading, error }) => {
            console.log('Hello');
            return (
              <div class="container">
                <Formik
                  validationSchema={Yup.object().shape({
                    category: Yup.string()
                      .min(2, 'minimum 2 characters long')
                      .required('Required!')
                  })}
                  onSubmit={(values, actions) => {
                    actions.setSubmitting(true);
                    AddCategory({
                      variables: {
                        input: {
                          category: values.category,
                          createdby: values.createdby
                        }
                      }
                    });
                    actions.resetForm({});
                    actions.setSubmitting(false);
                  }}
                  initialValues={{
                    category: '',
                    createdby: ''
                  }}
                  render={({
                    errors,
                    touched,
                    isSubmitting,
                    dirty,
                    values
                  }) => (
                    <div className="container">
                      <div className="row">
                        <div className="col">
                          <Form>
                            <div className="form-group">
                              <label htmlFor="category">Category</label>
                              <Field
                                type="text"
                                name="category"
                                value={values.category || ''}
                                placeholder="Category"
                                className={
                                  errors.category && touched.category
                                    ? 'text-input error'
                                    : 'text-input'
                                }
                              />
                              {/* <small
                                id="emailHelp"
                                className="form-text text-muted"
                              >
                                Enter Cateory for the main App
                              </small> */}
                              {touched.category &&
                                errors.category && <div>{errors.category}</div>}
                            </div>

                            <div className="form-group">
                              <label htmlFor="createdby">Created By</label>
                              <Field
                                value={values.createdby || ''}
                                id="createdby"
                                type="text"
                                name="createdby"
                                placeholder="Created By"
                              />
                              {touched.createdby &&
                                errors.createdby && (
                                  <div>{errors.createdby}</div>
                                )}
                            </div>

                            <button
                              type="submit"
                              disabled={!dirty || isSubmitting}
                              className="btn btn-primary"
                            >
                              Submit
                            </button>
                          </Form>
                          <br />
                        </div>
                      </div>
                    </div>
                  )}
                />
                {data && (
                  <div class="alert alert-success" role="alert">
                    <p>Saved Category</p>
                  </div>
                )}
                {loading && (
                  <div class="alert alert-warning" role="alert">
                    <p>Saving Category</p>
                  </div>
                )}
                {error && (
                  <div class="alert alert-danger" role="alert">
                    <p> Error{error.message} :( Please try again</p>
                  </div>
                )}
              </div>
            );
          }}
        </Mutation>
      </React.Fragment>
    );
  }
}

export default AddCategory;
