import * as React from 'react';
import {FC, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Header} from '../../components/Header';
import {Footer} from '../../components/Footer';
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup';
import {PopUp} from '../../components/PopUp';
import {axiosDefault} from '../../api/fetchClient';
import {LOGIN_URL} from '../../api/constants';
import {Alert, AlertTitle} from '@mui/material';
import {useCafe} from '../../hooks/useCafe';
import {LoaderButton} from '../../components/Loaders/LoaderButton';
import {AxiosError} from 'axios';
import {PasswordInput} from '../../components/PasswordInput';

const theme = createTheme();

export type IFormInputsLogin = {
    username: string;
    password: string;
}

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
})

export const SignIn: FC = () => {
    const {
        control,
        reset,
        handleSubmit,
        formState: {errors}
    } = useForm<IFormInputsLogin>({resolver: yupResolver(schema)});

    const navigate = useNavigate();
    const location = useLocation();
    // check previous path, if NA, than homepage
    const from = location.state?.from?.pathname || '/';

    const {isPopUpOpen, setPopUpOpen, setAuthData} = useCafe();
    const [error, setError] = useState('');
    const [loading, setLoading] = React.useState(false);

    const handleOnSubmit = async (data: IFormInputsLogin) => {
        console.log(data)
        try {
            setLoading(true);
            const response = await axiosDefault.post(LOGIN_URL,
                JSON.stringify({...data}),
            );
            setLoading(false);
            setError('');
            setAuthData(response.data);
            localStorage.setItem('authData', JSON.stringify(response.data));
            console.log(response.data);
            reset();
            setPopUpOpen(true);

            setTimeout(() => {
                navigate(from, {replace: true})
                setPopUpOpen(false);
            }, 1000);
        } catch (err) {
            if (!(err instanceof AxiosError)) {return}
            setLoading(false);
            if (!err?.response) {
                setError('No server response');
            } else if (err?.response) {
                setError(err?.response?.data.error);
            } else {
                setError('Login failed');
            }
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}>
                <Header withSideBar={false}/>
                <Container
                    component="main"
                    maxWidth="xs"
                    sx={{flexGrow: 1}}
                >
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <Box component="form"
                             onSubmit={handleSubmit(handleOnSubmit)}
                             sx={{mt: 1}}>
                            <Controller
                                render={
                                    ({field}) =>
                                        <TextField
                                            {...field}
                                            margin="normal"
                                            fullWidth
                                            id="username"
                                            label={"Username or Email"}
                                            autoComplete="off"
                                            error={!!errors.username}
                                            helperText={errors.username ? errors.username?.message : ''}
                                            autoFocus
                                        />}
                                control={control}
                                name={'username'}
                                defaultValue={''}
                            />

                           <PasswordInput control={control} error={errors.password}/>

                            {error &&
                              <Alert
                                severity="error"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                              >
                                <AlertTitle>{error}</AlertTitle>
                              </Alert>}

                            {(isPopUpOpen) && <Alert
                              severity="success"
                              sx={{
                                  display: {xs: 'none', md: 'flex'},
                                  justifyContent: 'center'
                              }}
                            >
                              <AlertTitle>
                                Successfuly logged in!
                              </AlertTitle>
                            </Alert>
                            }

                            <LoaderButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                loading={loading}
                                success={isPopUpOpen}
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                }}
                            >
                                Login
                            </LoaderButton>

                            <Typography
                                to='/signup'
                                variant="body2"
                                component={Link}
                            >
                                {"Don't have an account? Register"}
                            </Typography>

                        </Box>
                    </Box>
                </Container>
                <PopUp variant={'signIn'}/>
                <Footer/>
            </Box>
        </ThemeProvider>
    );
}
