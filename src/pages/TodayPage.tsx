import React, { useEffect, useState } from 'react';

import { IWeather } from "../interfaces/weather";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const TodayPage: React.FC = () => {
  const [error, setError] = useState<null | Object>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<null | IWeather>(null);

  useEffect(() => {
    // console.log(`https://api.openweathermap.org/data/2.5/onecall?lat=55.76&lon=37.73&exclude=alerts&appid=${API_KEY}&lang=ru`);
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=55.76&lon=37.73&exclude=&appid=${API_KEY}&lang=ru`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log("ok" + typeof result);
          setIsLoaded(true);
          setItems(result);
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          console.log("error" + typeof error);
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  // return (
  //   <p>{JSON.stringify(items)}</p>
  // )

  if (error) {
    return <div>Ошибка: {JSON.stringify(error)}</div>;
  } else if (!isLoaded || items == null) {
    return <div>Загрузка...</div>;
  } else {
    console.log(items);
    return (
      <>
        <div>
          {/* {JSON.stringify(items?.current)} */}
          {/* <img src={`http://openweathermap.org/img/wn/${items?.current.weather[0].icon}@2x.png`} alt='test' className='bg-secondary' /> */}
          <div className='container bg-secondary'>
            <div className='row'>
              <div className='col-auto'>
                <img src={`http://openweathermap.org/img/wn/${items?.current.weather[0].icon}@4x.png`} alt='test' />
              </div>
              <div className='col'>
                <div>
                  Температура: {(items!.current.temp*10-273*10)/10} C
                  <br/>
                  Скорость ветра: {items?.current.wind_speed} м/с
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}