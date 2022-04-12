/* eslint-disable import/prefer-default-export */
import { styled, darken } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({}));

const GradientSection = styled('div')(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
    theme.palette.primary.dark,
    0.5
  )} 100%)`,
  color: theme.palette.primary.contrastText,
}));

export { Root, GradientSection };
