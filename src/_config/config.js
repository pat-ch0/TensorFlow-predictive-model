export class Config {
    static #DATA_ENDPOINT = 'https://storage.googleapis.com/tfjs-tutorials/carsData.json'
    static #GALLON_TO_LITER = 3.78541
    static #MILES_TO_KILOMETER = 1.60934

    get DATA_ENDPOINT() {
        return Config.#DATA_ENDPOINT
    }

    get GALLON_TO_LITER() {
        return Config.#GALLON_TO_LITER
    }

    get MILES_TO_KILOMETER() {
        return Config.#MILES_TO_KILOMETER
    }
}