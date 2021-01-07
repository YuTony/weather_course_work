import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { NavBar } from "./components/NavBar";
import { TodayPage } from "./pages/TodayPage";
import { TwoDaysPage } from "./pages/TwoDaysPage";
import { SevenDaysPage } from "./pages/SevenDaysPage";

import { IWeather } from "./interfaces/weather";
import { ICoordinates } from "./interfaces/coordinates";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const gps: ICoordinates = {
  lat: 55.76,
  lon: 37.73
}

// const gps: ICoordinates = {
//   lat: 55.40,
//   lon: 12.33
// }

function App() {
  const [error, setError] = useState<null | Object>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<null | IWeather>(null);

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${gps.lat}&lon=${gps.lon}&exclude=&appid=${API_KEY}&lang=ru`)
      .then(res => res.json())
      .then(
        (result) => {
          // console.log("ok" + typeof result);
          setIsLoaded(true);
          setItems(result);
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          // console.log("error" + typeof error);
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <NavBar />
        </header>
        <div className='container'>
          <Switch>
            <Route path="/7-days">
              <SevenDaysPage />
            </Route>
            <Route path="/2-days">
              <TwoDaysPage />
            </Route>
            <Route path="/">
              <TodayPage error={error} isLoaded={isLoaded} items={items}/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
