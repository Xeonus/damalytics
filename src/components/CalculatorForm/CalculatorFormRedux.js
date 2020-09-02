import React from 'react';
import {useState } from 'react';
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




function CalculatorFormRedux(props) {
    console.log(props);

//Init styles
  const classes = useStyles();

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
          //onChange={props.updateInput}
        />
        <TextField
          id="myFluxBurned"
          label="Flux Burned"
          multiline
          rowsMax={1}
          type="number"
          value={props.data.myFluxBurned}
          //onChange={handleChange}
        />
        <TextField
          id="globalFluxBurned"
          label="Global Flux Burned"
          multiline
          rowsMax={1}
          type="number"
          value={props.data.globalFluxBurned}
          //onChange={handleChange}
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
          //onChange={handleChange}
        />
        <TextField
          id="globalDamLockedIn"
          label="Global DAM Locked In"
          multiline
          rowsMax={1}
          type="number"
          value={props.data.globalDamLockedIn}
          //onChange={handleChange}
        />
        <TextField
          id="newMultiplier"
          label="New Multiplier"
          multiline
          rowsMax={1}
          type="number"
          value={props.data.newMultiplier}
          //onChange={handleChange}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          props.onNewMultiplier(props.data)
        }}>
        Calculate
      </Button>
    </form>
    //Button control


  );
}

//Redux components
const mapStateToProps = state => {
    return {
        ...state,
        newMultiplier: state.newMultiplier
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onNewMultiplier: () => dispatch({type: 'CALCULATENEWMULTIPLIER'}),
        updateInput: () => dispatch({type: 'UPDATE_INPUT'}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorFormRedux)
