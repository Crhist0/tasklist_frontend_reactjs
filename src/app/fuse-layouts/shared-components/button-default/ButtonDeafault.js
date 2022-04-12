import { Button, CircularProgress } from '@mui/material';

export default function ButtonPrimary({
  title,
  disabled,
  type,
  ariaLabel,
  fullWidth,
  action,
  loading,
}) {
  return (
    <Button
      type={type}
      variant="contained"
      color="secondary"
      className=" mx-auto mt-16 text-20 font-extrabold"
      aria-label={ariaLabel}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      value="legacy"
      onClick={action}
    >
      {loading ? <CircularProgress color="inherit" /> : title}
    </Button>
  );
}
