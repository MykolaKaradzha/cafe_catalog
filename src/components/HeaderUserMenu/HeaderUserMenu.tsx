import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";
import {useContext} from 'react';
import avatarNotAuth from '../../img/AvatarNotAuth.png';
import avatarAuth from '../../img/AvatarAuth.png';
import {CafeContext} from '../../context/CafeContext';
import {useWidth} from '../../utils/useWidth';
import {Stack} from '@mui/material';

export const HeaderUserMenu = () => {
    const {authData, setAuthData} = useContext(CafeContext);
    const width = useWidth();
    const authLinks = authData
        ? []
        : [
            {text: 'Login', path: '/signin'},
            {text: 'Register', path: '/signup'}
        ]


    const settings = (
        width === 'xs' || width === 'sm'
            ? [
                {text: 'Home', path: '/'},
                {text: 'My List', path: '/mylist'},
                ...authLinks
            ]
            : [...authLinks]
    );
    const avatarImg = !!authData ? avatarAuth : avatarNotAuth;

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogOut = () => {
        setAuthData(null);
    }

    return (
        <Box sx={{mr: 2, ml: 'auto'}}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <Stack alignItems={'center'}>
                        <Avatar alt="avatar img"
                                src={avatarImg}
                        />
                        <Typography
                            textAlign="center"
                            fontWeight={'bold'}
                            color={'white'}
                        >
                            {authData && authData.username}
                        </Typography>
                    </Stack>
                </IconButton>
            </Tooltip>

            <Menu
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >


                {settings.map((setting) => (
                    <MenuItem key={setting.text}
                              onClick={handleCloseUserMenu}>

                        <Typography
                            component={Link}
                            to={setting.path}
                            textAlign="center"
                            sx={{
                                textDecoration: 'none',
                                color: 'inherit',
                            }}
                        >
                            {setting.text}
                        </Typography>
                    </MenuItem>
                ))}
                {authData && (
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography
                            onClick={handleLogOut}
                            textAlign="center"
                            fontWeight={'bold'}
                        >
                            Log out
                        </Typography>
                    </MenuItem>
                )}
            </Menu>
        </Box>
    );
}
