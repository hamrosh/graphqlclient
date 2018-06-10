import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { USER_EXISTS } from './gql';
import { Formik, Form, Field } from 'formik';
const Yup = require('yup');

// Validation Schema

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Required!'),
  emailid: Yup.string()
    .email('Please Enter a Valid Email Address')
    .required('Required!')
});

class UserLogin extends Component {
  render() {
    return (
      <div class="row">
        <div class="col-md-3">
          <h1>detet</h1>
        </div>
        <div class="col-md-9">
          <ApolloConsumer>
            {client => (
              <Formik
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                  actions.setSubmitting(true);
                  client
                    .query({
                      query: USER_EXISTS,
                      variables: {
                        emailid: values.emailid,
                        password: values.password
                      }
                    })
                    .then(({ data }) => {
                      console.log(data.UserExists.message);
                      actions.setSubmitting(false);
                    });
                }}
                render={({ errors, touched, isSubmitting, dirty, values }) => {
                  return (
                    <Form>
                      <div className="form-group">
                        <label htmlFor="emailid">Email Address</label>
                        <Field
                          type="text"
                          name="emailid"
                          placeholder="Email Address"
                          className={
                            errors.emailid && touched.emailid
                              ? 'text-input error'
                              : 'text-input'
                          }
                        />
                        {touched.emailid &&
                          errors.emailid && <div>{errors.emailid}</div>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Field
                          type="password"
                          name="password"
                          placeholder="Password"
                          className={
                            errors.password && touched.password
                              ? 'text-input error'
                              : 'text-input'
                          }
                        />
                        {touched.password &&
                          errors.password && <div>{errors.password}</div>}
                      </div>

                      <button
                        type="submit"
                        disabled={!dirty || isSubmitting}
                        className="btn btn-primary"
                      >
                        Login
                      </button>
                    </Form>
                  );
                }}
              />
            )}
          </ApolloConsumer>
        </div>
      </div>
    );
  }
}
export default UserLogin;
