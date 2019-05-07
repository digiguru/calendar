import React from 'react';
import ReactDOM from 'react-dom';
import { AppHolder } from './AppHolder';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppHolder />, div);
  ReactDOM.unmountComponentAtNode(div);
});
