import {Typography} from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

type Props = {
    text: string;
}

export const Spacer: React.FC<Props> = ({ text }) => (
    <Box
        sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
        }}
    >
        <Typography
            variant={'h3'}
            sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                textAlign:'center',
            }}
        >
            {text}
        </Typography>
    </Box>
)
