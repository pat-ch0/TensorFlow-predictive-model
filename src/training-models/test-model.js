import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'

export class TestModel {
    #model = null
    #inputData = null
    #normalizedData = null

    constructor(model, inputData, normalizedData) {
        this.#model = model
        this.#inputData = inputData
        this.#normalizedData = normalizedData
    }

    run() {
        const [xs, preds] = tf.tidy(() => {
            const xs = tf.linspace(0, 1, 100)
            const preds = this.#model.predict(xs.reshape([100, 1]))

            // Unnormalized datas
            const {inputMax, inputMin, labelMax, labelMin} = this.#normalizedData
            const unNormXs = xs.mul(inputMax.sub(inputMin)).add(inputMin)
            const unNormPreds = preds.mul(labelMax.sub(labelMin)).add(labelMin)

            return [unNormXs.dataSync(), unNormPreds.dataSync()]
        })

        // Predicted points vs Original points
        const predictedPoints = Array.from(xs).map((val, i) => {
            return {x: val, y: preds[i]}
        })

        const originalPoints = this.#inputData.map((data) => {
            return {x: data.horsepower, y: data.mpg}
        })

        // Rendering
        tfvis.render.scatterplot(
            {name: 'Model prediction vs Original data'},
            {
                values: [originalPoints, predictedPoints],
                series: ['Original', 'Predicted']
            },
            {
                xLabel: 'Horsepower',
                yLabel: 'MPG',
                height: 300
            }
        )
    }
}