import {Temperature} from "./temperature";
import {WeatherDescription} from "./weatherDescription";

export interface Weather {

    dt: number,
    dt_txt: string,
    main: Temperature,
    weather: WeatherDescription[]
}
