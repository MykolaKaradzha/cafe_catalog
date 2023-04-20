import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {
    Chip,
    Container,
    Divider, IconButton,
    Link,
    Stack
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Typography from '@mui/material/Typography';
import {ImageCarousel} from '../../components/ImageCarousel';
import {CustomRating} from '../../components/CustomRating';

import {Header} from '../../components/Header';
import {Footer} from '../../components/Footer';
import {CommentCard} from '../../components/Comments/CommentCard/CommentCard';
import {CommentAddBox} from '../../components/Comments/CommentAddBox';
import {useParams} from 'react-router';
import {Cafe} from '../../types/Cafe';
import {CAFE, MY_LIST_URL} from '../../api/constants';
import {useCafe} from '../../hooks/useCafe';
import {Loader} from '../../components/Loaders/Loader';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderRoundedIcon
    from '@mui/icons-material/FavoriteBorderRounded';
import {useAxiosPrivate} from '../../hooks/useAxiosPrivate';

const StyledNote = (props: any) => (
    <Typography
        variant="body2"
        color="text.secondary"
        textAlign='left'
    >
        {props.children}
    </Typography>
)

export const CafeDetails: React.FC = () => {
    const {
        authData,
        addedComment,
        favouriteCafes,
        setFavouriteCafes,
        setAddedToFavourite,
        addedToFavourite
    } = useCafe();
    const {id} = useParams();
    const [currentCafe, setCurrentCafe] = useState<Cafe>();
    const [isFavourite, setFavourite] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchCafe = async () => {
            if (!id) {
                return;
            }

            const {data} = await axios.get(CAFE(id));

            setCurrentCafe(data);
        }

        fetchCafe()
    }, [addedComment])

    useEffect(() => setFavourite(
        favouriteCafes.some((favCafe: Cafe) => favCafe.id === currentCafe?.id)), [currentCafe]);

    if (!currentCafe) {
        return <Loader/>
    }

    const toggleFavourite = async () => {
        if (isFavourite) {
            await axiosPrivate.post(
                `${MY_LIST_URL}/favourite/remove?cafeId=${currentCafe.id}`);
            console.log('removed to favourites')
            setFavourite(false);
            setAddedToFavourite(!addedToFavourite)
            // @ts-ignore
            setFavouriteCafes((prevState: Cafe[]) => prevState.filter(
                item => item.id !== currentCafe.id));
        } else {
            await axiosPrivate.post(
                `${MY_LIST_URL}/favourite?cafeId=${currentCafe.id}`);
            console.log('added to favourites')
            setFavourite(true);
            setAddedToFavourite(!addedToFavourite)
            // @ts-ignore
            setFavouriteCafes((prevState: Cafe[]) => prevState.concat(currentCafe));
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100%',
        }}>
            <Header withSideBar={false}/>
            <Container
                maxWidth="lg"
                component="main"
                sx={{
                    flexGrow: 1
                }}
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    minHeight: 70,
                }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                        }}
                    >
                        {currentCafe.name}
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

                <ImageCarousel images={currentCafe.imageLink}
                               logoLink={currentCafe.logoLink}/>

                <Box sx={{
                    mx: 3,
                    my: 2,
                    display: 'flex',
                    justifyContent: {xs: 'center', sm: 'space-between'},
                    alignItems: 'center',
                    flexDirection: {xs: 'column', sm: 'row'}
                }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            gap: 1,
                        }}>
                        <Chip label={currentCafe.priceLevel}/>
                        {currentCafe.optionNames.includes('vegan') &&
                          <Chip label={`Vegan friendly`}/>}
                        <Chip
                            label={currentCafe.optionNames.includes('alcohol') ? 'Alcohol available' : 'No alcohol'}/>
                        <Chip label={`Noise level: ${currentCafe.noiseLevel}`}/>
                        {currentCafe.optionNames.includes('event room') &&
                          <Chip label={`Event room available`}/>}

                    </Box>
                    <CustomRating editable={false} rating={currentCafe.rating}/>
                </Box>

                <Divider/>

                <Stack spacing={1}
                       sx={{my: 2}}
                >
                    <StyledNote>
                        <b>Location: </b>{currentCafe.address}
                    </StyledNote>

                    <StyledNote>
                        <b>Hours of Work: </b>{currentCafe.hours}
                    </StyledNote>

                    <StyledNote>
                        <b>Minimum order: </b>{currentCafe.minOrder}
                    </StyledNote>

                    <StyledNote>
                        <b>Tables number: </b>{currentCafe.tablesNumber}
                    </StyledNote>

                    {currentCafe.websiteLink && <StyledNote>
                      <b>Website: </b>
                      <Link
                        href={`${currentCafe.websiteLink}`}>{currentCafe.websiteLink}
                      </Link>
                    </StyledNote>}

                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <StyledNote>
                            <b>Social media:</b>
                        </StyledNote>

                        {currentCafe.facebookLink && (
                            <Link href={`${currentCafe.facebookLink}`}>
                                <FacebookIcon/>
                            </Link>)}

                        {currentCafe.instagramLink && (
                            <Link href={`${currentCafe.instagramLink}`}>
                                <InstagramIcon/>
                            </Link>)}
                    </Stack>

                </Stack>

                <Divider/>

                <Typography
                    color="text.main"
                    sx={{
                        mt: 2,
                        mb: 2
                    }}
                >
                    {currentCafe.description}
                </Typography>

                <Divider/>

                <Stack spacing={3} sx={{mt: 2}}>
                    {!!currentCafe.comments.length && currentCafe.comments.map(comment => (
                        <CommentCard comment={comment} key={comment.id}/>
                    ))}

                </Stack>
                {authData && <CommentAddBox cafeId={currentCafe.id}/>}
            </Container>
            <Footer/>
        </Box>
    )
};

