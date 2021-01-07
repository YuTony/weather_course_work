import React, { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration } from 'chart.js';

import { IWeather } from "../interfaces/weather";

type TodayPageProps = {
  error: null | Object,
  isLoaded: boolean,
  items: null | IWeather
}

export const TodayPage: React.FC<TodayPageProps> = (props) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  let items = props.items;

  useEffect(() => {
    const ctx = chartRef.current;
    if (ctx && items!.minutely) {
      const options: ChartConfiguration = {
        type: 'line',
        data: {
          labels: items!.minutely.map(val => {
            let date = new Date(val.dt * 1000);
            let hours = date.getHours();
            let minutes = "0" + date.getMinutes();
            if (date.getMinutes() % 5 === 0)
              return `${hours}:${minutes.substr(-2)}`
            else
              return ''
          }),
          datasets: [{
            label: 'Осадки на ближайший час',
            data: items!.minutely.map(val => val.precipitation),
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)'
          }]
        },
        options: {
          title: {
            display: true,
            fontColor: "white",
            text: "Осадки на ближайший час"
          },
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fontColor: 'white'
              },
              scaleLabel: {
                display: true,
                labelString: 'Осадки, мм',
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
                labelString: 'Время',
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

  if (props.error) {
    return <div>Ошибка: {JSON.stringify(props.error)}</div>;
  } else if (!props.isLoaded || items == null) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <>
        <div>
          <div className='container bg-secondary mt-2'>
            <div className='row'>
              <div className='col-sm-2'>
                {(items!.current.temp - 273).toFixed(1)} °C
              </div>
              <div className='col-auto'>
                <img src={`http://openweathermap.org/img/wn/${items?.current.weather[0].icon}@4x.png`} alt='test' />
              </div>
              <div className='col-sm-2'>
                {items?.current.wind_speed} м/с
              </div>
              <div className='col-sm-2'>
                {items?.current.humidity} %
              </div>
            </div>
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </>
    )
  }
}