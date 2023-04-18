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
import {FILTERED, MY_LIST_URL, SORTED_BY} from '../../api/constants';
import {Loader} from '../../components/Loaders/Loader';
import {useAxiosPrivate} from '../../hooks/useAxiosPrivate';
import {useLocation, useNavigate} from 'react-router-dom';


export const MyList: React.FC = () => {
    const {
        favouriteCafes,
        setCurrentPageMyList,
        totalPagesMyList,
        currentPageMyList,
        setFavouriteCafes,
        sortOptionMyList,
        setTotalPagesMyList,
        setSortOptionMyList,
        addedToFavourite,
    } = useCafe();


    const [loading, setLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchSortedCafes = async () => {
            setLoading(true)

            try {
                const {data: favouriteCafes} = await axiosPrivate.get(sortingLink, {
                    signal: controller.signal
                });
                if (isMounted) {
                    console.log(favouriteCafes);
                    setLoading(false);
                    setFavouriteCafes(favouriteCafes);
                    setTotalPagesMyList(favouriteCafes[0].totalPages);
                }

            } catch (err) {
                console.log(err)
                setLoading(false);
                // navigate('/signin', {state: {from: location}, replace: true})
            }
        }

        let sortingLink = MY_LIST_URL;

        sortingLink += SORTED_BY(sortOptionMyList, currentPageMyList)
        fetchSortedCafes();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [sortOptionMyList, currentPageMyList, addedToFavourite])



    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100%',
                }}
            >
                <Header withSideBar={false}/>

                {loading
                    ? <Loader/>
                    : (favouriteCafes.length ? (<>
                                <Container
                                    maxWidth={favouriteCafes.length < 3 ? 'md' : 'lg'}
                                    component="main"
                                    sx={{
                                        flexGrow: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <SortSelector sortOption={sortOptionMyList}
                                                  setSortOption={setSortOptionMyList}/>
                                    <Grid
                                        container
                                        spacing={{sm: 2, md: 3}}
                                        rowSpacing={2}
                                        columns={{
                                            xs: 4,
                                            sm: 8,
                                            md: 12,
                                            lg: 12,
                                            xl: 12
                                        }}
                                        sx={{}}
                                    >
                                        {favouriteCafes.map((cafe: Cafe, index: number) => (
                                            <Grid
                                                item
                                                xs={4}
                                                sm={4}
                                                md={6}
                                                lg={favouriteCafes.length < 3 ? 6 : 4}
                                                key={index}>
                                                <CafeCard cafe={cafe}/>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Container>

                                <CustomPagination
                                    totalPages={totalPagesMyList}
                                    setPage={setCurrentPageMyList}
                                    currentPage={currentPageMyList}
                                />
                            </>)
                            : (
                                <Box
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexGrow: 1,
                                    }}
                                >
                                    <Typography
                                        variant={'h3'}
                                        sx={{
                                            fontFamily: 'monospace',
                                            fontWeight: 700,
                                            letterSpacing: '.3rem',
                                        }}
                                    >
                                        No Favourite Cafes Yet :(
                                    </Typography>
                                </Box>)
                    )
                }

                <Footer/>
            </Box>
        </>
    )
};

