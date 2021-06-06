import React from 'react';
import { Line } from 'react-chartjs-2';

// Draws the Canvas Graph using react-chartjs-2 library
const Chart = (props) => {
  const axis = props.axis; // Data to display in chart

  return (
    <Line
      height={100}
      data={axis}
      options={{
        responsive: true,
        title: { text: "OSA TRACE", display: true },
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              mode: 'x',
            },
            pan: {
              enabled: true,
              mode: 'x'
            }
          }
        },
        scales: {
          yAxes: [
            {
              type: 'linear',
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }}
    />

  )
}

export default Chart;
