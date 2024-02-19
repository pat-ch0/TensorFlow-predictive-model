import {Config} from "../_config/config"

export class CarService {
    async findAll() {
        const response = await fetch(Config.DATA_ENDPOINT)
        const payload = await response.json()

        // Data cleaning
        const carSample = payload.map((car) => {
            return {
                mpg: car.Miles_per_Gallon,
                horsepower: car.Horsepower
            }
        })
        .filter((car) => car.mpg !== null && car.horsepower !== null)

        return carSample
    }
}