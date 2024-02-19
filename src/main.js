/**
 * Entry point
 * @version 1.0.0
 * - App loading
 * @author Atos - 2024-02 <antho.patcho@outlook.fr>
 */

const { CarsPlotter } = require("./cars/cars-plotter")

class Main {
    constructor() {
        this.#bootstrap()
    }

    async #bootstrap() {
        const plot = new CarsPlotter()
        plot.plot()
    }
}

(
    () => {
        const app = new Main()
    }
)() // Autocalled JS function