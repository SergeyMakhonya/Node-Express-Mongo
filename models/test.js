const {Schema, model} = require('mongoose');

const testSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
});

const testModel = model('test', testSchema);

module.exports = testModel;