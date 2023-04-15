import * as React from 'react';
import {FC, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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
import {axiosPrivate} from '../../api/fetchClient';
import {LOGIN_URL} from '../../api/constants';
import {Alert, AlertTitle} from '@mui/material';
import {useCafe} from '../../hooks/useCafe';
import {useWidth} from '../../utils/useWidth';

const theme = createTheme();

type IFormInputs = {
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
    } = useForm<IFormInputs>({resolver: yupResolver(schema)});

    const navigate = useNavigate();
    const location = useLocation();
    // check previous path, if NA, than homepage
    const from = location.state?.from?.pathname || '/';

    const {isPopUpOpen, setPopUpOpen, setAuthData} = useCafe();
    const [error, setError] = useState('');
    const width = useWidth();

    const handleOnSubmit = async (data: IFormInputs) => {
        console.log(data)
        try {
            const response = await axiosPrivate.post(LOGIN_URL,
                JSON.stringify({...data}),
            );
            console.log(JSON.stringify(response?.data));
            setAuthData(response.data);
            reset();
            setPopUpOpen(true);

            setTimeout(() => navigate(from, {replace: true}), 1000);
        } catch (err) {
            // @ts-ignore
            if (!err?.response) {
                setError('No server response');
                // @ts-ignore
            } else if (err.response) {
                // @ts-ignore
                setError(err.response?.data.errors);
                // @ts-ignore
                console.log(err.response)
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
                            Sign in
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
                                            label={"Username"}
                                            autoComplete="off"
                                            error={!!errors.username}
                                            helperText={errors.username ? errors.username?.message : ''}
                                            autoFocus
                                        />}
                                control={control}
                                name={'username'}
                                defaultValue={''}
                            />

                            <Controller
                                render={
                                    ({field}) =>
                                        <TextField
                                            {...field}
                                            fullWidth
                                            margin="normal"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            error={!!errors.password}
                                            helperText={errors.password ? errors.password?.message : ''}
                                        />}
                                control={control}
                                name={'password'}
                                defaultValue={''}
                            />

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

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign In
                            </Button>

                            <Typography
                                to='/signup'
                                variant="body2"
                                component={Link}
                            >
                                {"Don't have an account? Sign Up"}
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
