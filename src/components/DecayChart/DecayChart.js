import React from 'react';
import { Line } from 'react-chartjs-2';




export default function DecayCharts(props) {

  function createTimeArray(nOfDays) {
    var dayArray = [];
    for (var i = 1; i <= nOfDays; i++) {

      dayArray.push(i +" d");
    }
    return dayArray

  };

  //Color switch upon dark mode

  var cumFluxColor = 'rgb(71, 190, 163)';
  var dailyFluxColor = 'rgb(85, 97, 220)';
  if (props.themeState) {
    cumFluxColor = 'rgb(0, 255, 255)';
    dailyFluxColor = 'rgb(169, 56, 0)';
  }

  function calculateRewards(nOfDays, daysToReset, blocksPerDay, damLockedIn, decayPercentage, startingLockInMultiplier, startingMultiplier, calcType) {
    var dataArray = [];
    var dailyReward = 0;
    for (var i = 1; i <= nOfDays; i++) {
      var d = i;
      if (daysToReset !== 0) {
        if (daysToReset === d) {
          d = 1;
          daysToReset += daysToReset;
        }
      }
      if (i === 1) {
        dailyReward = blocksPerDay * 0.00000001 * damLockedIn * startingLockInMultiplier * startingMultiplier;
      } else {

        var lockInX = startingLockInMultiplier + d * (2/28)
        if (lockInX > 3) {
          lockInX = 3;
        }
        var burnX = startingMultiplier - d * startingMultiplier * (decayPercentage / 3000)
        if (burnX < 1) {
          burnX = 1;
        }
        if (calcType === "daily") {
          dailyReward = blocksPerDay * 0.00000001 * damLockedIn * lockInX * burnX;
        } else {
          dailyReward = d * blocksPerDay * 0.00000001 * damLockedIn * lockInX * burnX;
        }
      }
      dataArray.push(Number(dailyReward).toFixed(4));
    }
    return dataArray;
  };


  const chartRef = React.createRef();

  const cumulativeData = {
    labels: [...createTimeArray(60)],
    datasets: [
      {
        label: 'Daily Flux Reward',
        fill: false,
        lineTension: 0.1,
        backgroundColor: dailyFluxColor,
        borderColor: dailyFluxColor,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: dailyFluxColor,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: dailyFluxColor,
        pointHoverBorderColor: dailyFluxColor,
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
        data: [...calculateRewards(60, 0, props.data.blocksPerDay, props.data.damLockedIn, props.data.decayPercentage, props.data.lockInMultiplier, props.data.newMultiplier, "daily")]
      },
      {
        label: 'Cumulative Flux Reward',
        fill: false,
        lineTension: 0.1,
        backgroundColor: cumFluxColor,
        borderColor: cumFluxColor,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: cumFluxColor,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: cumFluxColor,
        pointHoverBorderColor: cumFluxColor,
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
        data: [...calculateRewards(60, 0, props.data.blocksPerDay, props.data.damLockedIn, props.data.decayPercentage, props.data.lockInMultiplier, props.data.newMultiplier, "cumulative")]
      },
    ],
    options : {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Flux'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Time since last mint'
          }
        }],
      },
      aspectRatio: 1     
    }

  };
  return (

    <div>
      <Line ref={chartRef} data={cumulativeData} options={cumulativeData.options} />
    </div>
  );
}