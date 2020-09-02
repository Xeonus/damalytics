import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 300,
    },
    tableCell: {
        paddingRight: 1,
        paddingLeft: 1
    }
});

function createData(name, fluxToBurn, price, dailyReward) {
    return { name, fluxToBurn, price, dailyReward };
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
    return Number(blocks / 5760).toFixed(0);
    } else {
    return +0;
    }
}





//TODO create input params for table iteratively

//TODO calculate daily reward


export default function DataTable(props) {
    const classes = useStyles();

    let newData = {
        data: {
            ...props.data,
            newMultiplier: 1,
        },
    };

    console.log("dataTableprops", props);

    const rows = [];

    for (var i=1; i<=10; i++) {
        var fluxToMultiplier = calculateFluxToMultiplier({ ...props.data, newMultiplier: i });
        const dataEntry = createData(i.toString() + "x", fluxToMultiplier , 
        fluxToMultiplier * props.data.fluxPrice, 
        calculateBlocksToBreakEven(props.data.lockInMultiplier, i, props.data.damLockedIn, fluxToMultiplier));
        rows.push(dataEntry);
    }


    return (

        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Multiplier</TableCell>
                        <TableCell align="left">Flux To Burn</TableCell>
                        <TableCell align="left">Price ($)</TableCell>
                        <TableCell align="left">Time to breakeven (~d)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="left">{row.fluxToBurn}</TableCell>
                            <TableCell align="left">{row.price}</TableCell>
                            <TableCell align="left">{row.dailyReward}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
