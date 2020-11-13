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
import firebase from './../../config/firebase';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssessmentIcon from '@material-ui/icons/Assessment';


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
  const [open, setOpen] = React.useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? "#ffffff" : "#283593";
  const mainSecondaryColor = darkState ? "#202336" : "#1a237e";
  const backgroundColor = darkState ? "#202336" : "#fafafa";
  const paperColor = darkState ? "#272936" : "#fff";
  const drawerWidth = 240;
  const theme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      },
      background: {
        default: backgroundColor,
        paper: paperColor
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
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  };

  const classes = useStyles();

  const handleThemeChange = () => {
    //Update cookie
    cookies.set('themeState', (!darkState).toString(), { path: '/', expires: new Date(Date.now() + 2592000000) })
    setDarkState(!darkState);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  firebase.analytics().logEvent('App launched');

  return (
    <ThemeProvider theme={theme}>
      <div>
        <CssBaseline />
        <Container className={classes.container}>
          <Box p={1} m="auto" >
            <AppBar position="fixed" className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })} color="secondary">
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                <Box mx="auto" alignItems="center" display="flex" flexDirection="row">
                  <img src={FluxLogo} alt="React Logo" width="30" />
                  <Typography variant="h5" className={classes.title}>
                    Calculator
                  </Typography>
                </Box>
                <Switch checked={darkState} onChange={handleThemeChange} className={classes.menuButton} color="primary"></Switch>
                <NightsStayIcon></NightsStayIcon>
              </Toolbar>
            </AppBar>
          </Box>
          <CalculatorGrid className={clsx(classes.content, { [classes.contentShift]: open, })} themeSate={darkState}>
          </CalculatorGrid>
        </Container>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}>

          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>

          <Divider />
          <List>
            {['DAM Dashboard', 'DAM Analytics (Beta)'].map((text, index) => (
              <ListItem button key={text} component="a" href={index % 2 === 0 ? "https://datamine-crypto.github.io/realtime-decentralized-dashboard/#dashboard" : "https://datamine-crypto.github.io/datamine-pro-portal/#/dashboard"}>
                <ListItemIcon>{index % 2 === 0 ? <DashboardIcon /> : <AssessmentIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
      </div>
    </ThemeProvider>
  );
}
