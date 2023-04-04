import {
    Box,
    Container,
    IconButton,
    Paper,
    Typography
} from '@mui/material';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import {useNavigate} from "react-router-dom";
import * as React from 'react';
import {useContext} from 'react';
import {CafeContext} from '../CafeContext';

export const Footer: React.FC = () => {
    const navigate = useNavigate();
    const handleOnIconClick = () => navigate('/');

    return (
        <Paper
            sx={{
                width: '100%',
                flexShrink: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 5,
            }}
            component="footer"
            square variant="outlined"
        >
                <IconButton
                    sx={{color: 'black'}}
                    onClick={handleOnIconClick}
                >
                    <LocalCafeIcon/>
                </IconButton>

                <Typography variant="caption" color="initial">
                    Copyright ©2023 MYCAFE Limited
                </Typography>
        </Paper>
    );

}
