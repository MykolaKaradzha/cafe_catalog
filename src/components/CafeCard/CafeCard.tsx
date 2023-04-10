import React, {useContext} from 'react';

import {
    Box, Button,
    Card,
    CardActions,
    CardContent,
    CardMedia, Chip, Divider, IconButton, Stack,
    Typography
} from '@mui/material';
import FavoriteBorderRoundedIcon
    from '@mui/icons-material/FavoriteBorderRounded';
import {useNavigate} from "react-router-dom";
import {Cafe} from '../../types/Cafe';
import {CafeContext} from '../../context/CafeContext';


type Props = {
    cafe: Cafe,
};

export const CafeCard: React.FC<Props> = ({ cafe }) => {
    const {isAuth, cafes} = useContext(CafeContext);
    const navigate = useNavigate();

    const handleDetailButton = () => {
        navigate(`/${cafe.id}`)
    };


    return (
        <Card raised sx={{
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}
        >
            <Box sx={{p: 2}}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    minHeight: 50,
                    textAlign: 'center',
                }}>
                    <Typography
                        variant="h6"
                    >
                        {cafe.name}
                    </Typography>
                    <IconButton
                        color="primary"
                        disabled={!isAuth}
                    >
                        <FavoriteBorderRoundedIcon/>
                    </IconButton>
                </Box>
                <CardMedia
                    component="img"
                    image={cafe.logoLink}
                    alt="Cafe logo"
                    sx={{border: 'solid'}}
                >
                </CardMedia>
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        my: 2,
                        display: 'flex',
                        justifyContent: 'center'
                }}
                >
                    <Chip label={cafe.priceLevel} />
                    {cafe.optionNames.includes('vegan') &&
                      <Chip label={`Vegan friendly`} />}
                    <Chip
                        label={
                        cafe.optionNames.includes('alcohol')
                            ? 'Alcohol'
                            : 'No alcohol'
                    }
                    />
                </Stack>

                <Divider />

                <CardContent sx={{my: 2}}>
                    <Stack spacing={1}
                           sx={{mb: 3}}
                    >
                        <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign='left'
                    >
                        <b>Location:</b> {cafe.address}
                    </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            textAlign='left'
                        >
                            <b>Hours of Work:</b> {cafe.hours}
                        </Typography></Stack>
                    <Typography
                        variant="body2"
                        color="text.main"
                        textAlign='center'
                    >
                        {cafe.shortDescription}
                    </Typography>
                </CardContent>

                <Divider />
            </Box>
            <CardActions>
                <Button
                    size='large'
                    variant='contained'
                    onClick={handleDetailButton}
                    sx={{m: '16px auto'}}
                >
                    Details
                </Button>
            </CardActions>
        </Card>
    )
};
