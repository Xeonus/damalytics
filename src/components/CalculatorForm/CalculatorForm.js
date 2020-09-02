import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
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
    const value = Number(evt.target.value);
    props.onchange({
      ...props.data,
      [evt.target.id]: value,
    });

    console.log("Change event props:", props)
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
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
      </div>

      <div>
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
      </div>
      <Box m={1}>
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
      <Typography variant="h6" gutterBottom color="secondary">
        FLUX Token Burn Bonus: {props.data.newMultiplier}
      </Typography>
      </Box>

    </form>
    //Button control


  );
}

export default CalculatorForm;
