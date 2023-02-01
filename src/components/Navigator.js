import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/features/authSlice";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import { AddBoxOutlined, Dashboard, HomeOutlined, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 'Details',
    children: [
      {
        id: 'Home',
        icon: <HomeIcon/>,
        path:"/pembejeoApp",
        active: true,
      },
      { id: 'Mkulima Dashboard', icon: <Dashboard />, path:"userdashboard"},
      { id: 'Weka oda ', icon: <AddBoxOutlined/>, path:"oders" },
      { id: 'Station Dashboard', icon: <HomeOutlined />, path:"supplierDasbord"},
      // { id: 'Functions', icon: <SettingsEthernetIcon /> },
    ],
  }
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { ...other } = props;
  const user = useSelector(selectCurrentUser);
  console.log(user);
  const navigate = useNavigate()
  
  const navigator = user.type === "agent" ? (
    <Box sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>Details</ListItemText>
            </ListItem>
              <ListItem disablePadding>
                <ListItemButton sx={item} onClick={() => {navigate("/pembejeoApp")}}>
                  <ListItemIcon><HomeIcon/></ListItemIcon>
                  <ListItemText>Home</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding >
                <ListItemButton sx={item} onClick={() => {navigate("supplierDasbord")}}>
                  <ListItemIcon><HomeOutlined /></ListItemIcon>
                  <ListItemText>Station Dashboard</ListItemText>
                </ListItemButton>
              </ListItem>
              <Divider sx={{ mt: 2 }} />
          </Box> 
  ):(
     <Box sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>Home</ListItemText>
            </ListItem>
              <ListItem disablePadding>
                <ListItemButton  sx={item} onClick={() => {navigate("/pembejeoApp")}}>
                  <ListItemIcon><HomeIcon/></ListItemIcon>
                  <ListItemText>Home</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton  sx={item} onClick={() => {navigate("userdashboard")}}>
                  <ListItemIcon><Dashboard /></ListItemIcon>
                  <ListItemText>Mkulima Dashboard</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton sx={item} onClick={() => {navigate("oders")}}>
                  <ListItemIcon><AddBoxOutlined/></ListItemIcon>
                  <ListItemText>Weka oda</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton sx={item} onClick={() => {navigate("cart")}}>
                  <ListItemIcon><ShoppingCart/></ListItemIcon>
                  <ListItemText>Cart</ListItemText>
                </ListItemButton>
              </ListItem>
              
              <Divider sx={{ mt: 2 }} />
          </Box> 
  )

  return (
    <Drawer variant="permanent" {...other} >
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>PembejeoApp</ListItemText>
        </ListItem>
        {navigator}
        {/* {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, path }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton selected={active} sx={item} onClick={() => {navigate(path)}}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{ mt: 2 }} />
          </Box>
        ))} */}
      </List>
    </Drawer>
  );
}
