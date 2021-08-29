import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { isTypedArray } from 'util/types';
import MutationObserver from 'mutationobserver-shim';

import { render, screen} from "@testing-library/react";
import PlantCard from './components/PlantCard'

test('renders without crashing', () => {
  console.log('hello', render, PlantCard, App)
  render(<PlantCard />)
})

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });