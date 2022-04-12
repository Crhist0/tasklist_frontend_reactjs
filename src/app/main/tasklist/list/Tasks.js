import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FusePageCarded from '@fuse/core/FusePageCarded';

import TableComponent from 'app/fuse-layouts/shared-components/table/Table';
import PageCardedHeader from 'app/fuse-layouts/shared-components/page-carded-header/PageCardedHeader';

import FuseLoading from '@fuse/core/FuseLoading';
import { getAll, selectAll } from '../store/tasksSlice';
import { deleteOne } from '../store/taskSlice';

const columns = [
  {
    id: 'description',
    align: 'left',
    disablePadding: false,
    label: 'Descrição',
    sort: false,
  },
  {
    id: 'detail',
    align: 'left',
    disablePadding: false,
    label: 'Detalhamento',
    sort: false,
  },
];

export default function Products() {
  const dispatch = useDispatch();
  const tasksRedux = useSelector(selectAll);
  const taskRedux = useSelector(({ task }) => task);
  const login = useSelector(({ auth }) => auth.login);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login.success) {
      navigate('/login');
    }
  }, [login]);

  function handleClick(value) {
    navigate(`/task/${value.id}`);
  }

  function handleDelete(value) {
    dispatch(deleteOne(value.id));
  }

  function handleClickNew() {
    navigate(`/task/new`);
  }

  useEffect(() => {
    // if (!tasksRedux.length) {
    setLoading(true);
    dispatch(getAll());
    // }
  }, [taskRedux]);

  useEffect(() => {
    if (tasksRedux) {
      setData(tasksRedux);
      setLoading(false);
    }
  }, [tasksRedux]);

  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        contentCard: 'overflow-hidden rounded-t-12',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136 white',
      }}
      header={
        <PageCardedHeader
          title="Lista de tarefas"
          buttonTitle="Nova tarefa"
          buttonAction={handleClickNew}
        />
      }
      contentToolbar={<></>}
      content={
        loading ? (
          <FuseLoading />
        ) : (
          <TableComponent
            columns={columns}
            data={data}
            action={handleClick}
            actionDelete={handleDelete}
          />
        )
      }
      innerScroll
    />
  );
}
