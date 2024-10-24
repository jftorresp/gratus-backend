const mongoose = require('mongoose');
const { Schema } = mongoose;

const progressSchema = new Schema({
    username: String,
    currentWorld: Number,
    gratBarState: String,
    world1Scene: Number,
    world2Scene: Number,
    world3Scene: Number,
    gratix: Number,
    //Movimiento
    playerXpos: String,
    playerYpos: String,
    //Grati
    gratiCustom:[],
    gratiSceneCustom:[],
    //-------
    //Mundo 1
    M1_moment1: Number,
    M1_moment2: Number,
    M1_moment3: Number,
    //Datos Nivel1
    M1_tutorial: Boolean,
    M1_act1: Boolean,
    M1_radar: Boolean,
    M1_gratBar: Boolean,
    M1_custom: Boolean,
    M1_cavernM: Boolean,
    M1_end_1: Boolean,
    M1_missionLog: Boolean,
    M1_wordSearch: Boolean,
    M1_caveRadar: Boolean,
    M1_end_2: Boolean,
    //Datos Nivel1_2
    M1_emoCard: Boolean,
    M1_bridge: Boolean,
    M1_gratStory: Boolean,
    M1_caveLvl2: Boolean,
    M1_end_3: Boolean,
    //Mundo2
    M2_moment1: Number,
    M2_moment2: Number,
    //Datos Nivel1
    M2_gratGame: Boolean,
    M2_hazeGame: Boolean,
    M2_trunkGame: Boolean,
    M2_end_1: Boolean,
    //Datos Nivel2
    M2_pairs: Boolean,
    M2_gratMeaning: Boolean,
    M2_gratPlan: Boolean,
    M2_gratRadar: Boolean,
    M2_end_2: Boolean,
    //Mundo3
    M3_moment1: Number,
    //Datos Nivel
    M3_matrixGame:Boolean,
    M3_end_1: Boolean,
    M3_runner: Boolean,
    M3_gratiRes: Boolean,
    M3_end_2: Boolean,
    M3_feelings: Boolean,
    M3_end_3: Boolean
    
    
});

mongoose.model('progressData', progressSchema);