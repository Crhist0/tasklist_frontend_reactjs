import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

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

import { registerError, submitRegister } from 'app/auth/store/registerSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import History from '@history';
import { Root } from './styleds';

function Signin() {
  const register = useSelector(({ auth }) => auth.register);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formRef = useRef(null);

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  function handleSubmit(model) {
    dispatch(submitRegister(model));
    formRef.current.reset();
  }

  useEffect(() => {
    if (!register.success && register.error?.error) {
      dispatch(
        showMessage({
          message: register.error.error, // text or html
          autoHideDuration: 5000, // ms
          anchorOrigin: {
            vertical: 'top', // top bottom
            horizontal: 'center', // left center right
          },
          variant: 'error', // success error info warning null
        })
      );
    }
    if (register.success) {
      dispatch(
        showMessage({
          message: 'Conta criada com sucesso', // text or html
          autoHideDuration: 5000, // ms
          anchorOrigin: {
            vertical: 'top', // top bottom
            horizontal: 'center', // left center right
          },
          variant: 'success', // success error info warning null
        })
      );
      dispatch(registerError());
      History.push('/login');
    }
  }, [register]);

  return (
    <Root className="flex flex-col flex-auto flex-shrink-0 md:flex-row md:p-0">
      <FuseAnimate animation="transition.fadeIn">
        <Box
          className="md:w-7/12 sx:w-full sm:hidden md:block h-screen"
          sx={{
            backgroundImage: 'url(assets/images/logos/BG5.webp)',
            visibility: 'visible !important', // children do fuseAnimate recebe hidden
            backgroundPosition: 'center',
          }}
        />
      </FuseAnimate>

      <FuseAnimate animation="transition.fadeIn">
        <Card className="w-5/12 mx-auto m-16 md:m-0 " square>
          <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
            <Typography variant="h6" className="mb-32 font-bold text-20 sm:text-24">
              Crie sua conta
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
                name="name"
                label="User name"
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
                validations={{ minLength: 5 }}
                validationErrors={{ minLength: 'Mínimo 5 caracteres' }}
                required
              />

              <TextFieldFormsy
                className="mb-16"
                type="password"
                name="pass"
                label="Password"
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

              <TextFieldFormsy
                className="mb-16"
                type="password"
                name="Rpass"
                label="Repeat password"
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
                validations={{ minLength: 5, maxLength: 50, equalsField: 'pass' }}
                validationErrors={{
                  minLength: 'Mínimo 5 caracteres',
                  maxLength: 'Máximo 50 caracteres',
                  equalsField: 'As senhas estão diferentes',
                }}
                required
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="w-full mx-auto mt-16"
                aria-label="LOG IN"
                disabled={!isFormValid}
                value="legacy"
              >
                Cadastro
              </Button>
            </Formsy>

            {/* <div className="my-24 flex items-center justify-center">
              <Divider className="w-32" />
              <span className="mx-8 font-bold">OU</span>
              <Divider className="w-32" />
            </div>

            <Button variant="contained" color="secondary" size="small" className="w-192 mb-8">
              Cadastre com Google
            </Button>

            <Button variant="contained" color="primary" size="small" className="w-192">
              Cadastre com Facebook
            </Button> */}
            <div className="flex flex-col items-center justify-center pt-64 pb-24">
              <Link className="font-medium" to="/login">
                Voltar
              </Link>
            </div>
          </CardContent>
        </Card>
      </FuseAnimate>
    </Root>
  );
}

export default Signin;
