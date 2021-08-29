import React from 'react';
import MutationObserver from 'mutationobserver-shim';
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Login from './Login';

const errors = {
    username: 'username is a required field',
    password: 'password is a required field'
}
const touched = {
    username: true,
    password: true
}
const user = { 
    username: 'John',
    password: 'password123'
}

test("error display when no username is entered", async () => { 
    //Arrange
    const { getAllByText, findByText, getByRole } = render(<Login errors={errors} touched={touched}/>);
    //Act
    const button = getAllByText(/Login/i)[1]
    userEvent.click(getByRole('button'))
    //Assert
    const usernameErrorMsg = await findByText('username is a required field')
    expect(usernameErrorMsg).toBeTruthy()
})

test("error display when no password is entered", async () => {
    //Arrange
    const { getAllByText, findByText, getByRole } = render(<Login errors={errors} touched={touched}/>);
    //Act
    const button = getAllByText(/Login/i)[1]
    userEvent.click(getByRole('button'))
    //Assert
    const usernameErrorMsg = await findByText('password is a required field')
    expect(usernameErrorMsg).toBeTruthy()
})

test("username error message disappear when username entered after errored", async () => {
    //Arrange
    const { getByRole, getByPlaceholderText, queryByText } = render(<Login errors={errors} touched={touched}/>);
    //Act
        //trigger the error
    userEvent.click(getByRole('button'))
        //enter username  
    userEvent.type(getByPlaceholderText(/Username/), user.username)
    userEvent.click(getByRole('button'))
    //Assert
    await waitForElementToBeRemoved(() => queryByText('username is a required field'))
})

test("password error message disappear when password entered after errored", async () => {
    //Arrange
    const { getByRole, getByPlaceholderText, queryByText } = render(<Login errors={errors} touched={touched}/>);
    //Act
        //trigger the error
    userEvent.click(getByRole('button'))
        //enter username  
    userEvent.type(getByPlaceholderText(/Password/), user.password)
    userEvent.click(getByRole('button'))
    //Assert
    await waitForElementToBeRemoved(() => queryByText('password is a required field'))
})



test("no error display when user enters correct username and password format", async () => {
    const { getByPlaceholderText, getByRole, queryByText } = render(<Login />)
    
    userEvent.type(getByPlaceholderText(/Username/), user.username)
    userEvent.type(getByPlaceholderText(/Password/), user.password)
    userEvent.click(getByRole('button'))

    const usernameErrorMsg = queryByText('username is a required field')
    expect(usernameErrorMsg).toBeNull()
})


// test("call submit when user click the login button with correct username and password", () => {
//     const handleSubmit = jest.fn()
//     const { getByPlaceholderText, getByText } = render(<Login />)

//     const user = { 
//         username: 'John',
//         password: 'password123'
//     }

//     userEvent.type(getByPlaceholderText(/Username/), user.username)
//     userEvent.type(getByPlaceholderText(/Password/), user.password)

// })