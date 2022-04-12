import React from 'react';
import { authRoles } from 'app/auth';

const Logout = React.lazy(() => import('./Logout'));

const LogoutConfig = {
  settings: {
    layout: {
      config: {
        mode: 'fullwidth',
        scroll: 'content',
        navbar: {
          display: false,
          folded: false,
          position: 'left',
        },
        toolbar: {
          display: false,
          style: 'fixed',
          position: 'below',
        },
        footer: {
          display: false,
          style: 'fixed',
          position: 'below',
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.user,
  routes: [
    {
      path: '/logout',
      element: <Logout />,
    },
  ],
};

export default LogoutConfig;
