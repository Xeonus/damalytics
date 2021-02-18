import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Box }  from '@material-ui/core';


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

//Create data table function
function createData(name, fluxToBurn, price, fluxBlocks, fluxPerYear, fluxApyPerYear, fluxPerYearValue) {
    return { name, fluxToBurn, price, fluxBlocks, fluxPerYear, fluxApyPerYear, fluxPerYearValue };
}

//Helper functions
function calculateFluxToMultiplier(input) {
    const myfluxToBurn = - (- input.newMultiplier * input.damLockedIn * input.globalFluxBurned + input.myFluxBurned * input.globalDamLockedIn + input.damLockedIn * input.globalFluxBurned) / (- input.newMultiplier * input.damLockedIn + input.damLockedIn + input.globalDamLockedIn);
    if (myfluxToBurn < 0) {
        return 0;
    } else {
        return Number(myfluxToBurn).toFixed(2);
    }
}

function calculateBlocksToBreakEven(multiplierBonus, myDamLockedIn, targetFlux) {
    if (targetFlux > 0) {
        var blocks = targetFlux / (0.00000001 * 3 * myDamLockedIn * multiplierBonus);
        return Number(blocks).toFixed(0);
    } else {
        return +0;
    }
}

function calculateReward(days, blocksPerDay, damLockedIn, fluxMultiplier) {
    return days * blocksPerDay * 0.00000001 * damLockedIn * fluxMultiplier * 3;
}


function numberWithCommas(x) {
    if (isFinite(x)) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
    return '\u221e';
    }
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

    const rows = [];

    for (var i = 1; i <= 10; i++) {
        var fluxToMultiplier = calculateFluxToMultiplier({ ...props.data, newMultiplier: i });
        var fluxPerYear = calculateReward(365, props.data.blocksPerDay, props.data.damLockedIn, i);
        var fluxRoiD = calculateBlocksToBreakEven(i, props.data.damLockedIn, fluxToMultiplier) / props.data.blocksPerDay;
        const dataEntry = createData(
            i.toString() + "x", fluxToMultiplier,
            Number(fluxToMultiplier * fluxPrice).toFixed(0),
            Number(fluxRoiD).toFixed(0),
            Number(fluxPerYear).toFixed(0),
            Number(fluxPerYear* fluxPrice).toFixed(0), 
            Number(100 / (fluxToMultiplier * fluxPrice) * fluxPerYear * fluxPrice).toFixed(2)
            );
        rows.push(dataEntry);
    }

    return (
        <TableContainer>
            <Table className={classes.table} size="small" aria-label="a dense table" >
                <caption>A 3x lock-in bonus and a direct mint after burning is assumed for these values.</caption>
                <TableHead >
                    <TableRow >
                        <TableCell>Burn Multiplier</TableCell>
                        <TableCell align="left">FLUX To Burn</TableCell>
                        <TableCell align="left">Flux Cost</TableCell>
                        <TableCell align="left">FLUX ROI (~d)</TableCell>
                        <TableCell align="left">FLUX / year</TableCell>
                        
                        <TableCell align="left"><Box  alignItems="center" display="flex" flexDirection="row">FLUX APY <Tooltip title="This APY metric focuses exclusively on Flux ROI. 1x does not require an investment, therefore the ROI is inifnite." arrow><InfoOutlinedIcon color="primary" fontSize="small"/></Tooltip></Box></TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name} >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="left">{numberWithCommas(row.fluxToBurn)}</TableCell>
                            <TableCell align="left">{numberWithCommas(row.price)+ '$'}</TableCell>
                            <TableCell align="left">{numberWithCommas(row.fluxBlocks)}</TableCell>
                            <TableCell align="left">{numberWithCommas(row.fluxPerYear)}</TableCell>
                            <TableCell align="left">{numberWithCommas(row.fluxApyPerYear) + '$ (' + numberWithCommas(row.fluxPerYearValue) + '%)'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
