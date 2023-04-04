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
import {useNavigate} from "react-router-dom";
import {Cafe} from '../../types/Cafe';


type Props = {
    cafe: Cafe,
};

export const CafeCard: React.FC<Props> = ({ cafe }) => {
    const {selectCafe, isAuth} = useContext(CafeContext);
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
                        disabled={!isAuth}
                    >
                        <FavoriteBorderRoundedIcon/>
                    </IconButton>
                </Box>
                <CardMedia
                    component="img"
                    image="https://images2.imgbox.com/91/b8/QabTzcPk_o.jpeg"
                    alt="Cafe logo"
                >
                </CardMedia>
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        my: 3,
                        display: 'flex',
                        justifyContent: 'center'
                }}
                >
                    <Chip label={cafe.priceLevel} />
                    {cafe.veganOption &&
                      <Chip label={`Vegan friendly`} />}
                    <Chip label={cafe.alcohol ? 'Alcohol' : 'No alcohol'} />
                </Stack>
                <CardContent>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign='center'
                    >
                        {cafe.shortDescription}
                    </Typography>
                </CardContent>
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
