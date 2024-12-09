import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppHolder } from './AppHolder';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<AppHolder />);
  root.unmount();
});
