import * as tf from '@tensorflow/tfjs'

export class TensorUtils {
    // Datas to convert into tensors
    #datas = null

    constructor(datas) {
        this.#datas = datas
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
            const labelTensor = tf.tensor1d(labels, [labels.length, 1])

            // Step 3 : Normalize datas to range 0-1 using min-max scaling
            const inputMax = inputTensor.max()
            const inputMin = inputTensor.min()
            const labelMax = labelTensor.max()
            const labelMin = labelTensor.min()

            const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin))
            const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin))

            return {
                inputs: normalizedInputs,
                labels, normalizedLabels,
                inputMax,
                inputMin,
                labelMax,
                labelMin
            }
        })
    }
}