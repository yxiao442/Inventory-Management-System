import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import  Inventory from './Inventory/Inventory.jsx';
import  Sales from './Sales/Sales.jsx';
import  Purchase from './Purchase/Purchase.jsx';
import './Dashboard.css'
import { MdInventory } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa";
import { useNavigate,useLocation } from 'react-router-dom';
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const drawerWidth = 240;

function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [showInventory, setShowInventory] = useState(false);
    const [showSales, setShowSales] = useState(false);
    const [showPurchase, setShowPurchase] = useState(false);
    const [inventoryData, setInventoryData] = useState([]);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleInventory = () => {
        setShowInventory(true);
        setShowSales(false);
        setShowPurchase(false);
        window.history.pushState({}, '', '/dashboard/inventory');
    };
    const handleSales = () => {
        setShowSales(true);
        setShowInventory(false);
        setShowPurchase(false);
        window.history.pushState({}, '', '/dashboard/sales');


    };
    const handlePurchase = () => {
        setShowPurchase(true);
        setShowInventory(false);
        setShowSales(false);
        window.history.pushState({}, '', '/dashboard/purchases');
    };
    const getInventory = async (e)=>{
        try {
            const response = await fetch('http://localhost:18080/inventory');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setInventoryData(data);
            // console.log('Response from backend:', data);
        } catch (error) {
            console.error('Error fetching inventory data:', error);
        }
    };


    return (
        <Box>

        <AppBar position="fixed" sx={{ height: '70px' ,zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <h2 className="Name">Dashboard</h2>
            <Container maxWidth="xl">



                    <Box sx={{ flexGrow: 1 }} className="User">

                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu}  sx={{ position: 'fixed', top: -40, right: -150 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
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
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
            </Container>
        </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>

                        <ListItem key="Inventory" disablePadding>
                            <ListItemButton onClick={() => {
                                handleInventory();
                                getInventory();
                            }}>
                                <ListItemIcon>
                                    <MdInventory size={30}/>
                                </ListItemIcon>
                                <ListItemText primary="Inventory"/>
                            </ListItemButton>

                        </ListItem>
                        <ListItem key="Sales" disablePadding>
                            <ListItemButton onClick={() =>{
                                handleSales();
                                getInventory();
                            }}>
                                <ListItemIcon>
                                    <FaShoppingCart size={30}/>
                                </ListItemIcon>
                                <ListItemText primary="Sales"/>
                            </ListItemButton>

                        </ListItem>
                        <ListItem key="Purchases" disablePadding>
                            <ListItemButton onClick={() =>{
                                handlePurchase();
                                getInventory();
                            }}>
                                <ListItemIcon>
                                    <FaBagShopping size={30}/>
                                </ListItemIcon>
                                <ListItemText primary="Purchases"/>
                            </ListItemButton>

                        </ListItem>
                        <ListItem key="Reports" disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <FaChartBar  size={30}/>
                                </ListItemIcon>
                                <ListItemText primary="Reports"/>
                            </ListItemButton>

                        </ListItem>
                    </List>

                </Box>
            </Drawer>
            <Box className="BoxInventory">

                {showInventory && <Inventory data={inventoryData}/>}

            </Box>
            <Box className="BoxInventory">
                {showSales && <Sales data={inventoryData}/>}

            </Box>
            <Box className="BoxInventory">
                {showPurchase && <Purchase data={inventoryData}/>}

            </Box>


        </Box>




);
}
export default Dashboard;


