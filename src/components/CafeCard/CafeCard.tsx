import React, {useContext} from 'react';

import {
    Box, Button,
    Card,
    CardActions,
    CardContent,
    CardMedia, Chip, IconButton, Stack,
    Typography
} from '@mui/material';
import FavoriteBorderRoundedIcon
    from '@mui/icons-material/FavoriteBorderRounded';
import {CafeContext} from '../CafeContext';
import {Link, useNavigate} from "react-router-dom";
import {Cafe} from '../../types/Cafe';


type Props = {
    cafe: Cafe,
};

export const CafeCard: React.FC<Props> = ({ cafe }) => {
    const {selectCafe} = useContext(CafeContext);
    const navigate = useNavigate();

    const handleDetailButton = () => {
        selectCafe(cafe.id)
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
                    >
                        <FavoriteBorderRoundedIcon/>
                    </IconButton>
                </Box>
                <CardMedia
                    component="img"
                    image="https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"
                    alt="Film logo"
                >
                </CardMedia>
                <Stack direction="row" spacing={1} sx={{mt: 2}}>
                    <Chip label={cafe.priceLevel} />
                    {cafe.veganOption &&
                      <Chip label={`Vegan friendly`} />}
                    <Chip label={cafe.alcohol ? 'Alcohol' : 'No alcohol'} />
                </Stack>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {cafe.shortDescription}
                    </Typography>
                </CardContent>
            </Box>
            <CardActions>
                <Button
                    component={Link}
                    to={`/${cafe.id}`}
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
