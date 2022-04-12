import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import FuseAnimate from '@fuse/core/FuseAnimate';
import { TextFieldFormsy } from '@fuse/core/formsy';
import Formsy from 'formsy-react';
import {
  Button,
  Card,
  CardContent,
  InputAdornment,
  Icon,
  IconButton,
  Typography,
  Box,
} from '@mui/material';

import { loginError, submitLogin } from 'app/auth/store/loginSlice';

import { showMessage } from 'app/store/fuse/messageSlice';
import { Root } from './styleds';

function Login() {
  const user = useSelector(({ auth }) => auth.user);
  const login = useSelector(({ auth }) => auth.login);
  const dispatch = useDispatch();
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    if (login.error && (login.error.email || login.error.password)) {
      formRef.current.updateInputsWithError({
        ...login.error,
      });
      disableButton();
    }
  }, [login.error]);

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  function handleSubmit(model) {
    dispatch(submitLogin(model));
    formRef.current.reset();
  }

  useEffect(() => {
    if (!login.success && login.error?.error) {
      dispatch(
        showMessage({
          message: login.error.error, // text or html
          autoHideDuration: 5000, // ms
          anchorOrigin: {
            vertical: 'top', // top bottom
            horizontal: 'center', // left center right
          },
          variant: 'error', // success error info warning null
        })
      );
      dispatch(loginError());
    }
    if (login.success && user.role.length) {
      dispatch(
        showMessage({
          message: 'Usuário logado', // text or html
          autoHideDuration: 5000, // ms
          anchorOrigin: {
            vertical: 'top', // top bottom
            horizontal: 'center', // left center right
          },
          variant: 'success', // success error info warning null
        })
      );
    }
  }, [login]);

  useEffect(() => {
    if (login.success && !user.role.length) {
      dispatch(loginError());
    }
  }, []);

  return (
    <Root className="flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0">
      <FuseAnimate animation="transition.fadeIn">
        <Box
          className="w-7/12 h-screen"
          sx={{
            backgroundImage: 'url(assets/images/logos/BG5.webp)',
            visibility: 'visible !important',
            backgroundPosition: 'center',
          }}
        />
      </FuseAnimate>

      <FuseAnimate animation="transition.fadeIn">
        <Card className="w-5/12 mx-auto m-16 md:m-0" square>
          <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
            <Typography variant="h6" className="mb-32 font-bold text-20 sm:text-24">
              Login to your account
            </Typography>

            <Formsy
              onValidSubmit={handleSubmit}
              onValid={enableButton}
              onInvalid={disableButton}
              ref={formRef}
              className="flex flex-col justify-center w-full"
            >
              <TextFieldFormsy
                className="mb-16"
                type="text"
                name="email"
                label="Nome"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon className="text-20" color="action">
                        account_circle
                      </Icon>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                validations={{ minLength: 5, maxLength: 50 }}
                validationErrors={{
                  minLength: 'Mínimo 5 caracteres',
                  maxLength: 'Máximo 50 caracteres',
                }}
                required
              />

              <TextFieldFormsy
                className="mb-16"
                type="password"
                name="password"
                label="Senha"
                InputProps={{
                  className: 'pr-2',
                  type: showPassword ? 'text' : 'password',
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        <Icon className="text-20" color="action">
                          {showPassword ? 'visibility' : 'visibility_off'}
                        </Icon>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                validations={{ minLength: 5, maxLength: 50 }}
                validationErrors={{
                  minLength: 'Mínimo 5 caracteres',
                  maxLength: 'Máximo 50 caracteres',
                }}
                required
              />

              {/* <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                <CheckboxFormsy
                  className="my-16"
                  name="remember"
                  value={false}
                  label="Remember Me"
                />

                <Link className="font-medium" to="/forgot-password">
                  Forgot Password?
                </Link>
              </div> */}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="w-full mx-auto mt-16"
                aria-label="LOG IN"
                disabled={!isFormValid}
                value="legacy"
              >
                Login
              </Button>
            </Formsy>

            {/* <div className="my-24 flex items-center justify-center">
              <Divider className="w-32" />
              <span className="mx-8 font-bold">OU</span>
              <Divider className="w-32" />
            </div> */}

            {/* <Button variant="contained" color="secondary" size="small" className="w-192 mb-8">
              Log in with Google
            </Button>

            <Button variant="contained" color="primary" size="small" className="w-192">
              Log in with Facebook
            </Button> */}

            <div className="flex flex-col items-center justify-center pt-64 pb-24">
              <span className="font-medium">Não possui uma conta?</span>
              <Link className="font-medium" to="/signin">
                Criar nova conta
              </Link>
            </div>
          </CardContent>
        </Card>
      </FuseAnimate>
    </Root>
  );
}

export default Login;
