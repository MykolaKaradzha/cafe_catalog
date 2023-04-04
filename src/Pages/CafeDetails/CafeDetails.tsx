import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import {Chip, Container, IconButton} from '@mui/material';
import {CafeContext} from '../../components/CafeContext';

import Typography from '@mui/material/Typography';
import {ImageCarousel} from '../../components/ImageCarousel';
import {CustomRating} from '../../components/CustomRating';
import FavoriteBorderRoundedIcon
    from '@mui/icons-material/FavoriteBorderRounded';
import {CommentBox} from '../../components/CommentBox';
import {Header} from '../../components/Header';
import {Footer} from '../../components/Footer';




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
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mx: 3,
                            mb: 5
                        }}
                    >
                        {currentCafe.description}
                    </Typography>
                {isAuth && <CommentBox/>}
            </Container>
            <Footer />
        </Box>
    )
};

