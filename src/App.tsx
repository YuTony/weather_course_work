import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { NavBar } from "./components/NavBar";
import { TodayPage } from "./pages/TodayPage";
import { TwoDaysPage } from "./pages/TwoDaysPage";
import { SevenDaysPage } from "./pages/SevenDaysPage";

function App() {
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
              <TodayPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
