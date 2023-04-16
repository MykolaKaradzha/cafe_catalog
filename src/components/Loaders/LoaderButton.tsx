import {green} from '@mui/material/colors';
import React from 'react';
import {Box, ButtonProps, CircularProgress} from '@mui/material';
import Button from '@mui/material/Button';

type Props = ButtonProps & {
    loading: boolean;
    success: boolean
    children: string;
}


export const LoaderButton: React.FC<Props> = ({
                                                  loading,
                                                  success,
                                                  ...restProps
                                              }) => {
    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    return (
        <Box sx={{
            position: 'relative'
        }}>
            <Button
                sx={buttonSx}
                disabled={loading}
                {...restProps}
            />
            {loading && (
                <CircularProgress
                    size={24}
                    sx={{
                        color: green[500],
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                    }}
                />
            )}
        </Box>
    )
};
