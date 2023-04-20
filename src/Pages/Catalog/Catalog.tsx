import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {CafeCard} from '../../components/CafeCard';
import {Header} from '../../components/Header';
import {
    Container, Typography,
} from '@mui/material';
import {Sidebar} from '../../components/Sidebar';
import {Cafe} from '../../types/Cafe';
import {Footer} from '../../components/Footer';
import {SortSelector} from '../../components/SortSelector';
import {CustomPagination} from '../../components/CustomPagination';
import {useCafe} from '../../hooks/useCafe';
import {CAFES_URL, FILTERED, SORTED_BY} from '../../api/constants';
import {Loader} from '../../components/Loaders/Loader';
import {axiosDefault} from '../../api/fetchClient';
import {Spacer} from '../../components/Spacer';


export const Catalog: React.FC = () => {
    const {
        drawerWidth,
        setCurrentPageCatalog,
        totalPagesCatalog,
        currentPageCatalog,
        sortOptionCatalog,
        filterOptionsCatalog,
        setTotalPagesCatalog,
        setSortOptionCatalog,
        addedToFavourite,
    } = useCafe();
    let sortingLink = CAFES_URL;

    const [cafes, setCafes] = useState<Cafe[]>([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        let isMounted = true
        const controller = new AbortController();

        const fetchSortedCafes = async () => {
            setLoading(true)

            try {
                const {data: sortedCafes} = await axiosDefault.get(sortingLink, {
                    signal: controller.signal
                });
                if (isMounted) {
                    setLoading(false);
                    setCafes(sortedCafes);
                    setTotalPagesCatalog(sortedCafes[0].totalPages);
                }

            } catch (err) {
                setLoading(false);
            }
        }

        sortingLink += SORTED_BY(sortOptionCatalog, currentPageCatalog) + FILTERED(filterOptionsCatalog)
        fetchSortedCafes();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [sortOptionCatalog, currentPageCatalog, filterOptionsCatalog])

    return (
        <>
            <Sidebar />
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

                {loading
                    ? <Loader/>
                    : (cafes.length
                        ? (<>
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
                            <SortSelector sortOption={sortOptionCatalog} setSortOption={setSortOptionCatalog} />

                            <Grid
                                container
                                spacing={{sm: 2, md: 3}}
                                rowSpacing={2}
                                columns={{xs: 4, sm: 8, md: 12, lg: 12, xl: 12}}
                                sx={{}}
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

                        <CustomPagination
                            totalPages={totalPagesCatalog}
                            setPage={setCurrentPageCatalog}
                            currentPage={currentPageCatalog}
                        />
                    </>)
                            : <Spacer text={'No Such Cafes Found :('}/>
                    )}

                <Footer/>
            </Box>
        </>
    )
};

