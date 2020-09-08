import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CalculatorForm from './../../CalculatorForm/CalculatorForm';
import DataTable from './../../DataTable/DataTable';
import Title from './../Title';
import DecayChart from './../../DecayChart/DecayChart'
import CoinDataFetcher from '../../CoinDataFetcher/CoinDataFetcher';
import Footer from './../Footer';
import Box from "@material-ui/core/Box";
import MintingTables from './../../MintingTables/MintingTables';
import Cookies from 'universal-cookie';




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
        damPrice: null,
        showTable: false,
        myFluxToBurn: +100.0,
        myFluxBurned: +500,
        globalFluxBurned: +111000,
        damLockedIn: +10000,
        globalDamLockedIn: +11500000,
        newMultiplier: +0,
        lockInMultiplier: +3,
        decayPerDay: +0.05,
        blocksPerDay: +6500,
        coinData: [],
    };

    //If a cookie exists, overwrite with params. TODO: prevent form on-change trigger?!
    const cookies = new Cookies();
    var storedForm = cookies.get('formState');
    if (typeof storedForm !== 'undefined') {
        //Map form data points (TODO: Refactor / map, but not coinData!):
        state.myFluxToBurn = storedForm.myFluxToBurn;
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

    //Onchange handler
    const onchange = (data) => {
        setData(data)
    }

    const showData = () => (
        <Grid item xs={12}>
            <Paper elevation={3} className={classes.paper} >
                <Title>Multiplier Statistics</Title>
                <DataTable data={data}></DataTable>
            </Paper>
        </Grid>
    );

    const showAdvancedData = () => (
        <Grid item xs={12}>
            <Paper elevation={3} className={classes.paper}>
                <Title>FLUX rewards analysis</Title>
                <Box p={1}>
                    <DecayChart data={data} onchange={(e) => { onchange(e) }}></DecayChart>
                </Box>
            </Paper>
        </Grid>
    );

    const showMintStatsTable = () => (
        <Grid item xs={12}>
            <Paper elevation={3} className={classes.paper}>
                <Title>Minting strategy statistics</Title>
                <Box p={1}>
                    <MintingTables data={data} onchange={(e) => { onchange(e) }}></MintingTables>
                </Box>
            </Paper>
        </Grid>
    );

    return (

        <div >
            <Grid container={true} spacing={2} className={classes.root}  >
                <Grid item xs={12}>
                    <Paper elevation={3} className={classes.paper}>
                        <Title>Ecosystem Metrics</Title>
                        <CoinDataFetcher data={data} onchange={(e) => { onchange(e) }} />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} className={classes.paper} >
                        <Title>Input Parameters</Title>
                        <CalculatorForm data={data} onchange={(e) => { onchange(e) }}></CalculatorForm>
                    </Paper>
                </Grid>

                {/* Dynamic Elements */}
                {data.showTable ? showData() : null}
                {data.showTable ? showAdvancedData() : null}
                {data.showTable ? showMintStatsTable() : null}
                <Grid item xs={12}>
                    <Paper elevation={3} className={classes.paper}>
                        <Footer className={classes.footer}></Footer>
                    </Paper>
                    
                </Grid>
            </Grid>
        </div>

    );


}

export default CalculatorGrid;