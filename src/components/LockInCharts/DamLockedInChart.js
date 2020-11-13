import React from 'react';
import { Pie } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        spacing: 0,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },

    table: {
        overflow: 'auto',
        minWidth: 0,

    },
    tableCell: {
        paddingRight: 1,
        paddingLeft: 1
    }
}));

//defaults.global.legend.position = "bottom";

function createData(allocation, amount, percentage) {
    return { allocation, amount, percentage };
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function DamLockedInChart(props) {
    const classes = useStyles();


    //Color switch upon dark mode
    var cumFluxColor = 'rgb(40, 53, 147)';
    var dailyFluxColor = 'rgb(115, 135, 245)';
    if (props.themeState) {
        cumFluxColor = 'rgb(0, 255, 255)';
        dailyFluxColor = 'rgb(0, 127, 127)';
    }

    var labels = ["Global DAM Locked In", "DAM In Circulation"];
    var dataset = [{
        data: [Number(props.data.globalDamLockedIn).toFixed(2), Number(props.data.startingDamSupply - props.data.globalDamLockedIn).toFixed(2)],
        backgroundColor: [dailyFluxColor, cumFluxColor, cumFluxColor],
        options: {
            responsive: true,
            legend: {
                position: 'left',
            }
        }
    }]

    const rows = [];
    for (var i = 0; i < labels.length; i++) {
        const dataEntry = createData(labels[i], numberWithCommas(dataset[0].data[i]), Number(100 / props.data.startingDamSupply * dataset[0].data[i]).toFixed(2));
        rows.push(dataEntry);
    }

    const chartRef = React.createRef();

    //Depending on screen-resolution, switch from row to column layout
    var layoutDirection = "column";
    var xsSize = 12;
    if (window.matchMedia("(min-width: 640px)").matches) {
        layoutDirection="row";
        xsSize = 6;
    };

    return (

        <Grid container direction={layoutDirection} justifycontent="center" alignitems="center">
            <Grid item xs={xsSize}>
                <TableContainer>
                    <Table className={classes.table} size="small" aria-label="a dense table" >
                        <TableHead >
                            <TableRow >
                                <TableCell>Allocation</TableCell>
                                <TableCell align="left">Amount</TableCell>
                                <TableCell align="left">Percentage</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.allocation} >
                                    <TableCell align="left">{row.allocation}</TableCell>
                                    <TableCell align="left">{row.amount}</TableCell>
                                    <TableCell align="left">{row.percentage}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            <Grid item xs={xsSize}>
                <Pie
                    ref={chartRef}
                    data={{
                        labels: labels,
                        datasets: dataset,
                    }}
                    options={dataset.options}
                />
            </Grid>
        </Grid>
    );
}