import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Formsy from 'formsy-react';
import { TextFieldFormsy } from '@fuse/core/formsy';
import FuseLoading from '@fuse/core/FuseLoading';

// import { useDeepCompareEffect } from '@fuse/hooks';
// import { showMessage } from 'app/store/fuse/messageSlice';
// import objectsKeysEquals from 'app/utils/validations/objectsKeysEquals';

import ButtonDefault from 'app/fuse-layouts/shared-components/button-default/ButtonDeafault';
import { Grid } from '@mui/material';

// eslint-disable-next-line unused-imports/no-unused-imports
import { clearState, deleteOne, saveOne, updateOne, updateState } from '../store/taskSlice';
import { getAll, selectAll, selectById } from '../store/tasksSlice';

function Content() {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const navigate = useNavigate();

  const taskRedux = useSelector(({ task }) => task);
  const tasksRedux = useSelector(selectAll);

  const [contents, setContents] = useState([]);
  const [selectedContents, setSelectedContents] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [detail, setDetail] = useState('');

  // useDeepCompareEffect(() => {
  //   function updateState() {
  //     const { id } = routeParams;
  //     if (id === 'new') {
  //       dispatch(newData());
  //     } else {
  //       setLoading(true);
  //       dispatch(getOne(id));
  //     }
  //   }

  //   updateState();
  // }, [dispatch, routeParams]);

  // useEffect(() => {
  //   if (taskRedux) {
  //     if (loading) {
  //       console.log(' --------- seta loading? --------- ');
  //       setLoading(taskRedux.loading);
  //     }
  //   }
  // }, [taskRedux]);
  const params = useParams();
  const task = useSelector((tasks) => selectById(tasks, params.id));

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    !tasksRedux.length ? dispatch(getAll()) : dispatch(updateState(task));
    if (task && task.description) setDescription(task.description);
    if (task && task.detail) setDetail(task.detail);
  }, [tasksRedux]);

  function handleSelect(value) {
    setSelectedContents(value);
  }
  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  function handleClick(e) {
    if (params.id === 'new') {
      dispatch(
        saveOne({
          description,
          detail,
          token: JSON.parse(localStorage.getItem('token')),
        })
      );
      navigate('/');
    }
    if (params.id !== 'new') {
      dispatch(
        updateOne({
          id: params.id,
          description,
          detail,
          token: JSON.parse(localStorage.getItem('token')),
        })
      );
      navigate('/');
    }
  }

  if (!task && params.id !== 'new') {
    return <FuseLoading />;
  }

  return (
    <Grid container item xs={12}>
      <Grid item xs={12}>
        <Formsy
          // onValidSubmit={handleSubmit}
          // onChange={canBeSubmitted}
          onValid={enableButton}
          onInvalid={disableButton}
        >
          <TextFieldFormsy
            className="mb-16 w-full"
            label="Descrição"
            type="text"
            name="title"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            validations={{ minLength: 3 }}
            validationErrors={{ minLength: 'Preencha o campo com a descrição' }}
            fullWidth
            autoFocus
            required
          />
          <TextFieldFormsy
            className="mb-16 w-full"
            label="Detalhamento"
            type="text"
            name="description"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            variant="outlined"
            validations={{ minLength: 3 }}
            validationErrors={{ minLength: 'Preencha o campo com o detalhamento' }}
            fullWidth
            required
          />

          {/* <SelectFormsy
						className="mb-16 w-full"
						label="Recorrência"
						type="select"
						name="payment"
						value={plan.payment}
						variant="outlined"
						fullWidth
					>
						<MenuItem value="" disabled>
							Escolha a recorrência
						</MenuItem>
						{recurrences.map(item => (
							<MenuItem value={item.value}>{item.label}</MenuItem>
						))}
					</SelectFormsy> */}

          <Grid container item className="flex justify-end items-end">
            <Grid item xs={7} sm={5} md={4} lg={3} xl={2}>
              <ButtonDefault
                fullWidth
                type="submit"
                title="Salvar"
                loading={loading}
                disabled={!isFormValid}
                action={handleClick}
              />
            </Grid>
          </Grid>
        </Formsy>
      </Grid>
    </Grid>
  );
}

export default Content;
