import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CalculatorForm from './../../CalculatorForm/CalculatorForm';
import DataTable from './../../DataTable/DataTable';
import CoinStatistics from './../../CoinStatistics/CoinStatistics';
import Auxilliary from './../../../hoc/Auxilliary/Auxilliary'
import Title from './../Title';

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
        color: '#272936',

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
            <Paper elevation={3} className={classes.paper}>
                <Title>Multiplier Statistics</Title>
                <DataTable data={data}></DataTable>
            </Paper>
        </Grid>
    );

    const showAdvancedData = () => (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Title>Multiplier decay over time</Title>
            </Paper>
        </Grid>
    )

    console.log("data", data.showTable);


    return (
        <Auxilliary>
            <div className={classes.root} >
                <Grid container spacing={3} alignItems='center' >
                    <Grid item xs={12}>
                        <Paper elevation={3} className={classes.paper} >
                        <Title>
            Ecosystem Metrics
          </Title>
                            <CoinStatistics data={data} onchange={(e) => { onchange(e) }} />
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
        </Auxilliary>
    );


}

//Redux components
const mapStateToProps = state => {
    return {
        ...state,
        showTable: state.showTable
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onNewMultiplier: () => dispatch({ type: 'CALCULATENEWMULTIPLIER' }),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorGrid)