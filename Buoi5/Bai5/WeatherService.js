import axios from 'axios';

export class WeatherService {
  static API_URL = 'https://api.weather.com/v1/current';

  static async getWeather() {
    const response = await axios.get(this.API_URL);
    return response.data; 
  }
}