import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const handleToggleDrawer = (open: boolean) => {
        setDrawerOpen(open);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        setDrawerOpen(false);
    };

    const  handleLogOut = ()=>{
        localStorage.removeItem("token")
        alert("Çıkış Yapıldı.")
        navigate("/login")
    }

    return (
        <>
            {/* AppBar (Üst Menü) */}
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => handleToggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Çalışan Yönetim Sistemi
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Drawer (Yan Menü) */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => handleToggleDrawer(false)}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={() => handleToggleDrawer(false)}
                    onKeyDown={() => handleToggleDrawer(false)}
                >
                    <List>
                        {/* Ana Sayfa */}
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleNavigation('/')}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Ana Sayfa" />
                            </ListItemButton>
                        </ListItem>


                        {/* Çalışanlar */}
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleNavigation('/employees')}>
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Çalışanlar" />
                            </ListItemButton>
                        </ListItem>


                        {/* Kullanıcılar */}
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleNavigation('/users')}>
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Kullanıcılar" />
                            </ListItemButton>
                        </ListItem>
                        {/* Çıkış */}
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleLogOut()}>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Çıkış" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Navbar;