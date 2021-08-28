import React from 'react';
import MutationObserver from 'mutationobserver-shim';
import { queryByTestId, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Plants from './Plants';

const plant = {
    id: 1,
    plant_name: 'TestPlant',
    plant_species: 'TestSpecie',
    water_schedule: 'every day'
};

const errors = {
    plant_name: '',
    plant_species: '',
    water_schedule: ''
};

const touched = {
    ...plant
};

const status = true;



test('render component correctly', () => {
    render(<Plants />)
})

test("form submit when button is clicked", () => {
    const buttonClicked = jest.fn(() => {
        console.log('buttonClicked')
    })
    //Arrange
    const { getByRole } = render(<Plants error={errors} touched={touched} status={status}/>)
    const buttonToClick = getByRole('button')
    buttonToClick.onclick = buttonClicked()
    //Act
    userEvent.click(buttonToClick)
    //Assert
    expect(buttonClicked).toHaveBeenCalledTimes(1)
})

test("display all error messages", async () => {
    //Arrange
    const { getByRole, findAllByTestId } = render(<Plants error={errors} touched={touched} status={false}/>)
    //Act
    userEvent.click(getByRole('button'))
    //Assert
    const errorDivs = await findAllByTestId('errorDiv')
    expect(errorDivs).toHaveLength(3)
  });

test("error messages disappear when field are filled up correctly", async () => {
    //Arrange
    const { getByRole, findAllByTestId, getByPlaceholderText } = render(<Plants error={errors} touched={touched} status={false}/>)
    const buttonToClick = getByRole('button')
    //Act
    userEvent.click(buttonToClick)
    //Assert
    const errorDivs = await findAllByTestId('errorDiv')
    expect(errorDivs).toHaveLength(3)
});

test("Plant Name error message doesn't appear when field is filled up correctly", async () => {
    //Arrange
    const { getByRole, findAllByTestId, getByPlaceholderText } = render(<Plants error={errors} touched={touched} status={false}/>)
    const buttonToClick = getByRole('button')
    //Arrange Plant Name
    const plantNameInput = getByPlaceholderText(/plant name/i)
    //Act Plant Name
    userEvent.type(plantNameInput, plant.plant_name)
    userEvent.click(buttonToClick)
    const errorDivs = await findAllByTestId('errorDiv')
    //Assert Plant Name
    expect(errorDivs).toHaveLength(2)
});

test("Species error message doesn't appear when field is filled up correctly", async () => {
    //Arrange
    const { getByRole, findAllByTestId, getByPlaceholderText } = render(<Plants error={errors} touched={touched} status={false}/>)
    const buttonToClick = getByRole('button')
    //Arrange species
    const speciesInput = getByPlaceholderText(/species/i)
    //Act species
    userEvent.type(speciesInput, plant.plant_species)
    userEvent.click(buttonToClick)
    const errorDivs = await findAllByTestId('errorDiv')
    //Assert species
    expect(errorDivs).toHaveLength(2)
});

test("Water Schedule error message doesn't appear when field is filled up correctly", async () => {
    //Arrange
    const { getByRole, findAllByTestId, getByPlaceholderText } = render(<Plants error={errors} touched={touched} status={false}/>)
    const buttonToClick = getByRole('button')
    //Arrange water schedule
    const waterScheduleInput = getByPlaceholderText(/Water Schedule/i)
    //Act water schedule
    userEvent.type(waterScheduleInput, plant.water_schedule)
    userEvent.click(buttonToClick)
    const errorDivs = await findAllByTestId('errorDiv')
    //Assert water schedule
    expect(errorDivs).toHaveLength(2)
});

