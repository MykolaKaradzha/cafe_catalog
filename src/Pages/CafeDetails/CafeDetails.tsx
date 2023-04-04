import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import {Chip, Container, Divider, IconButton, Stack} from '@mui/material';
import {CafeContext} from '../../components/CafeContext';

import Typography from '@mui/material/Typography';
import {ImageCarousel} from '../../components/ImageCarousel';
import {CustomRating} from '../../components/CustomRating';
import FavoriteBorderRoundedIcon
    from '@mui/icons-material/FavoriteBorderRounded';
import {Header} from '../../components/Header';
import {Footer} from '../../components/Footer';
import {CommentCard} from '../../components/Comments/CommentCard/CommentCard';
import {CommentBox} from '../../components/Comments/CommentBox';




export const CafeDetails: React.FC = () => {
    const {currentCafe, isAuth, footerHeight} = useContext(CafeContext);

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

                    <ImageCarousel />

                    <Box sx={{
                        mx: 3,
                        my: 3,
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
                            <Chip label={currentCafe.priceLevel} />
                            {currentCafe.veganOption &&
                              <Chip label={`Vegan friendly`} />}
                            <Chip label={currentCafe.alcohol ? 'Alcohol' : 'No alcohol'} />
                            <Chip label={`Noise level: ${currentCafe.noiseLevel}`} />
                        </Box>
                        <CustomRating isAuth={isAuth}/>
                    </Box>
                    <Typography
                        color="text.main"
                        sx={{
                            mx: 3,
                            mb: 5
                        }}
                    >
                        {currentCafe.description}
                    </Typography>

                <Stack spacing={3}>
                    <CommentCard/>
                    <CommentCard/>
                    <CommentCard/>
                </Stack>
                {isAuth && <CommentBox />}
            </Container>
            <Footer />
        </Box>
    )
};

