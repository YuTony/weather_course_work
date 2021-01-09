import React, { useEffect, useRef } from 'react';

import { Chart, ChartConfiguration } from 'chart.js';

type ChartWeatherProps = {
  labels: {
    title: string,
    xLabel: string,
    yLabel: string
  },
  opt: {
    beginAtZero: boolean,
    step: number
  }
  time: number[],
  data: number[]
}

export const ChartWeather: React.FC<ChartWeatherProps> = ({ labels, opt, time, data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = chartRef.current;
    if (ctx) {
      const options: ChartConfiguration = {
        type: 'line',
        data: {
          labels: time.map(val => {
            let date = new Date(val * 1000);
            let hours = date.getHours();
            let minutes = "0" + date.getMinutes();
            if (date.getMinutes() % opt.step === 0)
              return `${hours}:${minutes.substr(-2)}`
            else
              return ''
          }),
          datasets: [{
            label: labels.title,
            data: data,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)'
          }]
        },
        options: {
          title: {
            display: true,
            fontColor: "white",
            text: labels.title
          },
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: opt.beginAtZero,
                fontColor: 'white'
              },
              scaleLabel: {
                display: true,
                labelString: labels.yLabel,
                fontColor: 'white'
              },
              gridLines: {
                color: 'white'
              }
            }],
            xAxes: [{
              ticks: {
                fontColor: 'white'
              },
              scaleLabel: {
                display: true,
                labelString: labels.xLabel,
                fontColor: 'white'
              },
              gridLines: {
                color: 'white'
              }
            }]
          }
        }
      };
      new Chart(ctx!, options);
    }
  })

  return (
    <canvas ref={chartRef}></canvas>
  )
}