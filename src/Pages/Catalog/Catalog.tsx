import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {CafeCard} from '../../components/CafeCard';
import {Header} from '../../components/Header';
import {Container, Pagination} from '@mui/material';
import {CafeContext} from '../../components/CafeContext';
import {Sidebar} from '../../components/Sidebar';
import {Cafe} from '../../types/Cafe';

export const Catalog: React.FC = () => {
    const {cafes, drawerWidth} = useContext(CafeContext);
    return (
        <>
            <Header />
            <Sidebar />
            <Container maxWidth="xl" sx={{pl: {md: 0}}}>
                <Box sx={{flexGrow: 1}}>
                    <Grid container
                          spacing={{sm: 2, md: 3}}
                          rowSpacing={2}
                          columns={{xs: 4, sm: 8, md: 12, lg: 12, xl: 12}}
                          sx={{
                              maxWidth: {md: `calc(100% - ${drawerWidth}px)`},
                              ml: {md: `${drawerWidth}px`},
                          }}
                    >
                        {cafes.map((cafe: Cafe, index: number) => (
                            <Grid item xs={4} sm={4} md={6} lg={4} xl={3} key={index}>
                                <CafeCard cafe={cafe}/>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                    <Pagination
                        count={10}
                        color="secondary"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            my: 3,
                            mx: 'auto'
                    }}
                    />
            </Container>
        </>
    )
};

