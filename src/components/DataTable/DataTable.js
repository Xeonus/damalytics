import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


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

function createData(name, fluxToBurn, price, nOfBlocks, apy, apyInUsd) {
    return { name, fluxToBurn, price, nOfBlocks, apy, apyInUsd };
}

function calculateFluxToMultiplier(input) {
    const myfluxToBurn = - (- input.newMultiplier * input.damLockedIn * input.globalFluxBurned + input.myFluxBurned * input.globalDamLockedIn + input.damLockedIn * input.globalFluxBurned) / (- input.newMultiplier * input.damLockedIn + input.damLockedIn + input.globalDamLockedIn);
    if (myfluxToBurn < 0) {
        return 0;
    } else {
        return Number(myfluxToBurn).toFixed(2);
    }
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
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


export default function DataTable(props) {
    const classes = useStyles();

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
        var fluxToMultiplier = calculateFluxToMultiplier({ ...props.data, newMultiplier: i });
        const dataEntry = createData(i.toString() + "x", fluxToMultiplier,
            Number(fluxToMultiplier * fluxPrice).toFixed(2),
            Number(calculateBlocksToBreakEven(i, props.data.damLockedIn, fluxToMultiplier) / props.data.blocksPerDay).toFixed(0),
            Number(100 / (calculateLockedInDamROI(i, props.data.damLockedIn, damPrice, fluxPrice) / props.data.blocksPerDay) * 365 ).toFixed(2), 
            Number((1 / (calculateLockedInDamROI(i, props.data.damLockedIn, damPrice, fluxPrice) / props.data.blocksPerDay) * 365 ) * props.data.damLockedIn * damPrice).toFixed(0));
        rows.push(dataEntry);
    }


    return (
        <TableContainer>
            <Table className={classes.table} size="small" aria-label="a dense table" >
                <caption>A 3x lock-in bonus is assumed for these values.</caption>
                <TableHead >
                    <TableRow >
                        <TableCell>Burn Multiplier</TableCell>
                        <TableCell align="left">FLUX To Burn</TableCell>
                        <TableCell align="left">Flux Cost ($)</TableCell>
                        <TableCell align="left">FLUX ROI (~d)</TableCell>
                        <TableCell align="left">DAM APY (%)</TableCell>
                        <TableCell align="left">DAM APY ($)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name} >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="left">{numberWithCommas(row.fluxToBurn)}</TableCell>
                            <TableCell align="left">{numberWithCommas(row.price)}</TableCell>
                            <TableCell align="left">{numberWithCommas(row.nOfBlocks)}</TableCell>
                            <TableCell align="left">{numberWithCommas(row.apy)}</TableCell>
                            <TableCell align="left">{numberWithCommas(row.apyInUsd)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
