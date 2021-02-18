import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CalculatorForm from './../../CalculatorForm/CalculatorForm';
import DataTable from './../../DataTable/DataTable';
import Title from './../Title';
import DamLockedInChart from './../../LockInCharts/DamLockedInChart'
import CoinDataFetcher from '../../CoinDataFetcher/CoinDataFetcher';
import Footer from './../Footer';
import { Box, Switch } from '@material-ui/core';
//import MintingTables from './../../MintingTables/MintingTables';
import RewardsTable from './../../DataTable/RewardsTable';
import ApyTable from './../../DataTable/ApyTable';
import Cookies from 'universal-cookie';
import TuneIcon from '@material-ui/icons/Tune';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        spacing: 0,
        direction: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        '@media only screen and (min-width: 600px)': {
            padding: theme.spacing(1),
        },
        textAlign: 'center',
        align: 'center',
        justifyContent: 'center',
        color: '#272936',

    },
    footer: {
        flexGrow: 1,
        spacing: 0,
        position: "absolute",
        bottom: "0",
        textAlign: 'center',
        align: "center",
        justifyContent: 'center',
    },
}));

function CalculatorGrid(props) {

    //Styling object
    const classes = useStyles();

    //Default initialization. In future replace with rest-api elements
    const state = {
        fluxPrice: +2,
        damPrice: +1,
        showTable: false,
        myFluxToBurn: +0.0,
        myFluxBurned: +500,
        globalFluxBurned: +111000,
        damEthUniswap: +1000,
        damLockedIn: +10000,
        globalDamLockedIn: +11500000,
        newMultiplier: +0,
        lockInMultiplier: +3,
        decayPerDay: +0.01,
        blocksPerDay: +6500,
        startingDamSupply: +16876778,
        coinData: [],

    };

    //If a cookie exists, overwrite with params. TODO: prevent form on-change trigger?!
    const cookies = new Cookies();
    var storedForm = cookies.get('formState');
    if (typeof storedForm !== 'undefined') {
        //Map form data points (TODO: Refactor / map, but not coinData!):
        //state.myFluxToBurn = storedForm.myFluxToBurn;
        state.myFluxBurned = storedForm.myFluxBurned;
        state.globalFluxBurned = storedForm.globalFluxBurned;
        state.damLockedIn = storedForm.damLockedIn;
        state.globalDamLockedIn = storedForm.globalDamLockedIn;
        state.newMultiplier = storedForm.newMultiplier;
        state.lockInMultiplier = storedForm.lockInMultiplier;
        state.decayPerDay = storedForm.decayPerDay;
        state.blocksPerDay = storedForm.blocksPerDay;
    };

    //Init Change handling

    const [data, setData] = useState(state);

    //Input parameter state
    var defaultMode = false;
    const [expertMode, setExpertMode] = useState(defaultMode);

    const handleModeChange = () => {
        setExpertMode(!expertMode);
    }

    //Onchange handler
    const onchange = (data) => {
        setData(data)
    }

    const showData = () => (
        <Grid item xs={12}>
            <Paper elevation={3} className={classes.paper} >
                <Title>FLUX Token Burn Bonus Metrics</Title>
                <DataTable themeState={props.themeSate} data={data}></DataTable>
            </Paper>
        </Grid>
    );

    const showApyTable = () => (
        <Grid item xs={12}>
            <Paper elevation={3} className={classes.paper}>
                <Title>APY Metrics</Title>
                <Box p={1}>
                    <ApyTable themeState={props.themeSate} data={data} onchange={(e) => { onchange(e) }}></ApyTable>
                </Box>
            </Paper>
        </Grid>
    );

    const showRewardsTable = () => (
        <Grid item xs={12}>
            <Paper elevation={3} className={classes.paper}>
                <Title>Flux Rewards</Title>
                <Box p={1}>
                    <RewardsTable themeState={props.themeSate} data={data} onchange={(e) => { onchange(e) }}></RewardsTable>
                </Box>
            </Paper>
        </Grid>
    );

    return (

        <div >
            <Grid container={true} spacing={2} className={classes.root} component="span" >
                <Grid item xs={12} component="span">
                    <Paper elevation={3} className={classes.paper}>
                        <Title>Ecosystem Metrics</Title>
                        <CoinDataFetcher data={data} onchange={(e) => { onchange(e) }} />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} className={classes.paper}>
                        <Title>DAM Token Distribution</Title>
                        <Box p={1.5}>
                            <DamLockedInChart themeState={props.themeSate} data={data} onchange={(e) => { onchange(e) }}></DamLockedInChart>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} component="span">
                    <Paper elevation={3} className={classes.paper} >
                    <Grid item xs={12} container justify="center">
                        <Box  alignItems="center" display="flex" flexDirection="row">
                            <Title>Input Parameters</Title>
                            <Switch checked={expertMode} onChange={handleModeChange} className={classes.menuButton} color="primary"></Switch>
                            <TuneIcon color="primary"></TuneIcon>
                        </Box>
                        </Grid>
                        <CalculatorForm expertMode={expertMode} data={data} onchange={(e) => { onchange(e) }}></CalculatorForm>
                    </Paper>
                </Grid>

                {/* Dynamic Elements */}
                {data.showTable ? showData() : null}
                {data.showTable ? showApyTable() : null}
                {data.showTable ? showRewardsTable() : null}
                {/*data.showTable ? showDamStats() : null */}
                {/* data.showTable ? showMintStatsTable() : null */}
                <Grid item xs={12} component="span">
                    <Paper elevation={3} className={classes.paper}>
                        <Footer className={classes.footer}></Footer>
                    </Paper>

                </Grid>
            </Grid>
        </div>

    );
}

export default CalculatorGrid;