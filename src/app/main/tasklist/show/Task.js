import { useDispatch } from 'react-redux';

import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';

import Header from './Header';
import Content from './Content';

const Root = styled(FusePageCarded)(({ theme }) => ({
  '& .FusePageCarded-header': {
    minHeight: 72,
    height: 72,
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      minHeight: 136,
      height: 136,
    },
  },
}));

function Task() {
  const dispatch = useDispatch();

  return (
    <Root
      classes={{
        root: 'pb-48',
        toolbar: 'p-0 bg-white',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
        contentCard: 'rounded-12',
      }}
      header={<Header />}
      content={
        <div className="p-16 sm:p-24">
          <Content />
        </div>
      }
      innerScroll
    />
  );
}

export default Task;
