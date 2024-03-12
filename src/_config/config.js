export class Config {
    static #DATA_ENDPOINT = 'https://storage.googleapis.com/tfjs-tutorials/carsData.json'
    static #GALLON_TO_LITER = 3.78541
    static #MILES_TO_KILOMETER = 1.60934

    static get DATA_ENDPOINT() {
        return Config.#DATA_ENDPOINT
    }

    static get GALLON_TO_LITER() {
        return Config.#GALLON_TO_LITER
    }

    static get MILES_TO_KILOMETER() {
        return Config.#MILES_TO_KILOMETER
    }
}