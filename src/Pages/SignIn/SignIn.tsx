import * as React from 'react';
import {FC, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary"
                    align="center" {...props}>
            {'Copyright © '}
            <Typography
                color="inherit"
                component={Link}
                to="/"
            >
                MyCafe
            </Typography>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

type IFormInputs = {
    login: string;
    password: string;
}

const schema = yup.object().shape({
    login: yup.string().required(),
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

    const {setPopUpOpen, setAuth} = useCafe();
    const [error, setError] = useState('');

    const handleOnSubmit = async (data: IFormInputs) => {
        try {
            const response = await axiosPrivate.post(LOGIN_URL,
                JSON.stringify({...data}),
            );
            console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response));
            const accessToken = response?.data?.token;
            setAuth(true);
            reset();
            setPopUpOpen(true);

            setTimeout(() => navigate(from, {replace: true}), 3000);
        } catch (err) {
            // @ts-ignore
            if (!err?.response) {
                setError('No server response');
                // @ts-ignore
            } else if (err.response?.status === 400) {
                setError('Missing Username or Password');
                // @ts-ignore
            } else if (err.response?.status === 400) {
                setError('Unauthorized');
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
                                            error={!!errors.login}
                                            helperText={errors.login ? errors.login?.message : ''}
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

                            <FormControlLabel
                                control={<Checkbox value="remember"
                                                   color="primary"/>}
                                label="Remember me"
                            />
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
                    <Copyright sx={{mt: 8}}/>
                </Container>
                <PopUp variant={'signIn'}/>
                <Footer/>
            </Box>
        </ThemeProvider>
    );
}
