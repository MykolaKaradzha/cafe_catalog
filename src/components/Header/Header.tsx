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
import {useContext} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {HeaderUserMenu} from '../HeaderUserMenu';
import { CafeContext } from '../../context/CafeContext';

type Props = {
    withSideBar: boolean
}

export const Header: React.FC<Props> = ({ withSideBar }) => {
    const params = useLocation();
    const currentPath = params.pathname;
    const navigate = useNavigate();

    const {
        isSidebarOpen,
        setSidebarOpen,
        isAuth,
    } = useContext(CafeContext);

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleDrawerToggle = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
        navigate('/')
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
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
                            onClick={handleCloseNavMenu}
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
                            onClick={handleCloseNavMenu}
                            sx={{my: 2, color: 'white',}}
                            startIcon={<FavoriteBorderRoundedIcon/>}
                            disabled={!isAuth}
                        >
                            My List
                        </Button>
                </Box>
                <HeaderUserMenu />
            </Toolbar>
        </AppBar>
    );
}
