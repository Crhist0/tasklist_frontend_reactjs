import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import PageCardedHeader from 'app/fuse-layouts/shared-components/page-carded-header/PageCardedHeader';
import { useParams } from 'react-router-dom';

function Header() {
  const taskRedux = useSelector(({ task }) => task);
  const [task, setTask] = useState({});
  const params = useParams();

  useEffect(() => {
    if (taskRedux) {
      setTask(taskRedux);
    }
    if (params.id === 'new') {
      setTask(false);
    }
  }, [taskRedux]);

  return (
    <PageCardedHeader
      link="/tasks"
      title={task ? 'Editar tarefa' : 'Nova tarefa'}
      textBack="Tarefas"
    />
  );
}

export default Header;
