import React from 'react';
import { ChartWeather } from '../components/ChartWeather';
import { IWeather } from '../interfaces/weather';

type TwoDaysPageProps = {
  items: IWeather
}

export const TwoDaysPage: React.FC<TwoDaysPageProps> = ({ items }) => {
  let time = items.hourly.map(val => val.dt);
  return (
    <div className='row row-cols-2'>
      <div className='col'>
        <ChartWeather
          time={time}
          data={items.hourly.map(val => +(val.temp - 273).toFixed(1))}
          opt={{
            beginAtZero: false,
            step: 30
          }}
          labels={{
            title: 'Температура за 2 дня',
            xLabel: 'Время',
            yLabel: 'Температура, °C'
          }}
        />
      </div>
      <div className='col'>
        <ChartWeather
          time={time}
          data={items.hourly.map(val => val.pop)}
          opt={{
            beginAtZero: true,
            step: 30
          }}
          labels={{
            title: 'Вероятность выпадения осадков',
            xLabel: 'Время',
            yLabel: '%'
          }}
        />
      </div>
      <div className='col'>
        <ChartWeather
          time={time}
          data={items.hourly.map(val => val.wind_speed)}
          opt={{
            beginAtZero: true,
            step: 30
          }}
          labels={{
            title: 'Скорость ветра',
            xLabel: 'Время',
            yLabel: 'м/с'
          }}
        />
      </div>
      <div className='col'>
        <ChartWeather
          time={time}
          data={items.hourly.map(val => val.humidity)}
          opt={{
            beginAtZero: true,
            step: 30
          }}
          labels={{
            title: 'Влажность',
            xLabel: 'Время',
            yLabel: '%'
          }}
        />
      </div>
    </div>
  )
}