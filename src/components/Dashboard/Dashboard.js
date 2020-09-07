import React, { useState } from 'react';
import CalculatorGrid from "./../UI/CalculatorGrid/CalculatorGrid"
import { Box, Switch } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from "@material-ui/core/Container";
import NightsStayIcon from '@material-ui/icons/NightsStay';
import FluxLogo from './../resources/fluxLogo.svg';
import Cookies from 'universal-cookie';



export default function Dashboard() {

  //Set up theme cookie
  const cookies = new Cookies();
  var storedTheme = null;
  if (cookies.get('themeState') !== null) {
    storedTheme = cookies.get('themeState') === "true";
  } else {
    storedTheme = false;
  }
  const [darkState, setDarkState] = useState(storedTheme);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? "#ffffff" : "#283593";
  const mainSecondaryColor = darkState ? "#272936": "#283593";
  const theme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      }
    }
  });

  //Theme properties
  const useStyles = makeStyles((theme) => ({
    root: {
      //flexGrow: 1,
      marginBottom: theme.spacing(8),
    },
    title: {
      flexGrow: 1,
      flexDirection: "row", 
      display: "flex",
      margin: "5px",

    },
    container: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(2),
      //alignItems: 'center',
      flexDirection: 'column',
      display: 'flex',
      justifyContent: 'center',

    },
    footer: {
    position: "absolute",
    bottom: "0",
    width: "100%",
    height: "2.5rem",
    justifyContent: "center",
    },
  }));

  theme.typography.h3 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2rem',
    },
  };

  const classes = useStyles();

  const handleThemeChange = () => {
    //Update cookie
    cookies.set('themeState', (!darkState).toString(), { path: '/', expires: new Date(Date.now()+2592000)})
    setDarkState(!darkState);
  }


  return (

    <ThemeProvider theme={theme}>
      <div>
        <CssBaseline />
        <Container className={classes.container}>
          <Box p={1} m="auto" >
            <AppBar position="absolute" className={classes.root} color="secondary">
              <Toolbar>
                 <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Box mx="auto" alignItems="center" display="flex" flexDirection="row">
                <img src={FluxLogo} alt="React Logo" width="30"/>
                  <Typography variant="h5" className={classes.title}>
                     Calculator
                  </Typography>
                </Box>
                
                <Switch checked={darkState} onChange={handleThemeChange} className={classes.menuButton} color="primary"></Switch>
                <NightsStayIcon></NightsStayIcon>
              </Toolbar>
            </AppBar>
          </Box>
          <CalculatorGrid></CalculatorGrid>
        </Container>
        </div>
    </ThemeProvider>

    

  );
}
