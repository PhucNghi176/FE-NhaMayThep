import React from 'react';
import { Bar } from 'react-chartjs-2';
import {BarElement, CategoryScale, Chart, LinearScale} from 'chart.js'

Chart.register(CategoryScale, LinearScale, BarElement, )

const InternshipChart = () => {

  const data = {
    labels: ['1', '2', '3'],
    datasets: [
      {
        label: 'Number of students interning',
        backgroundColor: 'rgb(65,177,55)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        barPercentage: 0.3, 
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [125, 160, 100], 
      },
    ],
  };

  // Options for the chart
  const options = {
    scales: {
        y: {
            ticks: {
              beginAtZero: true,
              stepSize: 50,
              max: 200,
              callback: function (value) {
                return value === 0 ? '' : value; 
              },
            },
          },
      x: {
        beginAtZero: true,
        max: 3,
      },
    },
  };

  return (
    <div style={{textAlign:"center"}}>
      <Bar data={data} options={options} />
      <h2>Number of students interning in January, 2023</h2>
    </div>
  );
};

export default InternshipChart;
