import { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Modal } from '@mui/material';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ButtonDefault from 'app/fuse-layouts/shared-components/button-default';

export default function ModalConfirm({
  showModal,
  showLoading,
  action,
  actionCancel,
  titleButtom,
  msg,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOpen(showModal);
  }, [showModal]);

  useEffect(() => {
    setLoading(showLoading);
  }, [showLoading]);

  const handleClose = () => {
    actionCancel();
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose} className="w-full h-screen">
      <Grid container>
        <Paper
          elevation={1}
          className="absolute w-320 p-16 sm:p-20 bg-white rounded-12"
          style={{ top: 'calc(50% - 160px)', left: 'calc(50% - 160px)' }}
        >
          <Grid item xs={12} className="flex justify-end">
            <button type="button" onClick={handleClose}>
              <HighlightOffIcon color="primary" />
            </button>
          </Grid>
          <Grid item xs={12}>
            <Typography color="primary" className="font-600 text-20 my-8 text-center">
              {msg}
            </Typography>
            <ButtonDefault
              fullWidth
              type="button"
              loading={loading}
              title={titleButtom}
              action={action}
            />
          </Grid>
        </Paper>
      </Grid>
    </Modal>
  );
}
