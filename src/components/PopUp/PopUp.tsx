import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {FC} from 'react';
import {useCafe} from '../../hooks/useCafe';

type Props = {
    variant: 'signIn' | 'signUp';
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const PopUp: FC<Props> = ({ variant }) => {
    const {isPopUpOpen, setPopUpOpen} = useCafe();


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setPopUpOpen(false);
    };

    return (
            <Snackbar open={isPopUpOpen} autoHideDuration={6000} onClose={handleClose}>
                {variant === 'signIn'
                    ? <Alert
                        severity="success"
                        onClose={handleClose}
                        sx={{ width: '100%' }}
                    >Successfuly authorized!</Alert>
                    : <Alert
                        severity="success"
                        onClose={handleClose}
                        sx={{ width: '100%' }}
                    > Successfuly registered!</Alert>}
            </Snackbar>
    );
}
