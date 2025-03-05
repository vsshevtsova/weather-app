import { WeatherData } from "../../services/api";

export const CurrentWeather: React.FC<{ data: WeatherData }> = ({ data }) => {
  return (
    <div>
      <h2>{data.city}</h2>
      <p>{Math.round(data.temperature)}°C</p>
      <p>{data.description}</p>
    </div>
  );
};
