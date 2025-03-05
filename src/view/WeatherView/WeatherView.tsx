import { useUnit } from "effector-react";
import { CurrentWeather } from "../../components/CurrentWeather/CurrentWeather";
import { Search } from "../../components/Search/Search";
import { fetchWeather, fetchForecast } from "../../services/api";
import { $weather } from "./model";
import { $forecast } from "./model";
import { Forecast } from "../../components/Forecast/Forecast";
import "./WeatherView.scss";

export const WeatherView = () => {
  const weatherData = useUnit($weather);
  const forecastData = useUnit($forecast);

  const handleSearchSubmit = (city: string) => {
    fetchWeather({ city });
    fetchForecast({ city });
  };

  return (
    <div className="weatherView">
      <Search onSubmit={handleSearchSubmit} />
      {weatherData && <CurrentWeather data={weatherData} />}
      {forecastData && <Forecast data={forecastData} />}
    </div>
  );
};
