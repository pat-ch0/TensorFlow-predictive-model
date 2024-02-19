import { TensorUtils } from "../tensors/tensor-utils"
import { SequentialModel } from "../training-models/sequential-model"
import { TestModel } from "../training-models/test-model"
import { CarService } from "./cars.service"
import * as tfvis from '@tensorflow/tfjs-vis'

export class CarsPlotter {
    /**
     * @var CarService
     */
    #service = null

    constructor() {
        this.#service = new CarService()
    }

    async plot() {
        // Get cleaned data from our service
        const data = await this.#service.findAll()

        // Prepare values to be plotted
        const values = data.map((car) => ({
            x: car.horsepower,
            y: car.mpg
        }))

        // Set graph summary and datas
        tfvis.render.scatterplot(
            {
                name: 'Horsepower vs MPG'
            },
            {
                values
            },
            {
                xLabel: 'Horsepower',
                yLabel: 'MPG',
                height: 300
            }
        )

        const sequentialModel = new SequentialModel().getModel()
        tfvis.show.modelSummary(
            {name: 'Model summary'},
            sequentialModel
        )

        // Train the model
        const trainModel = new TensorUtils(data, sequentialModel)
        const trainedData = await trainModel.run()

        // Test model
        const testModel = new TestModel(sequentialModel, data, trainedData)
        await testModel.run()
    }
}