import React from 'react'
import MutationObserver from 'mutationobserver-shim';
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignUp from './SignUp';

const user = {
    fullname: 'newFullName',
    username: 'newUserName',
    password: '12345678',
    password2: '12345678',
    phoneNumber: 1234567890,
    termsOfService: true
}
const errors = {
    fullname: '',
    username: '',
    password: '',
    password2: '',
    phonenumber: '',
    termsOfService: false
}
const values = {
    ...errors
}
const touched ={
    ...errors
}

test("display all error messages", async () => {
    //Arrange
    const { findAllByTestId, getByRole } = render(<SignUp errors={errors} touched={touched} values={values}/>);
    //Act
    userEvent.click(getByRole('button'))
    //Assert
    const errorDivs = await findAllByTestId('errorDiv')
    expect(errorDivs).toHaveLength(6)
  });

test("display error message if Name is > 20 characters", async () => {
    //Arrange
    const { findByText, getByRole, queryByPlaceholderText } = render(<SignUp errors={errors} touched={touched} values={values}/>);
    //Act
    const fullName = queryByPlaceholderText('Name')
    userEvent.type(fullName, '123456789009876543211234567890')
    userEvent.click(getByRole('button'))
    //Assert
    const errorDiv = await findByText('Username must be less than 20 characters')
    expect(errorDiv).toBeTruthy()
  });

test("display error message if Name is < 5 characters", async () => {
    //Arrange
    const { findByText, getByRole, queryByPlaceholderText } = render(<SignUp errors={errors} touched={touched} values={values}/>);
    //Act
    const username = queryByPlaceholderText('Username')
    userEvent.type(username, '1234')
    userEvent.click(getByRole('button'))
    //Assert
    const errorDiv = await findByText('Username must be at least 5 characters')
    expect(errorDiv).toBeTruthy()
  });

test("does not display error message if Name is correct", async () => {
    //Arrange
    const { queryByText, getByRole, queryByPlaceholderText } = render(<SignUp errors={errors} touched={touched} values={values}/>);
    //Act
    const fullName = queryByPlaceholderText('Name')
    userEvent.type(fullName, user.fullname)
    userEvent.click(getByRole('button'))
    //Assert
    const errorDiv = queryByText('fullname is a required field')
    expect(errorDiv).toBeNull()
    const errorDiv2 = queryByText('Username must be less than 20 characters')
    expect(errorDiv2).toBeNull()
});

test("does not display error message if Username is correct", async () => {
    //Arrange
    const { queryByText, getByRole, queryByPlaceholderText } = render(<SignUp errors={errors} touched={touched} values={values}/>);
    //Act
    const fullName = queryByPlaceholderText('Username')
    userEvent.type(fullName, user.username)
    userEvent.click(getByRole('button'))
    //Assert
    const errorDiv = queryByText('username is a required field')
    expect(errorDiv).toBeNull()
    const errorDiv2 = queryByText('Username must be at least 5 characters')
    expect(errorDiv2).toBeNull()
});

test("display error message if Password is < 8 characters", async () => {
    //Arrange
    const { findByText, getByRole, queryByPlaceholderText } = render(<SignUp errors={errors} touched={touched} values={values}/>);
    //Act
    const password = queryByPlaceholderText('Password')
    userEvent.type(password, '1234567')
    userEvent.click(getByRole('button'))
    //Assert
    const errorDiv = await findByText('Password must be at least 8 characters')
    expect(errorDiv).toBeTruthy()
});

test("does not display error message if Password is correct", () => {
    //Arrange
    const { queryByText, getByRole, queryByPlaceholderText } = render(<SignUp errors={errors} touched={touched} values={values}/>);
    //Act
    const password = queryByPlaceholderText('Password')
    userEvent.type(password, user.password)
    userEvent.click(getByRole('button'))
    //Assert
    const errorDiv = queryByText('Password must be at least 8 characters')
    expect(errorDiv).toBeNull()
});

test("display error message if Passwords don't match", async () => {
    //Arrange
    const { findByText, getByRole, queryByPlaceholderText } = render(<SignUp errors={errors} touched={touched} values={values}/>);
    //Act
    const password = queryByPlaceholderText('Password')
    const passwordConfirmation = queryByPlaceholderText('Confirm password')
    userEvent.type(password, user.password)
    userEvent.type(passwordConfirmation, 'trigger the error message')
    userEvent.click(getByRole('button'))
    //Assert
    const errorDiv = await findByText('Passwords must match')
    expect(errorDiv).toBeTruthy()
});

test("doesn't display error message if Passwords match", () => {
    //Arrange
    const { queryByText, getByRole, queryByPlaceholderText } = render(<SignUp errors={errors} touched={touched} values={values}/>);
    //Act
    const password = queryByPlaceholderText('Password')
    const passwordConfirmation = queryByPlaceholderText('Confirm password')
    userEvent.type(password, user.password)
    userEvent.type(passwordConfirmation, user.password2)
    userEvent.click(getByRole('button'))
    //Assert
    const errorDiv = queryByText('Passwords must match')
    expect(errorDiv).toBeNull()
});

test("display error message if phone number is not a number", async () => {
    //Arrange
    const { findByText, getByRole, queryByPlaceholderText } = render(<SignUp errors={errors} touched={touched} values={values}/>);
    //Act
    const phoneNumber = queryByPlaceholderText('Phone number')
    userEvent.type(phoneNumber, 'this is not a number')
    userEvent.click(getByRole('button'))
    //Assert
    const errorDiv = await findByText(/phonenumber must be a /)
    expect(errorDiv).toBeTruthy()
});

// test("does not display error message if phone number is correct", () => {
//     //Arrange
//     const { queryByText, getByRole, queryByPlaceholderText } = render(<SignUp errors={errors} touched={touched} values={values}/>);
//     //Act
//     const phoneNumber = queryByPlaceholderText('Phone number')
//     userEvent.type(phoneNumber, 123456)
//     userEvent.click(getByRole('button'))
//     //Assert
//     const errorDiv = queryByText(/phonenumber must be a /)
//     expect(errorDiv).toBeNull()
// });

test("does not display error message if Terms of Service is clicked", () => {
    //Arrange
    const { findByText, queryByText } = render(<SignUp errors={errors} touched={touched} values={values}/>);
    //Act
    const checkbox = queryByText('Terms of Service')
    userEvent.click(checkbox)
    //Assert
    const errorDiv = queryByText('You must agree to the terms of service')
    expect(errorDiv).toBeNull()
});