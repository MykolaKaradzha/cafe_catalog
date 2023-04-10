import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Header} from '../../components/Header';
import {Footer} from '../../components/Footer';
import {FC} from 'react';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup';


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

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{3, 23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

type IFormInputs = {
    email: string;
    username: string;
    password: string;
    repeatedPassword: string;
}

const schema = yup.object().shape({
    email: yup.string().email('must be a valid email').required(),
    username: yup.string().required(),
    password: yup.string().min(4).max(24).required(),
    repeatedPassword: yup.string().oneOf([yup.ref('password')], 'passwords must match'),
})

export const SignUp: FC = () => {

    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm<IFormInputs>({resolver: yupResolver(schema)});

    const handleOnSubmit = (data: IFormInputs) => {
        console.log(data, errors)
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
                                                    autoComplete="off"
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
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox
                                            value="allowExtraEmails"
                                            color="primary"/>}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid>
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
                <Footer/>
            </Box>
        </ThemeProvider>
    );
}
