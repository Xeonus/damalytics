import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function FaqPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid item xs={12} container justify="center">
          <Box  m={2} alignItems="center" display="flex" flexDirection="row">
                <Typography variant="h5" className={classes.title} component="span">
                  Frequently Asked Questions
                </Typography>
          </Box>
        </Grid>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading} component={'div'}>How do I use the input parameters in the community calculator?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'div'}>
            
            The community calculator is intended to be as easily accessible as possible. Therefore, I created an "easy" and an "expert" mode. 
            <ul>
            <li>In "easy" mode only the most important parameters are shown. The calculator takes care of the rest.</li>
            <li>In "expert" mode you have full control over all relevant parameters such as blocks per day, decay per day, contract parameters and so on.</li>
            </ul>
            Following parameters can be adjusted in the calculator:
            <ul>
              <li><b>Flux Burned</b>: The amount of Flux you have burned on your account.</li>
              <li><b>Global Flux Burned</b>: The amount of Flux that has been burned on the entire network. This parameter is automatically fetched through etherscan.io, but feel free to adjust it.</li>
              <li><b>My DAM Locked In</b>: The amount of DAM locked in your account</li>
              <li><b>Global DAM Locked In</b>: The amount of DAM that is locked in globally. This parameter is also automatically fetched through etherscan.io</li>
              <li><b>Lock-In Time Bonus</b>: The time bonus you obtain while keeping your DAM locked in. Usually, this parameter is 3 after 29 days</li>
              <li><b>ETH Blocks per day</b>: The average amount of blocks mined on the Ethereum blockchain. This value is important to calculate days in relation to blocks for the averages in the data tables.</li>
              <li><b>Bonus Decay Per Day</b>: As users are burning Flux on the network, your Flux bonus multiplier decays over time. This value is used to substract an average amount from your multiplier per day to visualize the cumulative distribution of your acquired Flux.</li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading} component={'div'}>What do the "DAM Distribution Statistics" mean?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'div'}>
            These basic statistics show you how much DAM of the global supply is locked-up in the smart contract to generate Flux and how much is "available" / in circulation. 
            The available amount corresponds to all DAM that can be traded on exchanges and on Uniswap. A breakdown of that distribution will be provided in a future update.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading} component={'div'}>What do the "FLUX Token Burn Bonus Statistics" mean?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'div'}>
            The FLUX Token Burn Bonus Statistics help you to evaluate how much Flux you need to burn with your current configuration to get to a certain burn bonus multiplier.
            The table also provides you with an average cost estimate and how long you have to wait for a mint to recoup that investment. A 3x lock-in bonus is assumed for these values.
            <br></br>
            <br></br>
            Note that the DAM APY is actually only dependent on the DAM / FLUX price ratio and not your locked in DAM (see other FAQ item)!
            Please also note that the DAM APY does not include the Flux ROI.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading} component={'div'}>What do the Flux Rewards and distribution mean?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'div'}>
            The Flux rewards table shows you how much Flux you will earn for a given timeframe. 
            As indicated in the table, note that those values correspond to the time of mint, so the burn bonus multiplier decay does not play a role here.
            <br></br> <br></br>
              The Flux reward distribution graph gives you a more detailed view on how much Flux you could potentially mint at any given day. It fully accounts for
              multiplier decay over time and displays both the daily flux reward as the cumulative flux reward over time. The cumulative Flux reward over time
              reflects how much Flux you are expected to "accumulate" until day X. If your burn bonus multiplier is 1 the graph is linear. If your burn bonus multiplier
              is {'>'} 1 the cumulative reward is a function dependent on that decay. You can derive an appropriate decay value from the Datamine analytics platform.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading} component={'div'}>How is the DAM APY calculated? Why doesn't it change when I change my DAM amount?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'div'}>
            DAM ROI corresponds to the amount of Flux that is needed to recoup your locked-in DAM investment:
            <ul>
            damLockedIn * damPrice = 0.00000001 * numberOfUnmintedBlocks * lockInMultiplier * burnBonusMultiplier * damLockedIn * priceOfFlux
            </ul>
            Which corresponds to
            <ul>
            numberOfUnmintedBlocks = damPrice / (0.00000001 * lockInMultiplier * burnBonusMultiplier * priceOfFlux)
            </ul>
            As you can see, the ROI is only dependent on the ratio between DAM price and a constant times the price of Flux. So abstracted this gives you:
            <ul>
            ROI in days = (damPrice / lockInConstant * priceOfFlux) / ethBlocksPerDay
            </ul>
            The APY (annual percentage yield) then equates to the fraction of ROI in days vs 365 days. In the community calculator, APY is not calculated
            with compounding periods.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
export default FaqPage