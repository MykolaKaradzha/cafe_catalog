import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import {useContext} from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import {FilterForm} from '../FilterForm/FilterForm';
import {useNavigate} from "react-router-dom";
import {CafeContext} from '../../context/CafeContext';
import {IconButton} from '@mui/material';


export const Sidebar = () => {
    const {
        drawerWidth,
        isSidebarOpen,
        setSidebarOpen
    } = useContext(CafeContext);
    const navigate = useNavigate();

    const handleOnLogoClick = () => {
        navigate('/')
    }


    const handleDrawerToggle = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const drawer = (
        <>
            <Toolbar sx={{mt: 0.5}}>
                <IconButton onClick={handleOnLogoClick} sx={{mr: 'auto'}}>
                    <LocalCafeIcon sx={{mx: 1, color: 'black'}} />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'black',
                            textDecoration: 'none',
                        }}
                    >
                        MYCAFE
                    </Typography>
                </IconButton>


                <CancelIcon
                    onClick={handleDrawerToggle}
                    sx={{
                        mr: 2,
                        display: {xs: 'flex', md: 'none'}
                    }}
                />
            </Toolbar>

            <FilterForm />
        </>
    );

    return (
        <Box sx={{display: 'flex'}}>
            <Drawer
                variant="temporary"
                open={isSidebarOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: {xs: 'block', md: 'none'},
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: '100%'
                    },
                }}
            >
                {drawer}
            </Drawer>

            <Drawer
                variant="permanent"
                sx={{
                    display: {xs: 'none', md: 'block'},
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}
