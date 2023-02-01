import * as React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Navigator from './Navigator';
import Content from '../pages/Content';
import Header from './Header';
import sideImage from '../utils/dash_logo.jpg'


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        PembejeoApp
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const drawerWidth = 256;

function Layout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  // const isSmUp = useMediaQuery(theme.breakpoints('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {isSmUp ? null : (
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        )}

        <Navigator
          PaperProps={{ style: { width: drawerWidth } }}
          sx={{ display: { sm: 'block', xs: 'none' } }}
        />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box>
          <Header onDrawerToggle={handleDrawerToggle} />
        </Box>
        <Box component="main" sx={{
          flex: 1, py: 6, px: 4,
        }}>
          <Outlet />
        </Box>
        <Box component="footer" sx={{ p: 2, backgroundImage: 'url(https://www.bing.com/images/search?view=detailV2&ccid=TGJ62zy0&id=7475A793C8CAC92B6016687F9CEFC6014C85964C&thid=OIP.TGJ62zy0zY3ZhTRNqGBIzQHaFj&mediaurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.4c627adb3cb4cd8dd985344da86048cd%3frik%3dTJaFTAHG75x%252faA%26riu%3dhttp%253a%252f%252fvalleysoil.com%252fwp-content%252fuploads%252f2012%252f05%252fagriculture.jpg%26ehk%3dd%252bxd7ukv0tHdN8OSzYcoJChPM61rm02w6fBR%252bp4otcQ%253d%26risl%3d%26pid%3dImgRaw%26r%3d0&exph=768&expw=1024&q=agriculture&simid=608026168308672933&FORM=IRPRST&ck=40494EB16D81420136A1024EE6DE0288&selectedIndex=31)' }}>
          <Copyright />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout