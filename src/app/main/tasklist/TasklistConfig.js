import React from 'react';
import { authRoles } from 'app/auth';

const Task = React.lazy(() => import('./show/Task'));
const Tasks = React.lazy(() => import('./list/Tasks'));

const TasklistConfig = {
  settings: {
    layout: {
      config: {
        mode: 'container',
        scroll: 'content',
        navbar: {
          display: true,
          folded: true,
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
      },
    },
  },
  auth: authRoles.user,
  routes: [
    {
      path: '/task/:id',
      element: <Task />,
    },
    {
      path: '/tasks',
      exact: true,
      element: <Tasks />,
    },
  ],
};

export default TasklistConfig;
