import React from 'react';
import { createRoot } from 'react-dom/client';

jest.mock(
  'react-router-dom',
  () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    NavLink: ({ children, className, to }) => {
      const resolvedClassName =
        typeof className === 'function'
          ? className({ isActive: false })
          : className;

      return (
        <a className={resolvedClassName} href={to}>
          {children}
        </a>
      );
    },
    Route: ({ element }) => <div>{element}</div>,
    Routes: ({ children }) => <div>{children}</div>
  }),
  { virtual: true }
);

import { AppHolder } from './AppHolder';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<AppHolder />);
  root.unmount();
});
