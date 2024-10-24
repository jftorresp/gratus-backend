const mongoose = require('mongoose');
const { Schema } = mongoose;

const inventoyDataSchema = new Schema({
    username: String,
    idFirstCard: Number,
    idSecondCard: Number,
    idThirdCard: Number,
    idFourthCard: Number,
    idFiveCard: Number,
    idSixthCard: Number,
});

mongoose.model('inventoryData', inventoyDataSchema);