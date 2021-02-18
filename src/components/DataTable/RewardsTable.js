import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DecayChart from './../DecayChart/DecayChart';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    table: {
        overflow: 'auto',
        minWidth: 0,

    },
    tableCell: {
        paddingRight: 1,
        paddingLeft: 1
    }
});

function createData(time, nOfBlocks, flux, fluxWorth) {
    return { time, nOfBlocks, flux, fluxWorth };
}

function calculateReward(days, blocksPerDay, damLockedIn, fluxMultiplier, timeMultiplier) {
    var daysMultiplier;
    if (timeMultiplier < 3 && days <= 28) {
        daysMultiplier = timeMultiplier + days * (2 / 28);
        if (timeMultiplier > 3) {
            timeMultiplier = 3;
        }
    } else if (days >= 28) {
        daysMultiplier = 3;
    } else {
        daysMultiplier = timeMultiplier;
    }
    return days * blocksPerDay * 0.00000001 * damLockedIn * fluxMultiplier * daysMultiplier;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function RewardsTable(props) {
    const classes = useStyles();

    //Depending on screen-resolution, switch from row to column layout
    var layoutDirection = "column";
    var xsSize = 12;
    if (window.matchMedia("(min-width: 640px)").matches) {
        layoutDirection = "row";
        xsSize = 6;
    };

    var fluxPrice = props.data.fluxPrice;
    if (props.data.coinData.length === 0) {
        fluxPrice = 1;
    } else {
        if (props.data.coinData[2].current_price !== null) {
            fluxPrice = props.data.coinData[2].current_price;
        }
    }

    const rows = [];
    const timePoints = [1, 7, 30, 90, 180, 365]
    const timeLabels = ["1 day", "1 week", "1 month", "3 months", "6 months", "1 year"]

    for (var i = 0; i < timePoints.length; i++) {
        const dataEntry = createData(timeLabels[i], Number(timePoints[i] * props.data.blocksPerDay).toFixed(0), Number(calculateReward(timePoints[i], props.data.blocksPerDay, props.data.damLockedIn, props.data.newMultiplier, props.data.lockInMultiplier)).toFixed(2), Number(calculateReward(timePoints[i], props.data.blocksPerDay, props.data.damLockedIn, props.data.newMultiplier, props.data.lockInMultiplier) * fluxPrice).toFixed(2));
        rows.push(dataEntry);
    }

    return (

        <Grid container direction={layoutDirection} justifycontent="center" alignitems="stretch" spacing={3}>
            <Grid item xs={xsSize}>
                <TableContainer>
                    <Table className={classes.table} size="small" aria-label="a dense table" >
                        <caption>Please note that these values correspond to the time of mint and contain your current multiplier bonus!</caption>
                        <TableHead >
                            <TableRow >
                                <TableCell>Time-Frame</TableCell>
                                <TableCell align="left">Blocks</TableCell>
                                <TableCell align="left">Mintable Flux</TableCell>
                                <TableCell align="left">Flux Value ($)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.time} >
                                    <TableCell align="left">{row.time}</TableCell>
                                    <TableCell align="left">{numberWithCommas(row.nOfBlocks)}</TableCell>
                                    <TableCell align="left">{numberWithCommas(row.flux)}</TableCell>
                                    <TableCell align="left">{numberWithCommas(row.fluxWorth)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            <Grid item xs={xsSize}>
                <DecayChart themeState={props.themeState} data={props.data} onchange={(e) => { onchange(e) }}></DecayChart>
            </Grid>
        </Grid>

    );
}
