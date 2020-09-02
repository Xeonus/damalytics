const initialState = {
    myFluxToBurn: +100.0,
    myFluxBurned: +500,
    globalFluxBurned: +111000,
    damLockedIn: +15000,
    globalDamLockedIn: +11519287.49,
    newMultiplier: +0,
    fluxPrice: +0,
    showTable: false,
    dataTable: [],
}

//Calculate new Multiplier
function calculateNewMultiplier(input) {
    var newMultiplier = (((input.myFluxToBurn + input.myFluxBurned) / input.damLockedIn) / 
    ((input.myFluxToBurn + input.globalFluxBurned) / input.globalDamLockedIn)) + 1;
    //If multiplier is >10, set to 10, TODO: show overburn label?
    if (newMultiplier > 10) {
        newMultiplier = 10;
    } else {
        newMultiplier = newMultiplier.toFixed(2);
    }
    return newMultiplier;
}

//Helper function to calculate the amount of flux to burn to achieve a certain multiplier
function calculateFluxToMultiplier(input){
var myfluxToBurn = (- input.newMultiplier * input.damLockedIn * input.globalFluxBurned  
    + input.myFluxBurned * input.globalDamLockedIn 
    + input.damLockedIn * input.myFluxBurned) / (- input.newMultiplier * input.damLockedIn + input.damLockedIn + input.globalDamLockedIn);
if (myfluxToBurn < 0) {
    myfluxToBurn = 0;
} 
return myfluxToBurn;
}

//Calculate the daily reward based on current multiplier settings
function calculateDailyRewards(input){

}

//Function to generate the multiplier list:
function generateMultiplierList(input) {

}

// Action Creator
const updateInput = (input) => (
    {
      type: 'UPDATE_INPUT',
      payload: {myFluxToBurn: input.myFluxToBurn},
    }
  )

//Reducer
const reducer = (state = initialState, action) => {
    if (action.type === 'CALCULATENEWMULTIPLIER') {
        console.log("Reducer call props", state)
        return {
            ...state,
            newMultiplier: calculateNewMultiplier(state)
        }
    }

    if (action.type === 'CALCULATEFLUXTOMULTIPLIER') {
        return {
            ...state.data,
            myFluxToBurn : calculateFluxToMultiplier(state)
        }
    }

    if (action.type === 'UPDATE_INPUT')  {
        return {
            input: action.payload
        }
    }

    return state;
};

export default reducer;