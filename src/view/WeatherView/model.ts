import { createStore } from "effector";
import {
  fetchDataFx,
  fetchForecastFx,
  WeatherData,
  ForecastData,
} from "../../services/api";

export const $weather = createStore<WeatherData | null>(null).on(
  fetchDataFx.doneData,
  (_, weather) => weather
);

export const $forecast = createStore<ForecastData[] | null>(null).on(
  fetchForecastFx.doneData,
  (_, forecast) => forecast
);
