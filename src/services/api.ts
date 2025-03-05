import { createEffect, createEvent } from "effector";
import axios from "axios";

const API_KEY = "b5f32516eabd87064424be661e472e15";
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast`;

export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  icon: string;
}

export interface ForecastData {
  city: string;
  date: string;
  temperature: number;
  description: string;
  icon: string;
}

export const fetchDataFx = createEffect<{ city: string }, WeatherData, Error>(
  async ({ city }) => {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
        lang: "ru",
      },
    });

    return {
      city: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`,
    };
  }
);

export const fetchForecastFx = createEffect<
  { city: string },
  ForecastData[],
  Error
>(async ({ city }) => {
  const response = await axios.get(FORECAST_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
      lang: "ru",
    },
  });

  // Отбираем прогноз на 5 дней (по одному прогнозу на день)
  const forecast = response.data.list
    .filter((item: any, index: number) => index % 8 === 0)
    .slice(0, 5); // Каждые 8 часов в прогнозе

  return forecast.map((item: any) => ({
    city: response.data.city.name,
    date: new Date(item.dt * 1000).toLocaleDateString("ru-RU", {
      month: "numeric",
      day: "numeric",
    }),
    temperature: item.main.temp,
    description: item.weather[0].description,
    icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
  }));
});

export const fetchWeather = createEvent<{ city: string }>();
export const fetchForecast = createEvent<{ city: string }>();

fetchWeather.watch(({ city }) => {
  fetchDataFx({ city });
});

fetchForecast.watch(({ city }) => {
  fetchForecastFx({ city });
});

fetchDataFx.fail.watch((error) => {
  console.error("Ошибка при загрузке данных:", error);
});

fetchForecastFx.fail.watch((error) => {
  console.error("Ошибка при загрузке прогноза:", error);
});

fetchDataFx.doneData.watch((data) => {
  console.log("Погода получена", data);
});

fetchForecastFx.doneData.watch((data) => {
  console.log("Прогноз на 5 дней получен:", data);
});
