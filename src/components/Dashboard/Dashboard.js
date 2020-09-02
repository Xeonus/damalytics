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
import DarkLogo from './../resources/darkMode.svg';


export default function Dashboard() {

  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";

  const theme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: '#283593',
      },
      secondary: {
        main: '#2196f3',
      },
    }
  });

  //Theme properties
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(8),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,

    },
    container: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(4),
      alignItems: 'center',
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
    setDarkState(!darkState);
  }


  return (

    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Container className={classes.container}>
        <Box display={'flex'} p={2} >
        <AppBar position="absolute" className={classes.root}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Box mx="auto">
            <Typography variant="h5" className={classes.title}>
              DAM Community Calculator
            </Typography>
            </Box>
            <img src={DarkLogo} alt="React Logo" width="20"/>
            <Switch checked={darkState} onChange={handleThemeChange}></Switch>
          </Toolbar>
        </AppBar>
            <CalculatorGrid></CalculatorGrid>
          </Box>
        </Container>
      </div>
    </ThemeProvider>

  );
}
