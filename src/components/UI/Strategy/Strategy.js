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
                            If you have diamond hands and believe in the ecosystem, then this strategy is for you. You are maximizing your DAM stack by also increasing your FLUX output over a period of {'>'} 1 month.
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
                    <Title>DAM: Compounding with Multiple Accounts</Title>
                    <Box p={1}>
                        <Typography component={'div'} align='left'>
                            <Box fontStyle="italic" m={1} align='center'>
                                Master and slave - they better behave!
                    </Box>
                    <br></br>
                            A more advanced (and potentially gas-expensive) method is to use multiple accounts to lock-in DAM and burn FLUX. The rationale behind this strategy is that your "big stack" is unaffected by unlocks and the loss of the
                            3x lock-in bonus while a smaller account can handle that loss. Additionally, you burn FLUX from the main to the smaller account to accelerate FLUX generation. Do the following:
                            <ul>
                                <li>Wait at least 28d so that you get a 3x lock-in multiplier on the primary account</li>
                                <li>Mint at any time point to get FLUX - the longer you wait the more FLUX you potentially get.</li>
                                <li>Sell FLUX for DAM on Uniswap</li>
                                <li>Create or use a secondary address to lock-in the newly acquired DAM. Note: your primary account stays untouched!</li>
                                <li>Wait again for any desired time-period to acquire FLUX on the primary and secondary account.</li>
                                <li>Mint FLUX on the primary account. Now you can burn that FLUX on the secondary account to get a nice burn bonus.</li>
                                <li>Use the burn-multiplier on the secondary account to get even more FLUX (ideally directly mint after burn)</li>
                                <li>Sell the FLUX from the secondary (and/or primary) account to get more DAM</li>
                                <li>Unlock and re-lock additional DAM on the secondary account</li>
                                <li>Repeat...</li>
                            </ul>
                            Obviously, this method is only valuable if the gas costs are not too big. This strategy is mainly beneficial if you hold a really big amount of DAM
                            on your primary account where loss of the lock-in multiplier would have a high impact. In certain scenarios it can be beneficial to follow this strategy and acquire a nice secondary stack of DAM (and FLUX)!
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
                                <Link color="inherit" href="https://info.uniswap.org/#/pools/0xbd233d685ede81e00faaefebd55150c76778a34e" target="_blank">
                                DAM-ETH Liquidity (Uniswap V3 - 1% pool)
                        </Link>
                                </li>
                                <li><Link color="inherit" href="https://info.uniswap.org/#/pools/0x07aa6584385cca15c2c6e13a5599ffc2d177e33b" target="_blank">
                                FLUX-ETH Liquidity (Uniswap V3 - 1% pool)
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
                    <Title>Do All of the Above</Title>
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