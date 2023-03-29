import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {CafeCard} from '../CafeCard';
import {Header} from '../Header';
import {Container} from '@mui/material';
import {CafeContext} from '../CafeContext';
import {Movie} from '../../types/Movie';
import {Sidebar} from '../Sidebar';



export const Catalog: React.FC = () => {
    // @ts-ignore
    const {cafes, drawerWidth} = useContext(CafeContext);
    return (
        <>
            <Header />
            <Sidebar />
            <Container maxWidth="xl">
                <Box sx={{flexGrow: 1}}>
                    <Grid container
                          spacing={{md: 3}}
                          rowSpacing={2}
                          columns={{xs: 4, sm: 8, md: 12, lg: 12, xl: 12}}
                          sx={{
                              width: {md: `calc(100% - ${drawerWidth - 24}px)`},
                              ml: {md: `${drawerWidth - 24}px`},
                          }}
                    >
                        {cafes.map((cafe: Movie, index: number) => (
                            <Grid item xs={4} sm={4} md={6} lg={4} xl={3} key={index}>
                                <CafeCard cafe={cafe}/>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </>
    )
};

