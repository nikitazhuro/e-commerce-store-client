import React, { PureComponent } from 'react';
import { Route, Routes } from 'react-router-dom';

import publicRoutes from '../../router';

class AppRouter extends PureComponent {
  render() {
    return (
      <Routes>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            element={route.element}
            path={route.path}
          />
        ))}
      </Routes>
    );
  }
}

export default AppRouter;
