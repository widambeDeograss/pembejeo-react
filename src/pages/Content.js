import * as React from 'react';
import AppBar from '@mui/material/AppBar';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import sideImage from '../utils/dash_logo.jpg'
import { Link } from '@mui/material';

export default function Content() {
  return (
    // <Box>
    <Box sx={{
      backgroundImage: `url(${sideImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor: (t) =>
        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      // height:'100vh',
    }}>
      {/* </Box> */}
      <Grid display="flex" >
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} sx={{ width: "50%"}}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
              ,  padding: '30px' 
            }}
          >
            <Typography component="h1" variant="h6" sx={{ paddingTop:"10px" }}>
              
              KWANINI UTUMIE PEMBEJEOAPP?<br/></Typography>
              
              <Typography variant="body2" > PembejeoApp inalenga kumrahisishia mkulima pamajo na msambazaj wa pembejeo kwani itawawezesha wakulma uweka oda zao za pembejeo za kilimo
              <br/><br/>  
             <Typography variant="h6" sx={{ paddingBottom:"20px" }}> <u>FAIDA ZA KUTUMIA PEMBEJEOAPP</u><br/></Typography>
                
             
                -Kuokoa muda ambao mkulima angetumia wenda kwa msambazaj<br/>
                -Kuokoa gharamaa kwa mkulima kusafiri mpaka kwa msambazaj<br/>
                -Kurahisha huduma ya upatikanaj wa pembejeo za kilimo<br/>
              </Typography>


          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} sx={{ width: "50%", textAlign: "centre" }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Typography variant='h6' sx={{ paddingTop: "20px" }}>
              AgroInputs-Ms
            </Typography>
            <Typography variant="body2" >
              AgroInputs-Ms Agriculture supplies management system
            </Typography>
            <Typography variant="body2" >
              we make it easy for famers to reach out the agro suppliers
            </Typography>

            <Typography variant='h6' align="center">
              Quick Links
            </Typography>
            <Link color="inherit" href="/signUp">
              make oders
            </Link>
            <br />
            <Link color="inherit" href="/">
              AgroInputs-Ms
            </Link>
            <br />

            <Typography variant='h6' align="center">
              Quick contacts
            </Typography>
            <Typography variant="body2" align="center">
              Email: mahaluKelvin5@gmail.com
            </Typography>
            <Typography variant="body2" align="center">
              Phone:0716058802
            </Typography>

          </Box>
        </Grid>
      </Grid>

    </Box>
  );
}
