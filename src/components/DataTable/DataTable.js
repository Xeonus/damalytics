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

function createData(name, fluxToBurn, price, nOfBlocks, days) {
    return { name, fluxToBurn, price, nOfBlocks, days };
}

function calculateFluxToMultiplier(input) {
    const myfluxToBurn = - (- input.newMultiplier * input.damLockedIn * input.globalFluxBurned + input.myFluxBurned * input.globalDamLockedIn + input.damLockedIn * input.globalFluxBurned) / (- input.newMultiplier * input.damLockedIn + input.damLockedIn + input.globalDamLockedIn);
    if (myfluxToBurn < 0) {
        return 0;
    } else {
        return Number(myfluxToBurn).toFixed(2);
    }
}

function calculateBlocksToBreakEven(lockInBonus, multiplierBonus, myDamLockedIn, targetFlux) {
    if (targetFlux > 0) {
        var blocks = targetFlux / (0.00000001 * lockInBonus * myDamLockedIn * multiplierBonus);
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


    const rows = [];

    for (var i = 1; i <= 10; i++) {
        var fluxToMultiplier = calculateFluxToMultiplier({ ...props.data, newMultiplier: i });
        const dataEntry = createData(i.toString() + "x", fluxToMultiplier,
            Number(fluxToMultiplier * fluxPrice).toFixed(2),
            calculateBlocksToBreakEven(props.data.lockInMultiplier, i, props.data.damLockedIn, fluxToMultiplier),
            Number(calculateBlocksToBreakEven(props.data.lockInMultiplier, i, props.data.damLockedIn, fluxToMultiplier) / props.data.blocksPerDay).toFixed(0));
        rows.push(dataEntry);
    }


    return (

        <TableContainer>
            <Table className={classes.table} size="small" aria-label="a dense table" >
                <TableHead >
                    <TableRow >
                        <TableCell>Multiplier</TableCell>
                        <TableCell align="left">FLUX To Burn</TableCell>
                        <TableCell align="left">Cost ($)</TableCell>
                        <TableCell align="left">ROI (blocks)</TableCell>
                        <TableCell align="left">ROI (~d)</TableCell>
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
                            <TableCell align="left">{numberWithCommas(row.days)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
