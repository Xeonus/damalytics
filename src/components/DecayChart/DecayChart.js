import React from 'react';
import { Line } from 'react-chartjs-2';




  export default function DecayCharts(props) {

    console.log("DecayCharts Props: ", props.data)

    function createTimeArray(nOfDays) {
      var dayArray = [];
      for (var i = 1; i <= nOfDays; i++) {
        dayArray.push(i);
      }
      return dayArray
    
    };
    
    function calculateRewards(nOfDays, damLockedIn, decayPerDay, startingLockInMultiplier, startingMultiplier, calcType) {
      var dataArray = [];
      var dailyReward = 0;
      for (var i = 1; i <= nOfDays; i++) {
        if (i === 1) {
          dailyReward = 240 * 24 * 0.00000001 * damLockedIn * startingLockInMultiplier * startingMultiplier;
        } else {
          var lockInX = startingLockInMultiplier + i * 0.0035 * 24
          if (lockInX > 3) {
            lockInX = 3;
          }
          var burnX = startingMultiplier - i * decayPerDay
          if (burnX < 1) {
            burnX = 1;
          }
          if (calcType === "daily") {
            dailyReward = 240 * 24 * 0.00000001 * damLockedIn * lockInX * burnX;
          } else {
            dailyReward = i * 240 * 24 * 0.00000001 * damLockedIn * lockInX * burnX;
          }
        }
        dataArray.push(Number(dailyReward).toFixed(4));
      }
      return dataArray;
    };
    
    
      const chartRef = React.createRef();
    
      const data = {
        labels: [...createTimeArray(50)],
        datasets: [
          {
            label: 'Daily Flux Reward',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgb(63, 81, 181)',
            borderColor: 'rgb(63, 81, 181)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgb(63, 81, 181)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgb(63, 81, 181)',
            pointHoverBorderColor: 'rgb(63, 81, 181)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            data: [...calculateRewards(50, props.data.damLockedIn, 0.1, props.data.lockInMultiplier, props.data.newMultiplier, "daily")]
          },
          {
            label: 'Cummulative Flux Reward',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgb(115, 135, 245)',
            borderColor: 'rgb(115, 135, 245)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgb(115, 135, 245)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgb(115, 135, 245)',
            pointHoverBorderColor: 'rgb(115, 135, 245)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            data: [...calculateRewards(50, props.data.damLockedIn, 0.1, props.data.lockInMultiplier, props.data.newMultiplier, "cumulative")]
          },
        ],
          options: {
            maintainAspectRatio : false,
          }
      };
      


    return (

      <div>
        <Line ref={chartRef} data={data} />
      </div>
    );


  }