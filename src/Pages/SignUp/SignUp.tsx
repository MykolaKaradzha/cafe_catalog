import * as React from 'react';
import Avatar from '@mui/material/Avatar';
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
import {axiosDefault} from '../../api/fetchClient';
import {LOGIN_URL, REGISTER_URL} from '../../api/constants';
import {PopUp} from '../../components/PopUp';
import {Alert, AlertTitle} from '@mui/material';
import {useCafe} from '../../hooks/useCafe';
import {LoaderButton} from '../../components/Loaders/LoaderButton';
import {AxiosError} from 'axios';

const theme = createTheme();

type IFormInputs = {
    email: string;
    username: string;
    password: string;
    repeatedPassword: string;
}

const schema = yup.object().shape({
    email: yup.string().email('must be a valid email').required(),
    repeatedPassword: yup.string().oneOf([yup.ref('password')], 'passwords must match'),
    password: yup.string().min(8).max(24).required(),
    username: yup.string().required(),
})

export const SignUp: FC = () => {
    const {
        control,
        reset,
        handleSubmit,
        formState: {errors}
    } = useForm<IFormInputs>({resolver: yupResolver(schema)});
    const navigate = useNavigate();
    const {isPopUpOpen, setPopUpOpen, setAuthData} = useCafe();
    const [error, setError] = useState('');
    const [loading, setLoading] = React.useState(false);


    const handleOnSubmit = async (data: IFormInputs) => {
        try {
            setLoading(true);
            const response = await axiosDefault.post(REGISTER_URL,
                JSON.stringify({...data}),
            );
            setLoading(false);
            reset();
            setPopUpOpen(true);

            const loginResponse = await axiosDefault.post(LOGIN_URL,
                JSON.stringify({
                    username: data.username,
                    password: data.password,
                }),
            );
            setAuthData(loginResponse.data);

            setTimeout(() => {
                navigate('/');
                setPopUpOpen(false);
                setError('')
            }, 1000);
        } catch (err) {
            if (!(err instanceof AxiosError)) {return}
            setLoading(false);
            if (!err?.response) {
                setError('No server response')
            } else if (err.response) {
                setError(err.response.data.error)
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
                            Register
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
                                {(isPopUpOpen) && <Grid item xs={12}>
                                  <Alert
                                    severity="success"
                                    sx={{
                                        display: {xs: 'none', md: 'flex'},
                                        justifyContent: 'center'
                                    }}
                                  >
                                    <AlertTitle>Successfuly registered!</AlertTitle>
                                  </Alert>
                                </Grid>
                                }
                            </Grid>

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
                                Register
                            </LoaderButton>

                            <Grid container justifyContent="flex-start">
                                <Grid item>
                                    <Typography
                                        to='/signin'
                                        variant="body2"
                                        component={Link}
                                    >
                                        Already have an account? Login
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
                <PopUp variant={'signUp'}/>
                <Footer/>
            </Box>
        </ThemeProvider>
    );
}
