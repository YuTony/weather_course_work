import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";

import { TodayPage } from "./pages/TodayPage";
import { TwoDaysPage } from "./pages/TwoDaysPage";
import { SevenDaysPage } from "./pages/SevenDaysPage";
import { IWeather } from './interfaces/weather';

type TodayPageProps = {
    error: null | Object,
    isLoaded: boolean,
    items: null | IWeather
}

export const Loading: React.FC<TodayPageProps> = (props) => {
    if (props.error) {
        return <div>Ошибка: {JSON.stringify(props.error)}</div>;
    } else if (!props.isLoaded || props.items == null) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <Switch>
                <Route path="/7-days">
                    <SevenDaysPage items={props.items} />
                </Route>
                <Route path="/2-days">
                    <TwoDaysPage items={props.items!}/>
                </Route>
                <Route path="/">
                    <TodayPage items={props.items!} />
                </Route>
            </Switch>
        )
    }
}
