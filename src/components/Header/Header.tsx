import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FavoriteBorderRoundedIcon
    from '@mui/icons-material/FavoriteBorderRounded';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {HeaderUserMenu} from '../HeaderUserMenu';
import {useCafe} from '../../hooks/useCafe';

type Props = {
    withSideBar: boolean
}

export const Header: React.FC<Props> = ({ withSideBar }) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();
    const {isSidebarOpen, setSidebarOpen} = useCafe();


    const handleDrawerToggle = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleOnHomeButtonClick = () => {
        navigate('/')
    };

    const handleOnMyListButtonClick = () => {
        navigate('/mylist')
    };




    return (


        <AppBar
            position="sticky"
            sx={{
                mb: 2,
            }}
        >
            <Toolbar>
                {withSideBar && (
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleDrawerToggle}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Box>
                )}
                <LocalCafeIcon
                    sx={{
                        display: withSideBar ? {xs: 'flex', md: 'none'} : 'flex',
                        mr: 1}}
                />

                <Typography
                    variant="h5"
                    noWrap
                    component={Link}
                    to={'/'}
                    sx={{
                        flexGrow: withSideBar ? 1 : 0,
                        display: withSideBar ? {xs: 'flex', md: 'none'} : 'flex',
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    MYCAFE
                </Typography>

                <Box
                    sx={{
                        display: {xs: 'none', md: 'flex'},
                        ml: 'auto'
                }}
                >
                        <Button
                            onClick={handleOnHomeButtonClick}
                            sx={{
                                my: 2,
                                color: currentPath === '/' ? "yellow" : "white",
                                fontWeight: currentPath === '/' ? "bold" : "medium",
                            }}
                            startIcon={<HomeRoundedIcon/>}
                        >
                            Home
                        </Button>

                        <Button
                            onClick={handleOnMyListButtonClick}
                            sx={{
                                my: 2,
                                color: currentPath === '/mylist' ? "yellow" : "white",
                                fontWeight: currentPath === '/mylist' ? "bold" : "medium",
                            }}
                            startIcon={<FavoriteBorderRoundedIcon/>}
                        >
                            My List
                        </Button>
                </Box>
                <HeaderUserMenu />
            </Toolbar>
        </AppBar>
    );
}
