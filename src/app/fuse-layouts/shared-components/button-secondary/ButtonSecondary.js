import { Button } from '@mui/material';

export default function ButtonSecondary({ title, disabled, type, ariaLabel, fullWidth }) {
  return (
    <Button
      type={type}
      variant="contained"
      color="secondary"
      className="mx-auto mt-16 text-20 font-extrabold"
      aria-label={ariaLabel}
      fullWidth={fullWidth}
      disabled={disabled}
      value="legacy"
    >
      {title}
    </Button>
  );
}
