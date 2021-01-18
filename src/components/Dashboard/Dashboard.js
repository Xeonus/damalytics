import React, { useState } from 'react';
import clsx from 'clsx';
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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import FluxLogo from './../resources/fluxLogo.svg';
import Cookies from 'universal-cookie';
import firebase from './../../config/firebase';
import FaqPage from '../UI/FAQ/FaqPage';
import HelpIcon from '@material-ui/icons/Help';
import DialpadIcon from '@material-ui/icons/Dialpad';
import Grid from '@material-ui/core/Grid';
import Title from './../UI/Title';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div component="span"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


export default function Dashboard() {

  //Set up theme cookie
  const cookies = new Cookies();
  var storedTheme = null;
  if (cookies.get('themeState') !== null) {
    storedTheme = cookies.get('themeState') === "true";
  } else {
    storedTheme = true;
  }
  const [value, setValue] = React.useState(0);
  const [darkState, setDarkState] = useState(storedTheme);
  const [open, setOpen] = React.useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? "#ffffff" : "#283593";
  const mainSecondaryColor = darkState ? "#1a237e" : "#1a237e";
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  firebase.analytics().logEvent('App launched');

  return (
    <ThemeProvider theme={theme} >
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
            <Box display='flex' flexGrow={1}>
              
              
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab icon={<DialpadIcon/>} label="CALCULATOR" {...a11yProps(0)} />
                <Tab  icon={<HelpIcon/>} label="FAQ" {...a11yProps(1)} />
              </Tabs>
              </Box>
             
              <Switch checked={darkState} onChange={handleThemeChange} className={classes.menuButton} color="primary"></Switch>
              <NightsStayIcon></NightsStayIcon>
            </Toolbar>
            
          </AppBar>
        </Box>
        
          <TabPanel value={value} index={0} dir={theme.direction} component="span">
          <Grid item xs={12} container justify="center" component="span">
            <Box  m={2} alignItems="center" display="flex" flexDirection="row" component="span">
                  <img src={FluxLogo} alt="React Logo" width="30" />
                  
                    <Title>DAM Community Calculator</Title>
                  
            </Box>
          </Grid>
            <CalculatorGrid className={clsx(classes.content, { [classes.contentShift]: open, })} themeSate={darkState}>
            </CalculatorGrid>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction} component="span">
            <FaqPage></FaqPage>
          </TabPanel>
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
    </ThemeProvider>
  );
}
