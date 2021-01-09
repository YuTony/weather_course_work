import React from 'react';

import { ChartWeather } from "../components/ChartWeather";
import { IWeather } from "../interfaces/weather";

type TodayPageProps = {
  items: null | IWeather
}

export const TodayPage: React.FC<TodayPageProps> = ({ items }) => {
  return (
    <>
      <div className='row text-center'>
        <div className='col card1'>
          <div className='temperature-text'>Температура</div>
          {/* <br /> */}
          <div className='temperature-val'>{(items!.current.temp - 273).toFixed(1)} °C</div>
        </div>
        <div className='col-auto card1'>
          <img
            src={`http://openweathermap.org/img/wn/${items!.current.weather[0].icon}@4x.png`}
            alt='Сдесь была картинка'
          />
          <div>{items!.current.weather[0].description.toUpperCase()}</div>
        </div>
        <div className='col card1'>
          <div className='wind_speed-text'>Максимальная скорость ветра</div>
          <div className='wind_speed-val'>
            {items!.current.wind_speed} м/с
                </div>
        </div>
        <div className='col card1'>
          <div className='humidity-text'>Влажность</div>
          <div className='humidity-val'>
            {items!.current.humidity} %
                </div>
        </div>
      </div>
      {
        'minutely' in items!
          ? <ChartWeather
            labels={{
              title: "Осадки на ближайший час",
              xLabel: "Время",
              yLabel: "Осадки, мм",
            }}
            opt={{
              beginAtZero: true,
              step: 5
            }}
            data={items!.minutely.map(val => val.precipitation)}
            time={items!.minutely.map(val => val.dt)}
          />
          : "Ой! Невозможно отобразить минутный прогноз для данного местоположения"
      }
    </>
  )
}
