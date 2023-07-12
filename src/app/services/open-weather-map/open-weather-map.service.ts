import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {map} from 'rxjs/operators'
import {FrenchCity} from '../../models/frenchCity';
import {Weather} from '../../models/weather';

@Injectable({providedIn: 'root'})
export class OpenWeatherMapService {

    weather : string = "weather";

    forecast : string = "forecast";

    openWeatherMapApiUrl : string = 'https://api.openweathermap.org/data/2.5/%s?lat=%lat&lon=%lon&appid=84204d6571f09e36c92061d42b9dc27f&units=metric';

    constructor(private httpClient : HttpClient) {}

    public getCurrentWeather(lat : string, lon : string): Observable < Weather > {

        return this.httpClient.get<Weather>(this.openWeatherMapApiUrl.replace('%s', this.weather).replace('%lat', lat).replace('%lon', lon), {responseType: 'json'})

    }

    public getForecast(lat : string, lon : string): Observable < Weather[] > {

        return this.httpClient.get<any>(this.openWeatherMapApiUrl.replace('%s', this.forecast).replace('%lat', lat).replace('%lon', lon), {responseType: 'json'}).pipe(map((data) => data['list']));

    }

    public getLatLon(city : string): Observable < FrenchCity[] > {

        return this.httpClient.get<FrenchCity[]>('../../assets/cities-fr.json').pipe(map(frenchCities => frenchCities.filter(frenchCity => frenchCity.nm == city)));

    }

    public getAllFrenchCities(): Observable < FrenchCity[] > {

        return this.httpClient.get<FrenchCity[]>('../../assets/cities-fr.json');
    }

}
