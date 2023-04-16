import React from 'react';
import {Box, CircularProgress} from '@mui/material';


export const Loader: React.FC = () => (
    <Box sx={{
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <CircularProgress
            size={'5rem'}
            thickness={4}
        />
    </Box>
);

