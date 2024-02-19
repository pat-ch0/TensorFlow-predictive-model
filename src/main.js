/**
 * Entry point
 * @version 1.0.0
 * - App loading
 * @author Atos - 2024-02 <antho.patcho@outlook.fr>
 */

class Main {
    constructor() {
        this.#bootstrap()
    }

    #bootstrap() {
        console.log("Hello !")
    }
}

(
    () => {
        const app = new Main()
    }
)() // Autocalled JS function