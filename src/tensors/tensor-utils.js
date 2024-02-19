import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'

export class TensorUtils {
    // Datas to convert into tensors
    #datas = null
    #model = null

    constructor(datas, model) {
        this.#datas = datas
        this.#model = model
    }

    toTensor() {
        // Data rearrangement
        return tf.tidy(() => {
            // Step 1 : Shuffle datas
            tf.util.shuffle(this.#datas)

            // Step 2 : Convert into tensors
            const inputs = this.#datas.map((d) => d.horsepower)
            const labels = this.#datas.map(d => d.mpg)
            const inputTensor = tf.tensor2d(inputs, [inputs.length, 1])
            const labelTensor = tf.tensor2d(labels, [labels.length, 1])

            // Step 3 : Normalize datas to range 0-1 using min-max scaling
            const inputMax = inputTensor.max()
            const inputMin = inputTensor.min()
            const labelMax = labelTensor.max()
            const labelMin = labelTensor.min()

            const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin))
            const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin))

            return {
                inputs: normalizedInputs,
                labels: normalizedLabels,
                inputMax,
                inputMin,
                labelMax,
                labelMin
            }
        })
    }

    async trainModel (model, inputs, labels) {
        // Prepare model for training
        model.compile({
            optimizer: tf.train.adam(),
            loss: tf.losses.meanSquaredError,
            metrics: ['mse']
        })

        // Weight of sub visible
        const batchSize = 32
        // Number of integral data vision
        const epochs = 50

        // Start of model training
        return await model.fit(inputs, labels, {
            batchSize,
            epochs,
            shuffle: true,
            callbacks: tfvis.show.fitCallbacks(
                {name: 'Training Performance'},
                ['loss', 'mse'],
                {height: 200, callbacks: ['onEpochEnd']}
            )
        })
    }

    async run() {
        const tensorData = this.toTensor()
        const {inputs, labels} = tensorData

        // Process training
        await this.trainModel(this.#model, inputs, labels)
        console.log('Training is done')
        return tensorData
    }
}