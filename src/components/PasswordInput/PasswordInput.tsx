import {
    FormControl, IconButton, InputAdornment,
    InputLabel,
} from '@mui/material';
import React from 'react';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {Control, Controller, FieldError} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import {IFormInputsLogin} from '../../Pages/SignIn';
import {IFormInputsRegister} from '../../Pages/SignUp';

type Props = {
    name?: "password" | "email" | "username" | "repeatedPassword";
    label?: string;
    id?: string;
    error: FieldError | undefined;
    control: Control<IFormInputsRegister | IFormInputsLogin, any>;
}

export const PasswordInput: React.FC<Props> = ({error, control, label, id, name}) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
            <Controller
                render={
                    ({field}) =>
                        <TextField
                            {...field}
                            fullWidth
                            margin="normal"
                            label={label ? label : 'Password'}
                            type={showPassword ? 'text' : 'password'}
                            id={id ? id : 'password'}
                            autoComplete="current-password"
                            error={!!error}
                            helperText={error ? error?.message : ''}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {
                                                showPassword
                                                    ? <VisibilityOff/>
                                                    : <Visibility/>
                                            }
                                        </IconButton>
                                    </InputAdornment>
                            }}
                        />
                }
                control={control}
                name={name ? name : 'password'}
                defaultValue={''}
            />
    )
}
