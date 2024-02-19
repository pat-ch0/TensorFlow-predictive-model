import * as tf from '@tensorflow/tfjs'

export class SequentialModel {
    getModel() {
        const model = tf.sequential()

        // Add first layer
        model.add(tf.layers.dense({
            inputShape: [1],
            units: 1,
            useBias: true
        }))

        // Output layer
        model.add(tf.layers.dense({
            units: 1,
            useBias: true
        }))

        return model
    }
}