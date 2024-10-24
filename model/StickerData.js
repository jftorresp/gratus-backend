const mongoose = require('mongoose');
const { Schema } = mongoose;

const stickersDataSchema = new Schema({
    username: String,
    numberSticker: Number,
    s1_posx: String,
    s1_posy: String,
    s1_index: Number,
    s1_name: String,
    s2_posx: String,
    s2_posy: String,
    s2_index: Number,
    s2_name: String,
    s3_posx: String,
    s3_posy: String,
    s3_index: Number,
    s3_name: String,
    s4_posx: String,
    s4_posy: String,
    s4_index: Number,
    s4_name: String
});

mongoose.model('stickersData', stickersDataSchema);