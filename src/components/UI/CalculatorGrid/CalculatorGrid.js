import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CalculatorForm from './../../CalculatorForm/CalculatorForm';
import DataTable from './../../DataTable/DataTable';
import Title from './../Title';
import DecayChart from './../../DecayChart/DecayChart'
import CoinDataFetcher from '../../CoinDataFetcher/CoinDataFetcher';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        spacing: 0,
        direction: 'column',
        alignItems: 'center',
        justify: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        align: 'center',
        justify: 'center',
        color: '#272936',
        //maxWidth: 850,
        '@media only screen and (max-width: 600px)': {
      maxWidth: 500,
    },
    '@media only screen and (max-width: 415px)': {
        maxWidth: 300,
      },

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
        damLockedIn: +15000,
        globalDamLockedIn: +11519287.49,
        newMultiplier: +0,
        lockInMultiplier: +3,
        coinData: [],
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
                <Title>FLUX rewards decay over time</Title>
                <DecayChart data={data} onchange={(e) => { onchange(e) }}></DecayChart>
            </Paper>
        </Grid>
    )

    return (

            <div className={classes.root} >
                <Grid container spacing={2} alignItems='center'>
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
                    {data.showTable ? showData() : null}
                    {data.showTable ? showAdvancedData() : null}

                </Grid>
            </div>

    );


}

export default CalculatorGrid;