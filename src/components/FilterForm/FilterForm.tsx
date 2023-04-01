import React from 'react';
import {
    Box,
    Button,
    Stack
} from '@mui/material';
import Typography from '@mui/material/Typography';

export const FilterForm: React.FC = () => {
    const filters = [
        'distance',
        'price',
        'tables',
        'minimum order',
        'working now',
        'noise level',
        'vegan friendly',
        'alcohol available',
        'coffee available']
    return (
        <Box sx={{mt: 5, mb: 3}}>
            <Typography
                textAlign="center"
                variant="h6"
                sx={{fontWeight: 'bold'}}
            >
                Available Filters:
            </Typography>

            <Stack
                spacing={3}
                direction={'column'}
                alignItems={'center'}
                sx={{mt: 4}}
            >
                {filters.map(filter => (
                    <Button
                        key={filter}
                        variant='contained'
                        sx={{width: '70%', height: 50}}
                    >
                        {filter}
                    </Button>
                ))}
            </Stack>
        </Box>
    )
};
