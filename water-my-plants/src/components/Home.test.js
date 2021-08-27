import React from 'react';
import MutationObserver from 'mutationobserver-shim';
import { render, screen, waitFor, rerender } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";


import Home from './Home';


test('Component renders correctly', async () => {
    const { getByText } = render(<Router><Home /></Router>)
    getByText(/My Plant/i)
    getByText(/Add a plant/i)
    // await waitFor(
    //     //wait for the data to come from the api call
    //     console.log('okay')
    // )
})