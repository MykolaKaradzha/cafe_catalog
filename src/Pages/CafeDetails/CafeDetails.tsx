import React, {useContext, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {
    CardContent,
    Chip,
    Container,
    Divider,
    IconButton,
    Stack
} from '@mui/material';

import Typography from '@mui/material/Typography';
import {ImageCarousel} from '../../components/ImageCarousel';
import {CustomRating} from '../../components/CustomRating';
import FavoriteBorderRoundedIcon
    from '@mui/icons-material/FavoriteBorderRounded';
import {Header} from '../../components/Header';
import {Footer} from '../../components/Footer';
import {CommentCard} from '../../components/Comments/CommentCard/CommentCard';
import {CommentBox} from '../../components/Comments/CommentBox';
import {CafeContext} from '../../context/CafeContext';
import {useParams} from 'react-router';
import {Cafe} from '../../types/Cafe';
import {fetchData} from '../../utils/fetchClient';
import {CAFE} from '../../constants';


export const CafeDetails: React.FC = () => {
    const {isAuth} = useContext(CafeContext);
    const { id } = useParams();
    const [currentCafe, setCurrentCafe] = useState<Cafe>();

    const fetchCafe = async () => {
        if (!id) {
            return;
        }

        const { data } = await fetchData(CAFE(id));

        setCurrentCafe(data);
    }

    useEffect(() => {
        fetchCafe()
    }, [])


    if (!currentCafe) {
        return <div>No such cafe</div>
    };

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
                    >
                        {currentCafe.name}
                    </Typography>
                    <IconButton
                        color="primary"
                        disabled={!isAuth}
                    >
                        <FavoriteBorderRoundedIcon/>
                    </IconButton>
                </Box>

                <ImageCarousel images={currentCafe.imageLink}/>

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
                        {currentCafe.veganOption &&
                          <Chip label={`Vegan friendly`}/>}
                        <Chip
                            label={currentCafe.alcohol ? 'Alcohol available' : 'No alcohol'}/>
                        <Chip label={`Noise level: ${currentCafe.noiseLevel}`}/>
                        {currentCafe.eventRoom &&
                          <Chip label={`Event room available`}/>}

                    </Box>
                    <CustomRating isAuth={isAuth}/>
                </Box>

                <Divider />

                <Stack spacing={1}
                       sx={{my: 2}}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign='left'
                    >
                        <b>Location:</b> {currentCafe.address}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign='left'
                    >
                        <b>Hours of Work:</b> {currentCafe.hours}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign='left'
                    >
                        <b>Tables number:</b> {currentCafe.tablesNumber}
                    </Typography>
                </Stack>

                <Divider />

                <Typography
                    color="text.main"
                    sx={{
                        mt: 2,
                        mb: 2
                    }}
                >
                    {currentCafe.description}
                </Typography>

                <Divider />

                <Stack spacing={3} sx={{mt: 2}}>
                    <CommentCard/>
                    <CommentCard/>
                    <CommentCard/>
                </Stack>
                {isAuth && <CommentBox/>}
            </Container>
            <Footer/>
        </Box>
    )
};

