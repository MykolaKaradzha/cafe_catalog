import React from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Stack,
    Switch
} from '@mui/material';
import Typography from '@mui/material/Typography';
import {DiscreteSlider, MinimumDistanceSlider} from '../Sliders';
import {CustomRating} from '../CustomRating';
import {RadioFilter} from '../RadioFilter';

export const FilterForm: React.FC = () => {
    const priceOptions = ['$', '$$', '$$$'];
    const noiseOptions = ['Low', 'Middle', 'High'];

    return (
        <FormControl sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <Divider />
            <Stack
                direction='row'
                alignItems='baseline'
                justifyContent='space-between'
                sx={{
                    my: 1,
                    px: 1,
            }}
            >
                <Typography
                    sx={{fontWeight: 'bold'}}
                >
                    Filter by:
                </Typography>
                <Typography
                    variant="body2"
                    component={Button}
                    sx={{
                        color: '#29cccc',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                }}
                >
                    Reset Filters:
                </Typography>
            </Stack>
            <Divider />

            <Stack
                spacing={3}
                sx={{
                    mt: 2,
                    mx: 'auto',
                    width: '80%',
                    flexGrow: 1,
                }}
            >
                <Stack direction={'column'} spacing={1}>
                    <Typography
                        color="text.secondary"
                        textAlign={'left'}
                        sx={{
                            fontWeight: 'bold'
                        }}
                    >
                        Price
                    </Typography>
                    <RadioFilter options={priceOptions} />
                </Stack>

                <Stack direction={'column'} spacing={1}>
                    <Typography
                        color="text.secondary"
                        textAlign={'left'}
                        sx={{
                            fontWeight: 'bold'
                        }}
                    >
                        Noise
                    </Typography>
                    <RadioFilter options={noiseOptions} />
                </Stack>

                <Stack direction={'column'} spacing={1}>
                    <Typography
                        color="text.secondary"
                        textAlign={'left'}
                        sx={{
                            fontWeight: 'bold'
                        }}
                    >
                       Vegan Friendly
                    </Typography>

                    <Switch color="success" />
                </Stack>

                <Stack direction={'column'} spacing={1}>
                    <Typography
                        color="text.secondary"
                        textAlign={'left'}
                        sx={{
                            fontWeight: 'bold'
                        }}
                    >
                        Alcohol Available
                    </Typography>

                    <Switch defaultChecked color="secondary" />
                </Stack>

                <Stack direction={'column'} spacing={1}>
                    <Typography
                        color="text.secondary"
                        textAlign={'left'}
                        sx={{
                            fontWeight: 'bold'
                        }}
                    >
                        Minimum Order
                    </Typography>

                    <DiscreteSlider />
                </Stack>

                <Stack direction={'column'} spacing={1}>
                    <Typography
                        color="text.secondary"
                        textAlign={'left'}
                        sx={{
                            fontWeight: 'bold'
                        }}
                    >
                        Working Time
                    </Typography>

                    <MinimumDistanceSlider />
                </Stack>

                <Stack direction={'column'} spacing={1}>
                    <Typography
                        color="text.secondary"
                        textAlign={'left'}
                        sx={{
                            fontWeight: 'bold'
                        }}
                    >
                        Minimum Rating
                    </Typography>

                    <CustomRating isAuth={true} />
                </Stack>
            </Stack>

            <Button
                variant={'contained'}
                color={'success'}
                sx={{
                    width: '80%',
                    mx: 'auto',
                    my: 3,
                }}
            >
                Done
            </Button>
        </FormControl>
    )
};
