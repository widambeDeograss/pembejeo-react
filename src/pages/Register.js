import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useRegisterMutation } from '../redux/features/authApiSlice';
import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import sideImage from '../utils/dash_logo.jpg'
import { Home } from '@mui/icons-material';
import { Paper } from '@mui/material';

export default function SignUp() {
  const [chosentype, setChosentype] = React.useState();
  const useRef = React.useRef();
  const errRef = React.useRef();
  const [errorMsg, setErrorMsg] = React.useState();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();

  const handleSubmit =async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let first_name = data.get('first_name');
    let last_name = data.get('last_name');
    let username = data.get('username');
    let phone = data.get('phone');
    let type = chosentype;
    let email = data.get('email');
    let password = data.get('password');

    try {

      const userData = await register({ first_name, last_name, type, username, phone, email, password }).unwrap()
      console.log(userData);
      first_name = "";
      last_name = "";
      username = "";
      email = "";
      password = "";
      if (userData.save === "true") {
       navigate("/");
      }else{
        navigate("/signUp");
      }
      
    } catch (error) {

      if (!error?.respose) {
        setErrorMsg("No server respose try again later");
      } else if (error.respose?.status === 401) {
        setErrorMsg("incorrect password or email ");
      } else {
        setErrorMsg("register failed try again later");
      }

      errRef.current.focus();

    }
    

  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${sideImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) =>
          t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: "600px"
      }}

    >
      <Container component="main" maxWidth="xs"

      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper xs={12} sm={8} md={5} elevation={0}
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
            }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <Home />
            </Avatar>
            <Typography component="h1" variant="h5">
              Jisajili PembejeoApp
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="first_name"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    name="last_name"
                    autoComplete="family-name"
                  />

                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="family-name"
                  />

                </Grid>
                 <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="phone"
                    name="phone"
                    autoComplete="family-name"
                  />

                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">regster as</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={chosentype}
                      onChange={(e) => { setChosentype(e.target.value) }}
                    >
                      <MenuItem value="farmer">farmer</MenuItem>
                      <MenuItem value="supplier">supplier</MenuItem>
                    </Select>
                  </FormControl>

                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/"> Already have an account? Sign in</Link>;
                  {/* <Link href="signUp" variant="body2">
                 
                </Link> */}
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}