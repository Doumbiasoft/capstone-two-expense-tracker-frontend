import React, { useContext, useRef, useState, useEffect } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useFormData } from '../../hooks/useFormData';

import GoogleIcon from '@mui/icons-material/Google';

import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import PageContainer from '../../components/container/PageContainer';

import monetizationBro from '../../assets/images/backgrounds/monetization-bro.svg';
import LogoIcon from '../../layouts/full-layout/logo/LogoIcon';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import Api from '../../api'
import Spinner from '../../views/spinner/Spinner';

import { useGoogleOauth } from '../../hooks/useGoogleOauth';


export default function Login() {
  const ctx = useContext(CurrentUserContext);
  const navigateTo = useNavigate();
  const divMessage = useRef("");

  const INITIAL_STATE = {
    email: '',
    password: ''
  };
  const [formData, setFormData, handleChangeFormData] = useFormData(INITIAL_STATE);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [userGoogle, handleGoogle] = useGoogleOauth(null);


  useEffect(
    () => {
      async function OauthGoogle() {
        try {
          if (userGoogle) {
            const user = {
              firstName: userGoogle.given_name,
              lastName: userGoogle.family_name,
              email: userGoogle.email,
              oauthId: userGoogle.id,
              oauthProvider:'Google',
              oauthPicture: userGoogle.picture
            };

            //console.log("Oauth Google:", user);

            let _token = await Api.oAuth(user);
            if (_token !== undefined && _token !== "") {
              ctx.actions.handleToken(_token);
              navigateTo("/");
            }

          }
        } catch (error) {
          ctx.actions.handleToken("");
          setMessage(error);
        }
      };
      OauthGoogle();
    },
    [ userGoogle ]
);





  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.password.trim()) {
      setMessage("* Please enter a password!");
    }
    if (!formData.email.trim()) {
      setMessage("* Please enter an email address!");
    }
    if (formData.email.trim() !== "" && formData.password.trim() !== "") {
      setMessage("");
      setIsSubmitted(true);
    };
  }

  useEffect(() => {
    async function logIn() {
      try {
        if (isSubmitted === true && formData) {
          let _token = await Api.login(formData);
          if (_token !== undefined && _token !== "") {
            ctx.actions.handleToken(_token);
            setIsSubmitted(false);
            navigateTo("/");
          }
          setIsSubmitted(false);
        }
      } catch (error) {
        ctx.actions.handleToken("");
        setIsSubmitted(false);
        setMessage(error);
      }
    };
    logIn();

  }, [isSubmitted]);

  useEffect(() => {
    divMessage.current.innerHTML = message;
  }, [message]);

  return (
    <>
      <PageContainer title="Login" description="this is Login page">
        <Grid container spacing={0} sx={{ height: '100vh', justifyContent: 'center' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={6}
            sx={{
              background: (theme) => `${theme.palette.mode === 'dark' ? '#1c1f25' : '#ffffff'}`,
            }}
          >
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  position: {
                    xs: 'relative',
                    lg: 'absolute',
                  },
                  height: { xs: 'auto', lg: '100vh' },
                  right: { xs: 'auto', lg: '-50px' },
                  margin: '0 auto',
                }}
              >
                <img
                  src={monetizationBro}
                  alt="bg"
                  style={{
                    width: '100%',
                    maxWidth: '812px',
                  }}
                />
              </Box>

              <Box
                sx={{
                  p: 4,
                  position: 'absolute',
                  top: '0',
                }}
              >

              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} lg={6} display="flex" alignItems="center" sx={{
            background: (theme) => `${theme.palette.mode === 'dark' ? '#1c1f25' : '#ffffff'}`,
          }}>
            <Grid container spacing={0} display="flex" justifyContent="center">
              <Grid item xs={12} lg={9} xl={6}>
                <Box
                  sx={{
                    p: 4,
                  }}
                >

                  <Typography fontWeight="700" variant="h1">
                    <LogoIcon title='Expense Tracker' logoSize={90} titleFontSize='30px' TypographyVariant="h1" />
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="500"
                      sx={{
                        mr: 1,
                      }}
                    >New to Expense Tracker?</Typography>
                    <Typography
                      component={Link}
                      to="/auth/register"
                      fontWeight="500"
                      sx={{
                        display: 'block',
                        textDecoration: 'none',
                        color: 'primary.main',
                      }}
                    >Create an account</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" sx={{ height: '30px' }}>
                    {isSubmitted ? <Spinner /> : <></>}
                  </Box>
                  <form onSubmit={handleSubmit}>
                    <Box
                      sx={{
                        mt: 4,
                      }}
                    >
                      <div style={{ color: 'red', textAlign: 'center' }} ref={divMessage}></div>
                      <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                      <CustomTextField id="email" variant="outlined" fullWidth name="email" onChange={handleChangeFormData} />
                      <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                      <CustomTextField
                        id="password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        sx={{
                          mb: 3,
                        }}
                        name="password" onChange={handleChangeFormData}
                      />
                      <Box
                        sx={{
                          display: {
                            xs: 'block',
                            sm: 'flex',
                            lg: 'flex',
                          },
                          alignItems: 'center',
                        }}
                      >

                      </Box>

                      <Button
                        type='submit'
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{
                          pt: '10px',
                          pb: '10px',
                          color: 'white',
                        }}
                      >Sign In</Button>
                      <Box
                        sx={{
                          position: 'relative',
                          textAlign: 'center',
                          mt: '20px',
                          mb: '20px',
                          '&::before': {
                            content: '""',
                            background: (theme) =>
                              `${theme.palette.mode === 'dark' ? '#42464d' : '#ecf0f2'}`,
                            height: '1px',
                            width: '100%',
                            position: 'absolute',
                            left: '0',
                            top: '13px',
                          },
                        }}
                      >
                        <Typography
                          component="span"
                          color="textSecondary"
                          variant="h6"
                          fontWeight="400"
                          sx={{
                            position: 'relative',
                            padding: '0 12px',
                            background: (theme) =>
                              `${theme.palette.mode === 'dark' ? '#282c34' : '#fff'}`,
                          }}
                        >or sign in with</Typography>
                      </Box>

                      <Box>
                        <Button
                          variant="outlined"
                          size="large"
                          display="flex"
                          alignitems="center"
                          justifycontent="center"
                          sx={{
                            width: '100%',
                            borderColor: (theme) =>
                              `${theme.palette.mode === 'dark' ? '#42464d' : '#dde3e8'}`,
                            borderWidth: '2px',
                            textAlign: 'center',
                            mt: 2,
                            pt: '10px',
                            pb: '10px',
                            '&:hover': {
                              borderColor: (theme) =>
                                `${theme.palette.mode === 'dark' ? '#42464d' : '#dde3e8'}`,
                              borderWidth: '2px',
                            },
                            
                          }}
                          onClick={()=>handleGoogle()}
                          
                        >
                          <Box display="flex" alignItems="center">
                            <GoogleIcon
                              sx={{
                                color: (theme) => theme.palette.error.main,
                              }}
                            />
                            <Typography
                              variant="h6"
                              sx={{
                                ml: 1,
                                color: (theme) =>
                                  `${theme.palette.mode === 'dark' ? theme.palette.grey.A200 : '#13152a'
                                  }`,
                              }}
                            >Google</Typography>
                          </Box>
                        </Button>
                      </Box>

                    </Box>
                  </form>

                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </PageContainer>
    </>
  )
}
