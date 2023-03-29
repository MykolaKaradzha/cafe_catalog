import React, {useContext, useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {CafeCard} from '../CafeCard';
import {Header} from '../Header';
import {Container} from '@mui/material';
import {CafeContext} from '../CafeContext';
import moviesFromServer from '../../api/movies.json'
import {Movie} from '../../types/Movie';



export const Catalog: React.FC = () => {
    // @ts-ignore
    const {cafes} = useContext(CafeContext);
    console.log(cafes);
    // const [cafes] = useState(moviesFromServer)
    return (
        <>
            <Header/>
            <Container maxWidth="lg">
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={{xs: 2, md: 3}}
                          columns={{xs: 4, sm: 8, md: 12}}>
                        {cafes.map((cafe: Movie, index: number) => (
                            <Grid item xs={2} sm={4} md={4} key={index}>
                                <CafeCard cafe={cafe}/>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </>
    )
};

