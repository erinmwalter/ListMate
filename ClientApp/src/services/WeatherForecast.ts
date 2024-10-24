// Test to get the weather forecast to make sure front and backend can talk and get data between the two.
export const GetWeatherForecastAsync = async () =>
{
    console.log("In GetWeatherForecastAsync");
    return await fetch(`/api/WeatherForecast`, {
        method: "GET",
        headers : {
        "Content-Type": "application/json"
        }
    }) 
    .then((response) => response.json())
    .catch((err) => console.log(err));
}