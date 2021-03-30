import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import ApyCharts from './ApyCharts';


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

function createData(name, damROI, damApy, netApy, netApyUsd, fluxApyPerYear) {
    return { name, damROI, damApy, netApy, netApyUsd, fluxApyPerYear};
}

function calculateFluxToMultiplier(input) {
    const myfluxToBurn = - (- input.newMultiplier * input.damLockedIn * input.globalFluxBurned + 1 * input.globalDamLockedIn + input.damLockedIn * input.globalFluxBurned) / (- input.newMultiplier * input.damLockedIn + input.damLockedIn + input.globalDamLockedIn);
    if (myfluxToBurn < 0) {
        return 0;
    } else {
        return Number(myfluxToBurn).toFixed(2);
    }
}

function calculateReward(days, blocksPerDay, damLockedIn, fluxMultiplier) {
    return days * blocksPerDay * 0.00000001 * damLockedIn * fluxMultiplier * 3;
}



function calculateLockedInDamROI( multiplierBonus, myDamLockedIn, damPrice, fluxPrice) {
    var numberOfBlocksNeeded = damPrice * myDamLockedIn / (0.00000001 * 3 * myDamLockedIn * multiplierBonus * fluxPrice);
    return numberOfBlocksNeeded;
}

function calculateBlocksToBreakEven(multiplierBonus, myDamLockedIn, targetFlux) {
    if (targetFlux > 0) {
        var blocks = targetFlux / (0.00000001 * 3 * myDamLockedIn * multiplierBonus);
        return Number(blocks).toFixed(0);
    } else {
        return +0;
    }
}

function numberWithCommas(x) {
    if (isFinite(x)) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
    return '\u221e';
    }
  }



export default function ApyTable(props) {
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
    var damPrice = props.data.damPrice;
    if (props.data.coinData.length === 0) {
        damPrice = 1;
    } else {
        if (props.data.coinData[1].current_price !== null) {
            damPrice = props.data.coinData[1].current_price;
        }
    }

    const rows = [];

    for (var i = 1; i <= 10; i++) {
        var damRoiInDays = calculateLockedInDamROI(i, props.data.damLockedIn, damPrice, fluxPrice) / props.data.blocksPerDay;
        var damApy = 100 / (calculateLockedInDamROI(i, props.data.damLockedIn, damPrice, fluxPrice) / props.data.blocksPerDay) * 365;
        var fluxToMultiplier = calculateFluxToMultiplier({ ...props.data, newMultiplier: i });
        var fluxPerYear = calculateReward(365, props.data.blocksPerDay, props.data.damLockedIn, i);
        var fluxRoiD = calculateBlocksToBreakEven(i, props.data.damLockedIn, fluxToMultiplier) / props.data.blocksPerDay;
        var netApy = 100 /  (damRoiInDays + fluxRoiD) * 365;
        var usdValue = 1 /  (damRoiInDays + fluxRoiD) * 365 * props.data.damLockedIn * damPrice;
       
        //name, damROI, damApy, netApyInUsd
        const dataEntry = createData(
            i.toString() + "x", 
            Number(damRoiInDays).toFixed(0),
            Number(damApy).toFixed(2), 
            Number(netApy).toFixed(2),
            Number(usdValue).toFixed(0),
            Number(100 / (fluxToMultiplier * fluxPrice) * fluxPerYear * fluxPrice).toFixed(2)
            );
            rows.push(dataEntry);
        }


    return (

        <Grid container direction={layoutDirection} justifycontent="center" alignitems="stretch" spacing={3}>
        <Grid item xs={xsSize}>
        <TableContainer>
            <Table className={classes.table} size="small" aria-label="a dense table" >
                <caption>A 3x lock-in bonus and a direct mint after burning is assumed for these values. The Net APR equals net Flux earnings vs. Flux cost vs. DAM investment</caption>
                <TableHead >
                    <TableRow >
                        <TableCell>Burn Multiplier</TableCell>
                        <TableCell align="left">DAM ROI (~d)</TableCell>
                        <TableCell align="left">DAM APR</TableCell>
                        <TableCell align="left">Net APR</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name} >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="left">{numberWithCommas(row.damROI)}</TableCell>
                            <TableCell align="left">{numberWithCommas(row.damApy) + '%'}</TableCell>
                            <TableCell align="left">{numberWithCommas(row.netApyUsd) + '$ (' + numberWithCommas(row.netApy) + '%)'}</TableCell>
                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Grid>

            <Grid item xs={xsSize}>
                <ApyCharts themeState={props.themeState} data={props.data} rows={rows} onchange={(e) => { onchange(e) }}></ApyCharts>
            </Grid>
        </Grid>
    );
}
