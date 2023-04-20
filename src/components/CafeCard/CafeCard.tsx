import React, {useEffect, useState} from 'react';

import {
    Box, Button, ButtonBase,
    Card,
    CardActions,
    CardContent,
    CardMedia, Chip, Divider, IconButton, Stack,
    Typography
} from '@mui/material';
import FavoriteBorderRoundedIcon
    from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useNavigate} from "react-router-dom";
import {Cafe} from '../../types/Cafe';
import {useCafe} from '../../hooks/useCafe';
import {MY_LIST_URL} from '../../api/constants';
import {useAxiosPrivate} from '../../hooks/useAxiosPrivate';

type Props = {
    cafe: Cafe,
};

export const CafeCard: React.FC<Props> = ({cafe}) => {
        const {
            authData,
            setFavouriteCafes,
            favouriteCafes,
            setAddedToFavourite,
            addedToFavourite
        } = useCafe();
        const navigate = useNavigate();
        const axiosPrivate = useAxiosPrivate();
        const [isFavourite, setFavourite] = useState(false);
        const isFavouriteCheck = favouriteCafes
            ? favouriteCafes.some((favCafe: Cafe) => favCafe.id === cafe.id)
            : authData?.favouritesId.includes(cafe.id);

        useEffect(() => {
            isFavouriteCheck && setFavourite(isFavouriteCheck);
        }, []);

        const toggleFavourite = async () => {
            if (isFavourite) {
                await axiosPrivate.post(
                    `${MY_LIST_URL}/favourite/remove?cafeId=${cafe.id}`);
                console.log('removed to favourites')
                setFavourite(false);
                setAddedToFavourite(!addedToFavourite)
                // @ts-ignore
                setFavouriteCafes((prevState: Cafe[]) => prevState.filter(
                    item => item.id !== cafe.id));
            } else {
                await axiosPrivate.post(
                    `${MY_LIST_URL}/favourite?cafeId=${cafe.id}`);
                console.log('added to favourites')
                setFavourite(true);
                setAddedToFavourite(!addedToFavourite)
                // @ts-ignore
                setFavouriteCafes((prevState: Cafe[]) => prevState.concat(cafe));
            }
        }

        const handleOpenCafe = () => {
            navigate(`/${cafe.id}`)
        };

        return (
            <Card
                raised
                sx={{
                    minHeight: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 1s',
                    borderRadius: '1.5rem',
                    "&:hover": {
                        transform: 'scale(1.05)',
                    }
                }}
            >
                <Box sx={{p: 2}} flexGrow={1}>
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
                            onClick={toggleFavourite}
                            color="primary"
                            disabled={!authData}
                        >
                            {
                                isFavourite
                                    ? <FavoriteIcon/>
                                    : <FavoriteBorderRoundedIcon/>
                            }
                        </IconButton>
                    </Box>
                    <ButtonBase
                        onClick={handleOpenCafe}
                    >
                        <CardMedia
                            component="img"
                            image={cafe.logoLink}
                            alt="Cafe logo"
                            sx={{border: 'solid'}}
                        >
                        </CardMedia>
                    </ButtonBase>
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            my: 2,
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Chip label={cafe.priceLevel}/>
                        {cafe.optionNames.includes('vegan') &&
                          <Chip label={`Vegan friendly`}/>}
                        <Chip
                            label={
                                cafe.optionNames.includes('alcohol')
                                    ? 'Alcohol'
                                    : 'No alcohol'
                            }
                        />
                    </Stack>

                    <CardContent sx={{mt: 2, mb: 'auto'}}>
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
                            </Typography>
                        </Stack>
                        <Typography
                            variant="body2"
                            color="text.main"
                            textAlign='center'
                        >
                            {cafe.shortDescription}
                        </Typography>
                    </CardContent>
                </Box>

                <Divider />

                <CardActions>
                    <Button
                        size='large'
                        variant='contained'
                        onClick={handleOpenCafe}
                        sx={{m: '16px auto'}}
                    >
                        Details
                    </Button>
                </CardActions>
            </Card>
        )
    }
;
