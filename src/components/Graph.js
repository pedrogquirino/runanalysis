import React from 'react';
import { Chart } from '@bit/primefaces.primereact.chart';

const Data = (data) => {

    return {
        labels: data.map(c => c.distanceTotal.toFixed(2)),
        datasets: [
            {
            label: 'Pace',
            data:  data.map(c => c.pace),
            fill: false,
            borderColor: '#4bc0c0'
            }
        ]
    };
};

const options = {
  scaleShowValues: true,
  title: {
    display: true,
    text: 'Pace',
    fontSize: 16
  },
  legend: {
    position: 'bottom'
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }],
    xAxes: [{
      display: false,
      ticks: {
        autoSkip: false
      } 
    }]
  }
};

const Graph = (props) => {

    const data = Data(props.data);

    return (
        <div style={{ width: 1450 }}>
            <Chart type='line' data={data} options={options} />
        </div>
    );
}
export default Graph;
