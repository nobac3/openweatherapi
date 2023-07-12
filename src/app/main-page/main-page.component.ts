import {Component, OnInit} from '@angular/core';
import {FrenchCity} from '../models/frenchCity';
import {Weather} from '../models/weather';
import {OpenWeatherMapService} from '../services/open-weather-map/open-weather-map.service';

@Component({selector: 'app-main-page', templateUrl: './main-page.component.html', styleUrls: ['./main-page.component.css']})
export class MainPageComponent implements OnInit {

    frenchCity : FrenchCity = {
        id: 0,
        nm: '',
        lat: 0,
        lon: 0
    };

    frenchCities : FrenchCity[] = []

    weather : Weather = {
        dt_txt: '',
        dt: 0,
        main: {
            temp: 0,
            temp_min: 0,
            temp_max: 0
        },
        weather:[ {
            id: 0,
            main: '',
            description: '',
            icon: ''
        }]
    };

    weatherForecast : Weather[] = []

    constructor(public openWeatherMapService : OpenWeatherMapService) {}

    ngOnInit(): void {

        this.getWeather('Abbeville');
        this.getAllFrenchCities();

    }

    public getWeather(city : string): void {

        this.openWeatherMapService.getLatLon(city).subscribe(frenchCities => {

            this.frenchCity = frenchCities[0];
            this.openWeatherMapService.getCurrentWeather(this.frenchCity.lat.toString(), this.frenchCity.lon.toString()).subscribe(weather => {
                this.weather = weather;
            });

            this.openWeatherMapService.getForecast(this.frenchCity.lat.toString(), this.frenchCity.lon.toString()).subscribe(weatherForecast => {
                this.weatherForecast = []; 

                weatherForecast.map((weather : Weather) => {

                    weather.dt = new Date(weather.dt * 1000).getDate();

                    return weather
                });

                const groupedByDate = weatherForecast.reduce(function (acc, weather) {
                    acc[weather.dt] = acc[weather.dt] || [];
                    acc[weather.dt].push(weather);
                    return acc;
                }, Object.create(null));

                Object.keys(groupedByDate).forEach((key) => {

                    const weather = groupedByDate[key].reduce((acc : Weather, weather : Weather) => {
                        acc.dt_txt = weather.dt_txt;
                        acc.main.temp_max = Math.max(acc.main.temp_max, weather.main.temp_max);
                        acc.main.temp_min = Math.min(acc.main.temp_min, weather.main.temp_min);
                        acc.weather = weather.weather;
                        return acc

                    })

                    this.weatherForecast.push(weather);

                });

                this.weatherForecast = this.weatherForecast.slice(0, 3);
                console.log(this.weatherForecast)
            });

        });
    }

    public getAllFrenchCities(): void {

        this.openWeatherMapService.getAllFrenchCities().subscribe(frenchCities => this.frenchCities = frenchCities)
    }


}
