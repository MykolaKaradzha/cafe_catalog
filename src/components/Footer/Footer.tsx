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
                backgroundColor: 'black'
            }}
            component="footer"
            square
            variant="outlined"
        >
                <IconButton
                    sx={{color: 'white'}}
                    onClick={handleOnIconClick}
                >
                    <LocalCafeIcon sx={{color: 'white', mr: 1}}/>
                    <Typography variant="caption">
                        Copyright ©2023 MYCAFE Limited
                    </Typography>
                </IconButton>
        </Paper>
    );

}
