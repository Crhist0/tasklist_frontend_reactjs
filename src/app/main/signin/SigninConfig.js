import React from 'react';
import { authRoles } from 'app/auth';

const Signin = React.lazy(() => import('./Signin'));

const SigninConfig = {
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
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: '/signin',
      element: <Signin />,
    },
  ],
};

export default SigninConfig;
