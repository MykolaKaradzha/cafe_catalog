import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FavoriteBorderRoundedIcon
    from '@mui/icons-material/FavoriteBorderRounded';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import {useContext} from 'react';
import {CafeContext} from '../CafeContext';
import {Link, useLocation} from "react-router-dom";
import {HeaderAvatarMenu} from '../HeaderAvatarMenu';

const settings = ['Logout', 'Home', 'My List'];


export const Header = () => {
    const params = useLocation();
    const currentPath = params.pathname;

    const {
        drawerWidth,
        isSidebarOpen,
        getSideBarStatus
    } = useContext(CafeContext);

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleDrawerToggle = () => {
        getSideBarStatus(!isSidebarOpen);
        console.log('clicked')
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (


        <AppBar
            position="sticky"
            sx={{
                mb: 2,
                width: {md: `calc(100% - ${drawerWidth}px)`},
                ml: {md: `${drawerWidth}px`},
            }}
        >
            <Toolbar>
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
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: {xs: 'block', md: 'none'},
                        }}
                    >
                    </Menu>
                </Box>
                <LocalCafeIcon
                    sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}
                />

                <Typography
                    variant="h5"
                    noWrap
                    component={Link}
                    to={'/'}
                    sx={{
                        flexGrow: 1,
                        display: {xs: 'flex', md: 'none'},
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    MYCAFE
                </Typography>

                <Box sx={{display: {xs: 'none', md: 'flex'}, ml: 'auto'}}>

                        <Button
                            component={Link}
                            to={'/'}
                            onClick={handleCloseNavMenu}
                            sx={{
                                my: 2,
                                color: currentPath === '/' ? "yellow" : "white",
                                display: "flex",
                                alignItems: "center",
                                fontWeight: currentPath === '/' ? "bold" : "medium",
                            }}
                            startIcon={<HomeRoundedIcon/>}
                        >
                            Home
                        </Button>

                        <Button
                            component={Link}
                            to={'/'}
                            onClick={handleCloseNavMenu}
                            sx={{my: 2, color: 'white',}}
                            startIcon={<FavoriteBorderRoundedIcon/>}
                        >
                            My List
                        </Button>
                </Box>
                <HeaderAvatarMenu/>
            </Toolbar>
        </AppBar>
    );
}
