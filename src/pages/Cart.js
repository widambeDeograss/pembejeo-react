import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { selectCurrentCart } from '../redux/features/authSlice'
import { selectCurrentUser } from '../redux/features/authSlice';
import { Send } from '@mui/icons-material';
import { useCreateOderMutation } from '../redux/features/oderSlce';

function Cart() {
    const cartData = useSelector(selectCurrentCart);
    const user = useSelector(selectCurrentUser);
    const useRef = React.useRef();
    const errRef = React.useRef();
    const [errorMsg, setErrorMsg] = React.useState();



    console.log(cartData)
    const [createOder, {isLoading}] = useCreateOderMutation();
    

  const handleSubmit = async () => {
    console.log('reacged');
    let user_id = user.id
    let fertilizer_station = cartData

    try {
      const userData = await createOder({ user_id, fertilizer_station }).unwrap();
      console.log(userData);
      
    } catch (error) {
      if (!error?.respose) {
        setErrorMsg("No server respose try again later");
      } else if (error.respose?.status === 401) {
        setErrorMsg("incorrect password or email ");
      } else {
        setErrorMsg("login failed try again later");
      }

      // errRef.current.focus();
    }
  
  };

    return (
    isLoading?(<h4>posting oder...</h4>):
    (
     <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}> 
      <Box
       sx={{
        my: 8,
        mx: 4,
        alignItems: 'center',
      }} 
      >
        <Typography component="h1" variant="h5" sx={{marginBottom:"20px"}}>
    farmerOders Cart
   </Typography>
   <br/>
   <br/>
   <Box
       sx={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"space-evenly"
      }} 
      >
       {cartData?.map((data) => (
          <Card sx={{ maxWidth: 200 }} key={data.id}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {data.id}
            </Typography>
            <Typography variant="h5" component="div">
            Mifuko ya mbolea  {data.quantity}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              mbolea za kilimo
            </Typography>
            
          </CardContent>
        </Card>
      ))}
      </Box>
      <br/>
      <br/>
      <br/>
   <Button sx={{backgroundColor:"green"}}
   endIcon={<Send/>}
    onClick={() => {
        handleSubmit()
    }}

   > <strong>MAKE AN ODER</strong></Button>
   </Box>
        </Paper>)
    )
    }

    export default Cart