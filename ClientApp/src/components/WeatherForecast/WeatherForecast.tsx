import React, { useEffect, useState } from "react";
import { GetWeatherForecastAsync } from "../../services/WeatherForecast";
import WeatherForecast from "../../models/WeatherForecast";


const InventoryList = () =>  {
    const[weatherForecast, setWeatherForecast] = useState<WeatherForecast[]>();

    useEffect(() => {
      (async () => {
        await GetWeatherForecastAsync().then(async (response:WeatherForecast[]) => {
            setWeatherForecast(response);
            console.log(response);
      });
      })();
    }, []);

    return(
    <>
    <p> Weather Forecast Component Fired!</p>
    {weatherForecast?.map((x,i) => { 
    return( 
        <div key={i}>
            <p>TempC: {x?.temperatureC}</p>
            <p>TempF: {x?.temperatureF}</p>
            <p>Summary: {x?.summary}</p>
    </div>
    )})}
    </>
    )
};
export default InventoryList;