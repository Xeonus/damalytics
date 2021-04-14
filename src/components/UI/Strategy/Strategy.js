import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Title from './../Title';
import Link from "@material-ui/core/Link";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
    },
    paper: {
        '@media only screen and (min-width: 600px)': {
            padding: theme.spacing(1),
        },
        textAlign: 'center',
        align: 'center',
        justifyContent: 'center',
    },
}));

function StrategyPage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
             <Grid container={true} spacing={2} className={classes.root} component="span" >
            <Grid item xs={12} container justify="center">
                <Box m={2} alignItems="center" display="flex" flexDirection="row">
                    <Typography variant="h5" className={classes.title} component="span">
                        Ecosystem Strategies
                </Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={3} className={classes.paper}>
                    <Title>FLUX: Buy, Burn, Mint, Repeat</Title>
                    <Box p={1}>
                        <Typography component={'div'} align='left'>
                            <Box fontStyle="italic" m={1} align='center'>
                                I burn, therefore I am! - Anonymous
                    </Box>
                    <br></br>
                            With this strategy you are continuously trying to maximize your FLUX output with your locked-in DAM. The idea is that before each mint
                            you burn a certain amount of FLUX to get more Flux from the burn multiplier. For this purpose, the community calculator is an excellent tool
                            to maximize your profits and ideally get a net positive FLUX amount in the process.
                            <br></br>
                            <br></br>
                            Consider these steps when following this strategy to get a net positive mint (immediately get back your burn investment):
                            <ul>
                                <li>Put in your parameters in easy mode. If you already burned some FLUX, add that amount too</li>
                                <li>Click calculate</li>
                                <li>Decide which target you want to achieve - e.g. 2x</li>
                                <li>Check FLUX Token Burn Bonus Metrics and identify the FLUX ROI (~d) entry</li>
                                <li>You need to wait at least FLUX ROI (~d) to get a zero sum return, any longer wait will get you net positive FLUX returns directly at mint</li>
                                <li>Make sure that the values match your desired target with the decentralized dashboard </li>
                                <li>Buy FLUX for the desired multiplier</li>
                                <li>Burn it on the decentralized dashboard</li>
                                <li>Immediately mint FLUX - you should now have more FLUX than you bought!</li>
                            </ul>
                            Important: go to expert mode in the community calculator and adjust the "blocks per day value" to the one of the decentralized dashboard (e.g. 5760 blocks per day). 
                            If you burn a big amount, you might influence the whole ecosystem and might get a smaller multiplier than expected!
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={3} className={classes.paper}>
                    <Title>DAM: Compounding</Title>
                    <Box p={1}>
                        <Typography component={'div'} align='left'>
                            <Box fontStyle="italic" m={1} align='center'>
                                Compounding for the patient minter
                    </Box>
                    <br></br>
                            If you have diamond hands and believe in the ecosystem, then this strategy is your you. You are looking to maximize your DAM stack by also increasing your FLUX output over a period {'>'} 1 month.
                            This strategy is pretty simple:
                            <ul>
                                <li>Wait at least 28d that you get a 3x lock-in multiplier</li>
                                <li>Mint at any time point to get FLUX - the longer you wait the more FLUX you potentially get.</li>
                                <li>Sell FLUX for DAM on Uniswap</li>
                                <li>Unlock DAM - caution: your lock-in multiplier will reset and any unminted FLUX is lost forever!</li>
                                <li>Lock-in your previous DAM + your newly bought DAM</li>
                                <li>Wait again for {'>'} 28d</li>
                                <li>Repeat...</li>
                            </ul>
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={3} className={classes.paper}>
                    <Title>Provide Liquidity</Title>
                    <Box p={1}>
                        <Typography component={'div'} align='left'>
                            <Box fontStyle="italic" m={1} align='center'>
                                Be your own bank and collect fees!
                    </Box>
                    <br></br>
                            Providing liquidity on UniSwap is an exciting possibility to earn trading fees. You can do this for both FLUX and DAM:
                            <ul>
                                <li>
                                <Link color="inherit" href="https://info.uniswap.org/pair/0x447f8d287120b66f39856ae5ceb01512a7a47444" target="_blank">
                                DAM-ETH Liquidity
                        </Link>
                                </li>
                                <li><Link color="inherit" href="https://info.uniswap.org/pair/0x27fa67302c513f5512bbfa5065800c2d7b3871f4" target="_blank">
                                FLUX-ETH Liquidity
                        </Link></li>
                            </ul>
                            Important: inform yourself about the risks associated with providing liquidity. This involves impermanent loss and other factors.
                            Read up on providing liquidity before doing so!
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={3} className={classes.paper}>
                    <Title>Do all of the above</Title>
                    <Box p={1}>
                        <Typography component={'div'} align='left'>
                            <Box fontStyle="italic" m={1} align='center'>
                                Shotgun approach is the best approach!
                    </Box>
                    <br></br>
                           You can of course combine all strategies to maximize your returns on the DAM / FLUX ecosystem. For example:
                           <ul>
                                <li>Time your burns to get more FLUX</li>
                                <li>Use that FLUX to sell half of it for ETH and provide liquidity - earn fees and more FLUX in the process</li>
                                <li>Use collected fees from Uniswap to burn and mint more, and buy DAM</li>
                                <li>Provide liquidity for DAM, lock-in or unlock DAM</li>
                                <li>Profit!</li>
                            </ul>
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
            </Grid>
        </div>
    );
}
export default StrategyPage