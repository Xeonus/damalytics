import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


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

function createData(allocation, amount, percentage) {
    return { allocation, amount, percentage };
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function DamLockedInChart(props) {
    const classes = useStyles();

    //Use State hook to update:
    const [myDamPrice, setMyDamPrice] = useState(props.data.damPrice);

    useEffect(() => {
        setMyDamPrice(props.data.damPrice);
    }, [props.data.damPrice]);


    //Color switch upon dark mode
    var globalDamColor = 'rgb(7, 53, 189)';
    var circulatingDamColor = 'rgb(71, 190, 163)';
    var uniDamEthColor = 'rgb(255,20,147)';
    if (props.themeState) {
        circulatingDamColor = 'rgb(0, 255, 255)';
        globalDamColor = 'rgb(0, 127, 127)';
        uniDamEthColor = 'rgb(255,20,147)';
    }

    var labels = ["Global DAM Locked In", "DAM In Circulation", "DAM/ETH Uniswap V2"];
    var dataset = [{
        data: [Number(props.data.globalDamLockedIn).toFixed(2), Number(props.data.startingDamSupply - props.data.globalDamLockedIn - props.data.damEthUniswap ).toFixed(2), Number(props.data.damEthUniswap).toFixed(2)],
        backgroundColor: [globalDamColor, circulatingDamColor, uniDamEthColor],
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

    //Percentage
    const percentage = Number(100 / props.data.globalDamLockedIn * props.data.damLockedIn).toFixed(3);
    var percentageString = '';
    if (percentage < 0.01 ) {
        percentageString = '<0.01%';
    } else {
        percentageString = percentage + '%';
    }

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
                <Box m={3}>
                <Typography variant="body1" display="block" gutterBottom color="primary" component="span">
                {numberWithCommas(props.data.damLockedIn) + " DAM corresponds to " + percentageString + " of the currently locked-in DAM and has a total value of " + numberWithCommas(Number(props.data.damLockedIn * myDamPrice).toFixed(0)) + " $."}
                </Typography>
            </Box>
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