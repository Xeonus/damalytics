import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
}));

function CalculatorForm(props) {

  console.log("Props from parent", props);
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
        <TextField
          id="newMultiplier"
          label="Burn Bonus"
          multiline
          rowsMax={1}
          type="number"
          disabled id="standard-disabled"
          value={props.data.newMultiplier}
          onChange={handleChange}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          calculateNewMultiplier(props.data);
        }}>
        Calculate
      </Button>
    </form>
    //Button control


  );
}

//Redux components
const mapStateToProps = (state, props) => {
  return {
    state: props.data,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onNewMultiplier: (props) => dispatch({ type: 'CALCULATENEWMULTIPLIER' }),
    updateInput: () => dispatch({ type: 'UPDATE_INPUT' }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorForm)
