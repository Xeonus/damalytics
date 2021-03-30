import React from 'react';
import { Line } from 'react-chartjs-2';

  function createLabelArray(labelLimit) {
    var labelArray = [];
    for (var i = 1; i <= labelLimit; i++) {
        labelArray.push(i +"x");
    }
    return labelArray
  };



export default function ApyCharts(props) {


    var damApy = [];
    var fluxApy = [];
    var netApy = [];
    
    for (var i = 0; i <= props.rows.length - 1; i++) {
        
        damApy.push(props.rows[i].damApy);

        if (isFinite(props.rows[i].netApy)) {
            netApy.push(props.rows[i].netApy);
         } else {
            netApy.push(null);
         };

         if (isFinite(props.rows[i].fluxApyPerYear)) {
            fluxApy.push(props.rows[i].fluxApyPerYear);
        } else {
            fluxApy.push(null);
        };
    }

  //Color switch upon dark mode
  var fluxApyColor = 'rgb(71, 190, 163)';
  var damApyColor = 'rgb(85, 97, 220)';
  var netApyColor = 'rgb(255, 121, 89)';
  if (props.themeState) {
    fluxApyColor = 'rgb(0, 255, 255)';
    damApyColor = 'rgb(0, 127, 127)';
    netApyColor = 'rgb(169, 56, 0)';
  }


  const chartRef = React.createRef();
 
  const cumulativeData = {
    labels: [...createLabelArray(10)],
    datasets: [
      {
        label: 'DAM APR',
        fill: false,
        lineTension: 0.1,
        backgroundColor: damApyColor,
        borderColor: damApyColor,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: damApyColor,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: damApyColor,
        pointHoverBorderColor: damApyColor,
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
        data: [...damApy]
      },
      {
        label: 'Flux APR',
        fill: false,
        lineTension: 0.1,
        backgroundColor: fluxApyColor,
        borderColor: fluxApyColor,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: fluxApyColor,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: fluxApyColor,
        pointHoverBorderColor: fluxApyColor,
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
        data: [...fluxApy]
      },
      {
      label: 'Net APR',
      fill: false,
      lineTension: 0.1,
      backgroundColor: netApyColor,
      borderColor: netApyColor,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: netApyColor,
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: netApyColor,
      pointHoverBorderColor: netApyColor,
      pointHoverBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 10,
      data: [...netApy]
    },
    ],
    options : {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'APR (%)'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Multiplier'
            }
          }],
        },
        maintainAspectRation: false     
      }
  };
  return (
    <div>
      <Line ref={chartRef} height={210} data={cumulativeData} options={cumulativeData.options}/>
    </div>
  );

}