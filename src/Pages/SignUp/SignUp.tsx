import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Link, useNavigate} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Header} from '../../components/Header';
import {Footer} from '../../components/Footer';
import {FC, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup';
import {axiosInstance} from '../../api/fetchClient';
import {REGISTER_URL} from '../../api/constants';
import {PopUp} from '../../components/PopUp';
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
    email: string;
    username: string;
    password: string;
    repeatedPassword: string;
}

const schema = yup.object().shape({
    email: yup.string().email('must be a valid email').required(),
    username: yup.string().required(),
    password: yup.string().min(8).max(24).required(),
    repeatedPassword: yup.string().oneOf([yup.ref('password')], 'passwords must match'),
})

export const SignUp: FC = () => {
    const {
        control,
        reset,
        handleSubmit,
        formState: {errors}
    } = useForm<IFormInputs>({resolver: yupResolver(schema)});
    const navigate = useNavigate();
    const {setPopUpOpen, setAuth} = useCafe();
    const [error, setError] = useState('');


    const handleOnSubmit = async (data: IFormInputs) => {
        console.log(data, errors)
        try {
            const response = await axiosInstance.post(REGISTER_URL,
                JSON.stringify({...data}),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.data.id);
            console.log(JSON.stringify(response));
            setAuth(true);
            reset();
            setPopUpOpen(true);
            setTimeout(() => navigate('/'), 3000)
        } catch (err) {
            // @ts-ignore
            if (!err?.response) {
                setError('No server response')
                // @ts-ignore
            } else if (err.response?.status === 409) {
                setError('Username is taken')
            } else {
                setError('Registration failed')
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100%',
            }}>
                <Header withSideBar={false}/>
                <Container
                    component="main"
                    maxWidth="xs"
                    sx={{flexGrow: 1}}>
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
                            Sign up
                        </Typography>
                        <Box component="form"
                             onSubmit={handleSubmit(handleOnSubmit)}
                             sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Controller
                                        render={
                                            ({field}) =>
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    id="username"
                                                    label={"Username"}
                                                    autoComplete="off"
                                                    error={!!errors.username}
                                                    helperText={errors.username ? errors.username?.message : ''}
                                                />}
                                        control={control}
                                        name={'username'}
                                        defaultValue={''}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Controller
                                        render={
                                            ({field}) =>
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    id="email"
                                                    label="Email Address"
                                                    autoComplete="email"
                                                    error={!!errors.email}
                                                    helperText={errors.email ? errors.email?.message : ''}
                                                />}
                                        control={control}
                                        name={'email'}
                                        defaultValue={''}
                                    />

                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        render={
                                            ({field}) =>
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label="Password"
                                                    type="password"
                                                    id="password"
                                                    autoComplete="new-password"
                                                    error={!!errors.password}
                                                    helperText={errors.password ? errors.password?.message : ''}
                                                />}
                                        control={control}
                                        name={'password'}
                                        defaultValue={''}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        render={
                                            ({field}) =>
                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                    label="Repeat Password"
                                                    type="password"
                                                    id="repeatedPassword"
                                                    autoComplete="off"
                                                    error={!!errors.repeatedPassword}
                                                    helperText={errors.repeatedPassword ? errors.repeatedPassword?.message : ''}
                                                />}
                                        control={control}
                                        name={'repeatedPassword'}
                                        defaultValue={''}
                                    />
                                </Grid>
                                {error && <Grid item xs={12}>
                                  <Alert
                                    severity="error"
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                  >
                                    <AlertTitle>{error}</AlertTitle>
                                  </Alert>
                                </Grid>}
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Typography
                                        to='/signin'
                                        variant="body2"
                                        component={Link}
                                    >
                                        Already have an account? Sign in
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{mt: 5}}/>
                </Container>
                <PopUp variant={'signUp'}/>
                <Footer/>
            </Box>
        </ThemeProvider>
    );
}
