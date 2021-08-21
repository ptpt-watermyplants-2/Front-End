import React from 'react';
import { withFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import { 
  Input,
  Heading,
  FormDiv,
  Button,
  Error
} from './StyledComponents'

const Login = props => {
  const { errors, touched } = props;

  return (
    <>
      <Heading>Login</Heading>
      <FormDiv>
        {touched.username && errors.username && (
          <Error>{errors.username}</Error>
        )}
        <Input type="text" name="Username" placeholder="Username" />

        {touched.password && errors.password && (
          <Error>{errors.password}</Error>
        )}
        <Input type="password" name="Password" placeholder="Password" />

        <Button type="submit">Login</Button>
      </FormDiv>
    </>
  );
};

export default withFormik({
  mapPropsToValues: values => {
    return {
      username: values.username || '',
      password: values.password || ''
    };
  },
  validationSchema: yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
  }),
  validateOnChange: false,
  validateOnBlur: false,
  handleSubmit: (values, { props, resetForm }) => {
    axios
      .post(
//api-url/auth/login
        values)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        resetForm();
        return props.history.push('/home');
      })
      .catch(err => {
        return err.response;
      });
  }
})(Login);
