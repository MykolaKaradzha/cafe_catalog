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
import {styled} from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FavoriteBorderRoundedIcon
    from '@mui/icons-material/FavoriteBorderRounded';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import {Link, useLocation} from "react-router-dom";
import {HeaderAvatarMenu} from '../HeaderAvatarMenu';

const settings = ['Logout', 'Home', 'My List'];


export const HeaderWithoutSideBar = () => {
    const params = useLocation();
    const currentPath = params.pathname;


    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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
            }}
        >
            <Toolbar>
                <LocalCafeIcon
                    sx={{
                        display: {xs: 'none', md: 'flex'},
                        mr: 1,
                    }}
                />
                <Typography
                    variant="h5"
                    noWrap
                    component={Link}
                    to={'/'}
                    sx={{
                        mr: 2,
                        display: {xs: 'none', md: 'flex'},
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    MYCAFE
                </Typography>


                <LocalCafeIcon
                    sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}
                />
                <Typography
                    variant="h5"
                    noWrap
                    component={Link}
                    to={'/'}
                    sx={{
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
                            sx={{my: 2, color: 'white'}}
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
