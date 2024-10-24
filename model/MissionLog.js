const mongoose = require('mongoose');
const { Schema } = mongoose;

const missionLogSchema = new Schema({
    username: String,
    nombreML: String,
    nPages: Number,
    m1_wordSearch1: String,
    m1_wordSearch2: String,
    m1_wordSearch3: String,
    m1_iStickers:[],
    m1_gratStory: String,
    m2_mono:String,
    m2_mono4:String,
    m2_idStickerPlan:Number,
    m2_planName:String,
    m2_planG1:String,
    m2_planG2:String,
    m2_planG3:String,
    m2_planG4:String,
    m3_mono1RG:String,
    m3_mono2RG:String,
    m3_mono3RG:String,
    m3_mono4RG:String,
    m3_idMono2RG:Number,
    m3_idMono3RG:Number,
    m3_idMono4RG:Number,
    m3_feelings:String

});

mongoose.model('missionLog', missionLogSchema);