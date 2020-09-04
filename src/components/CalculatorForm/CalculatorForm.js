import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
      color: "primary"
    },
    '& .MuiSlider-root': {
      margin: theme.spacing(1),
      width: '30ch',
      color: "primary"
    },
  },
  slider: {
    width: 200,
  }
}));

function CalculatorForm(props) {

  //Init styles
  const classes = useStyles();


  //Calculate new Multiplier
  function calculateNewMultiplier(input) {
    var newMultiplier = (((input.myFluxToBurn + input.myFluxBurned) / input.damLockedIn) / ((input.myFluxToBurn + input.globalFluxBurned) / input.globalDamLockedIn)) + 1;
    //If multiplier is >10, set to 10, TODO: show overburn label?
    if (newMultiplier > 10) {
      input.newMultiplier = 10;
    } else {
      input.newMultiplier = newMultiplier.toFixed(2);
    }
    //Set new multiplier:
    props.onchange({
      ...props.data,
      newMultiplier: input.newMultiplier,
      showTable: true,
    }
    );
  }

  //Form Change Handler
  function handleChange(evt) {
    props.onchange({
      ...props.data,
      [evt.target.id]: Number(evt.target.value),
    });
  }

  function handleSliderChange(evt, value) {
    props.onchange({
      ...props.data,
      decayPerDay: Number(value),
    });
  }

  function valuetext(value) {
    return `${value}`;
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Box display="flexGrow">
        <TextField
          id="myFluxToBurn"
          label="Flux To Burn"
          multiline
          rowsMax={1}
          type="number"
          value={props.data.myFluxToBurn}
          onChange={handleChange}
        />
        <TextField
          id="myFluxBurned"
          label="Flux Burned"
          multiline
          rowsMax={1}
          type="number"
          value={props.data.myFluxBurned}
          onChange={handleChange}
        />
        <TextField
          id="globalFluxBurned"
          label="Global Flux Burned"
          multiline
          rowsMax={1}
          type="number"
          value={props.data.globalFluxBurned}
          onChange={handleChange}
        />

        <TextField
          id="damLockedIn"
          label="My DAM Locked In"
          multiline
          rowsMax={1}
          type="number"
          value={props.data.damLockedIn}
          onChange={handleChange}
        />

        <TextField
          id="globalDamLockedIn"
          label="Global DAM Locked In"
          multiline
          rowsMax={1}
          type="number"
          value={props.data.globalDamLockedIn}
          onChange={handleChange}
        />

        <TextField
          id="lockInMultiplier"
          label="Lock-in Time Bonus"
          multiline
          rowsMax={1}
          type="number"
          value={props.data.lockInMultiplier}
          onChange={handleChange}
        />

        <TextField
          id="blocksPerDay"
          label="ETH Blocks per day"
          multiline
          rowsMax={1}
          type="number"
          value={props.data.blocksPerDay}
          onChange={handleChange}
        />


      <Box flexDirection="column" display="flex" alignItems="center">
          <Typography id="decayPerDayLabel" variant="caption" gutterBottom color="primary" >
            Bonus Decay Per Day
          </Typography>
          <Slider className={classes.root}
            id="decayPerDay"
            value={props.data.decayPerDay}
            min={0}
            step={0.01}
            max={2}
            getAriaValueText={valuetext}
            onChange={handleSliderChange}
            aria-labelledby="decayPerDayLabel"
            valueLabelDisplay="auto"
          />
          </Box>
          </Box>

      <Box m={1} >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            calculateNewMultiplier(props.data);
          }}>
          Calculate
      </Button>
      </Box>

      <Box m={2}>
        <Typography variant="h6" gutterBottom color="primary">
          FLUX Token Burn Bonus: {props.data.newMultiplier}
        </Typography>
      </Box>

    </form>



  );
}

export default CalculatorForm;
