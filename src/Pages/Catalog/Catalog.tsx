import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {CafeCard} from '../../components/CafeCard';
import {Header} from '../../components/Header';
import {
    Container,
    FormControl, InputLabel, MenuItem,
    Pagination, Select,
    Stack,
    Typography
} from '@mui/material';
import {Sidebar} from '../../components/Sidebar';
import {Cafe} from '../../types/Cafe';
import {Footer} from '../../components/Footer';
import {CafeContext} from '../../context/CafeContext';
import {SortSelector} from '../../components/SortSelector';
import {CustomPagination} from '../../components/CustomPagination';

export const Catalog: React.FC = () => {
    const {cafes, drawerWidth} = useContext(CafeContext);

    return (
        <>
            <Sidebar/>
            <Box
                sx={{
                    maxWidth: {md: `calc(100% - ${drawerWidth}px)`},
                    ml: {md: `${drawerWidth}px`},
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}
            >
                <Header withSideBar={true}/>
                <Container
                    maxWidth={cafes.length < 3 ? 'md' : 'lg'}
                    component="main"
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <SortSelector/>
                    <Grid
                        container
                        spacing={{sm: 2, md: 3}}
                        rowSpacing={2}
                        columns={{xs: 4, sm: 8, md: 12, lg: 12, xl: 12}}
                        sx={{

                        }}
                    >
                        {cafes.map((cafe: Cafe, index: number) => (
                            <Grid
                                item
                                xs={4}
                                sm={4}
                                md={6}
                                lg={cafes.length < 3 ? 6 : 4}
                                key={index}>
                                <CafeCard cafe={cafe}/>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <CustomPagination/>
                <Footer/>
            </Box>
        </>
    )
};

