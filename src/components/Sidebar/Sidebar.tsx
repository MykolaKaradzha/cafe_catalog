import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import {useContext} from 'react';
import {CafeContext} from '../CafeContext';
import CancelIcon from '@mui/icons-material/Cancel';


export const Sidebar = () => {
    // @ts-ignore
    const {drawerWidth, isSidebarOpen, getSideBarStatus} = useContext(CafeContext);

    const handleDrawerToggle = () => {
        getSideBarStatus(!isSidebarOpen);
    };

    const drawer = (
        <>
            <Toolbar sx={{mt: 0.5}}>
                <LocalCafeIcon sx={{mx: 2}}/>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 'auto',
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    MYCAFE
                </Typography>
                <CancelIcon
                    onClick={handleDrawerToggle}
                    sx={{
                        mr: 2,
                        display: {xs: 'flex', md: 'none'}
                    }}
                />
            </Toolbar>
            <Divider/>
        </>
    );

    return (
        <Box sx={{display: 'flex'}}>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
                            width: drawerWidth
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
        </Box>
    );
}
