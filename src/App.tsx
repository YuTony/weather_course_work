import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import { NavBar } from "./components/NavBar";

import { IWeather } from "./interfaces/weather";
import { ICoordinates } from "./interfaces/coordinates";
import { Loading } from './loading';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

// let gps: ICoordinates = {
//   lat: 0,
//   lon: 0
// }

// const gps: ICoordinates = {
//   lat: 55.40,
//   lon: 12.33
// }

function App() {
  const [error, setError] = useState<null | Object>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<null | IWeather>(null);

  const [errorInput, setErrorInput] = useState<boolean>(false)

  const [gps, setGps] = useState<ICoordinates | null>(null);

  const errorInputFun = () => {
    console.log('dagsdgajsgdjasjdhg')
    setErrorInput(true);
    setTimeout(() => setErrorInput(false), 2000)
  }

  useEffect(() => {
    updateGps(null)
  })

  const updateGps = (newGps: ICoordinates | null, reset = false) => {
    if (!gps || reset) {
      if ("geolocation" in navigator) {
        console.log("Available");
        navigator.geolocation.getCurrentPosition((pos) => {
          setGps({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
          })
          console.log(pos.coords);
        })
      } else {
        console.log("Not Available");
      }
    } else if (newGps) {
      setError(null)
      setIsLoaded(false)
      setGps({
        lat: newGps.lat,
        lon: newGps.lon
      })
    }
  }

  useEffect(() => {
    if (gps)
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${gps.lat}&lon=${gps.lon}&exclude=&appid=${API_KEY}&lang=ru`)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            setIsLoaded(true);
            setItems(result);
          },
          (error) => {
            // console.log("error" + typeof error);
            setIsLoaded(true);
            setError(error);
          }
        )
  }, [gps])

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <NavBar updateGps={updateGps} errorInputFun={errorInputFun} />
        </header>
        <div className="alert alert-warning" style={{ position: 'fixed', display: errorInput ? 'block' : 'none' }} role="alert">
          Город не ныйден
        </div>
        <div className='container page mt-2'>
          <Loading error={error} isLoaded={isLoaded} items={items} />
        </div>
      </Router>
    </div>
  );
}

export default App;
