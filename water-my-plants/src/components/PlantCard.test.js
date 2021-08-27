import React from 'react';
import MutationObserver from 'mutationobserver-shim';
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PlantCard from './PlantCard';

const plant = {
    id: 1,
    plant_name: 'TestPlant',
    plant_species: 'TestSpecie',
    water_schedule: 'every day'
}



test("render component correctly", () => {
    const handleDelete = jest.fn(() => {
        console.log('handleDelete')
    })
    //Arrange
    render(<PlantCard name={plant.plant_name} species={plant.plant_species} schedule={plant.water_schedule} handleDelete={handleDelete} value={'value'}/>)
})

test("display plant name correctly", () => {
    const handleDelete = jest.fn(() => {
        console.log('handleDelete')
    })
    //Arrange
    const {getByText} = render(<PlantCard name={plant.plant_name} species={plant.plant_species} schedule={plant.water_schedule} handleDelete={handleDelete} value={'value'}/>)
    //Act, Assert
    getByText(plant.plant_name)
})

test("display plant species correctly", () => {
    const handleDelete = jest.fn(() => {
        console.log('handleDelete')
    })
    //Arrange
    const {getByText} = render(<PlantCard name={plant.plant_name} species={plant.plant_species} schedule={plant.water_schedule} handleDelete={handleDelete} value={'value'}/>)
    //Act, Assert
    getByText(plant.plant_species)
})

test("display plant schedule correctly", () => {
    const handleDelete = jest.fn(() => {
        console.log('handleDelete')
    })
    //Arrange
    const {getByText} = render(<PlantCard name={plant.plant_name} species={plant.plant_species} schedule={plant.water_schedule} handleDelete={handleDelete} value={'value'}/>)
    //Act, Assert
    getByText(plant.water_schedule)
})

test("call handleDelete when button is clicked", () => {
    const handleDelete = jest.fn(() => {
        console.log('handleDelete')
    })
    //Arrange
    const { getByRole } = render(<PlantCard name={plant.plant_name} species={plant.plant_species} schedule={plant.water_schedule} handleDelete={handleDelete} value={'value'}/>)
    //Act
    userEvent.click(getByRole('button'))
    //Assert
    expect(handleDelete).toHaveBeenCalledTimes(1)
})