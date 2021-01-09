import React, { useRef } from 'react';
import { Link } from "react-router-dom";
import { ICoordinates } from '../interfaces/coordinates';

type NavBarProps = {
  updateGps: (newGps: ICoordinates | null) => void,
  errorInputFun: () => void
}

export const NavBar: React.FC<NavBarProps> = ({ updateGps, errorInputFun }) => {
  const ref = useRef<HTMLInputElement>(null)

  const submit = (event: React.MouseEvent) => {
    event.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ref.current!.value}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
      .then(res => res.json())
      .then(
        result => {
          // console.log(result)
          if (result.cod === 200) {
            console.log(result.coord)
            updateGps(result.coord)
          } else {
            errorInputFun()
          }
        },
        error => {
          errorInputFun()
        }
      )
      .catch(errorInputFun)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={updateGps.bind(null, null, true)}>Weather</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">Сегодня</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/2-days">2 дня</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/7-days">7 дней</Link>
            </li>
          </ul>
        </div>
        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" ref={ref} />
          <button className="btn btn-outline-success" type="submit" onClick={submit}>Search</button>
        </form>
      </div>
    </nav>
  )
}