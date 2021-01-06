import React from 'react';
import { Link } from "react-router-dom";

export const NavBar: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Weather</Link>
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
            </div>
        </nav>
    )
}