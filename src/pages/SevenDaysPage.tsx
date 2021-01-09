import React from 'react';
import { IWeather } from '../interfaces/weather';

type SevenDaysPageProps = {
  items: IWeather
}

// const printDate: string = (dt: number) => {
//   const date = new Date(dt * 1000);
//   return date.toLocaleDateString();
// }

export const SevenDaysPage: React.FC<SevenDaysPageProps> = ({ items }) => {
  return (
    <ul className='row row-cols-5 justify-content-evenly'>
      {items.daily.map((day, i) => {
        return (
          <li className='col card1 text-center' key={i}>
            <div>{new Date(day.dt * 1000).toLocaleDateString()}</div>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt='Сдесь была картинка'
            />
            <div>{day.weather[0].description.toUpperCase()}</div>
            <div>{`от ${(day.temp.min - 273).toFixed(1)}°C до ${(day.temp.max - 273).toFixed(1)}°C`}</div>
            <div>Вероятность осадков: {day.pop}%</div>
            <div>Скорость ветра: {day.wind_speed} м/с</div>
          </li>
        )
      })}
    </ul>
  )
}
