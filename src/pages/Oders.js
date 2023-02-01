import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Add, Minimize, Send } from '@mui/icons-material';
import { useStationMutation } from '../redux/features/oderSlce';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/features/authSlice';



function Oders() {
  const navigate = useNavigate();
  const useRef = React.useRef();
  const errRef = React.useRef();
  const [errorMsg, setErrorMsg] = React.useState(); 
  const [stationData, setStation] = React.useState(); 
  const [oderQuantity, setOderQuantity ] = React.useState(0); 
  const dispatch = useDispatch();

  const [station, {isLoading}] = useStationMutation();

  React.useEffect(() => {

  }, [])


   //increase counter
  const increase = () => {
    setOderQuantity(count => count + 1);
  };
 
  //decrease counter
  const decrease = () => {
    setOderQuantity(count => count - 1);
  };
 

    const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let station_code = data.get('station');
    console.log(station_code);
    try {
      const station_data = await station({ station_code }).unwrap();
      console.log(station_data);
      setStation(station_data.data);
      station_code = "";
      
    } catch (error) {
      if (!error?.respose) {
        setErrorMsg("No server respose try again later");
      } else if (error.respose?.status === 401) {
        setErrorMsg("incorrect password or email ");
      } else {
        setErrorMsg("login failed try again later");
      }
    }
    }

    if (stationData) {
      return(
        <Box 
        sx={{
          my: 8,
          mx: 4,
          alignItems: 'center',
        }}
        >
           <Typography sx={{ mb: 1.5 }} color="text.secondary" variant='h4'>
              List of fertilizers
            </Typography>
          <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap:'wrap',
          justifyContent:"space-between",
          alignItems: 'center',
        }}>
        {stationData?.map((data) => (
          <Card sx={{ maxWidth: 200 }} key={data.fertilizer_station_id}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {data.fertilizer}
            </Typography>
            <Typography variant="h5" component="div">
              {data.price}Tsh
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              mbolea za kilimo
            </Typography>
            <Typography variant="body2">
              
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small"
            onClick={() => 
              dispatch(addToCart({
                "id":data.fertilizer_station_id, "quantity":oderQuantity
              }))
            }
            >Add {data.fertilizer} to cart</Button>
            <IconButton
           onClick={increase}
           ><Add/></IconButton>
              <span>{oderQuantity}</span>
              <IconButton
               onClick={decrease}
              >
                <strong>-</strong>
              </IconButton>
          </CardActions>
        </Card>
      ))}
      </Box>
     </Box>  
      ) 
    }
  return (
    isLoading?(
      <h5> fetching station</h5>
) :(
<Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
<Box
   sx={{
     my: 8,
     mx: 4,
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
   }}
 >
   <Typography component="h1" variant="h5">
    Add the supplier Token 
   </Typography>
   <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
     <TextField
       margin="normal"
       required
       fullWidth
       id="email"
       label="supplier token"
       name="station"
       autoComplete="email"
       autoFocus
     />
     <Button
       type="submit"
       fullWidth
       variant="contained"
       sx={{ mt: 3, mb: 2 }}
       endIcon={<Send/>}
     >
       submit 
     </Button>
     <Grid container>
       <Grid item xs>
       </Grid>
       <Grid item>
       </Grid>
     </Grid>

   </Box>
 </Box>
</Paper>
)
  )
}

export default Oders