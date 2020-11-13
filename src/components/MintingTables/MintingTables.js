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


//Calculate the cumulative sum of all mints at defined interval
function calculateCumulativeRewards(nOfDays, mintInterval, damLockedIn, decayPerDay, startingLockInMultiplier, startingMultiplier, blocksPerDay) {
    var cumulativeReward = 0;
    var daysSinceLastMint = 1;
    for (var i = 1; i <= nOfDays; i++) {
        var reward = 0;
        var lockInX = startingLockInMultiplier + i * (2/28)
        if (lockInX > 3) {
            lockInX = 3;
        }
        var burnX = startingMultiplier - i * decayPerDay
        if (burnX < 1) {
            burnX = 1;
        }
        if (i === nOfDays) {
            //Add the modulo / remaining days to cumulative sum for non-matching cases (e.g. 2 day remaining at 8 day interval)
            if (nOfDays % mintInterval > 0) {
                reward = (nOfDays % mintInterval) * blocksPerDay * 0.00000001 * damLockedIn * lockInX * burnX;
                cumulativeReward += reward;
            } 
            //For non-modulo cases only add if mintInterval === numberOfDays
            else {
                reward = mintInterval * blocksPerDay * 0.00000001 * damLockedIn * lockInX * burnX;
                cumulativeReward += reward;
            }
        }
        //On a match, we add up the minting reward and reset the running day counter
        else if (daysSinceLastMint === mintInterval) {
            reward = mintInterval * blocksPerDay * 0.00000001 * damLockedIn * lockInX * burnX;
            cumulativeReward += reward;
            daysSinceLastMint = 0;
        };
        daysSinceLastMint += 1;
    };
    return Number(cumulativeReward).toFixed(2);
};

function createData(days, cummulativeFluxMinted, deltaToBase) {
    return { days, cummulativeFluxMinted, deltaToBase };
}


export default function MintingTables(props) {
    const classes = useStyles();


    const rows = [];

    for (var i = 1; i <= 10; i++) {
        const dataEntry = createData(i.toString(),
            calculateCumulativeRewards(30, i, props.data.damLockedIn, props.data.decayPerDay, props.data.lockInMultiplier, props.data.newMultiplier, props.data.blocksPerDay),
            Number(calculateCumulativeRewards(30, i, props.data.damLockedIn, props.data.decayPerDay, props.data.lockInMultiplier, props.data.newMultiplier, props.data.blocksPerDay) - calculateCumulativeRewards(30, 30, props.data.damLockedIn, 0.1, props.data.lockInMultiplier, props.data.newMultiplier, props.data.blocksPerDay)).toFixed(2));
        rows.push(dataEntry);
    }

    return (

        <TableContainer>
            <Table className={classes.table} size="small" aria-label="a dense table" >
                <TableHead >
                    <TableRow >
                        <TableCell>Minting interval (d)</TableCell>
                        <TableCell align="left">Cumulative Sum of Minted FLUX (in 30d)</TableCell>
                        <TableCell align="left">Delta compared to Mint after 30d</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.days} >
                            <TableCell component="th" scope="row">
                                {row.days}
                            </TableCell>
                            <TableCell align="left">{row.cummulativeFluxMinted}</TableCell>
                            <TableCell align="left">{row.deltaToBase}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
