import React from 'react';
import MutationObserver from 'mutationobserver-shim';
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom'

import Nav from './Nav';


test("render component correctly", () => {
    //Arrange
    const { getByText } = render(<Router><Nav /></Router>)
    getByText('Water My Plant')
})


test("check if log in , sign up link are present", () => {
    //Arrange
    const { queryByText } = render(<Router><Nav /></Router>)
    //Act, Assert
    expect(queryByText(/Sign Up/i)).toHaveAttribute('href', '/signup')
    expect(queryByText(/log in/i)).toHaveAttribute('href', '/login')
})

test("check if log in , sign up link are present", () => {
    //Arrange
    const { queryByText } = render(<Router><Nav /></Router>)
    //Act, Assert
    expect(queryByText(/my plants/i)).toHaveAttribute('href', '/home')
    expect(queryByText(/add a plant/i)).toHaveAttribute('href', '/plants')
    expect(queryByText(/profile/i)).toHaveAttribute('href', '/profile')
})

test("check that click on log out works", () => {
    const logOutClick = jest.fn(() => console.log('log out clicked'))
    //Arrange
    const { queryByRole } = render(<Router><Nav /></Router>)
    //Act
    const logOutButton = queryByRole('button')
    logOutButton.onclick = logOutClick()
    userEvent.click(logOutButton)
    //Assert
    expect(logOutClick).toHaveBeenCalledTimes(1)
})

