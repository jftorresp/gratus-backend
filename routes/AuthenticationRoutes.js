const mongoose = require('mongoose');
const Account = mongoose.model('accounts');
const ProgresData = mongoose.model('progressData');
const MissionLog = mongoose.model('missionLog');
const StickerData = mongoose.model('stickersData');
const InventoryData = mongoose.model('inventoryData');


const argon2i = require('argon2-ffi').argon2i;
const crypto = require('crypto');

const passwordRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,20})");

const express = require('express');
const app = express();
const PORT = 3000;

module.exports = app => {
    //Routes

    // For parsing application/json
    app.use(express.json());

    // For parsing application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }));

    app.post('/account/login', async (req, res) => {

        console.log("Entra al login");
        var response = {}

        const { rUsername, rPassword } = req.body;
        if (rUsername == null || !passwordRegex.test(rPassword)) {
            response.code = 1;
            response.msg = "Error! - Fields cannot be empty";
            res.send(response);
            return;
        }
        console.log("user = " + rUsername);
        console.log("pass = " + rPassword);

        var userAccount = await Account.findOne({ username: rUsername }, 'username adminFlag password');
        if (userAccount != null) {
            console.log("Encuentra la cuenta");

            argon2i.verify(userAccount.password, rPassword).then(async (success) => {
                console.log("info = " + success);
                if (success == true) {
                    userAccount.lastAuth = Date.now();
                    await userAccount.save();

                    response.code = 0;
                    response.msg = "Account found";
                    response.data = (({ username, adminFlag }) => ({ username, adminFlag }))(userAccount);

                    res.send(response);
                    return;

                } else {
                    response.code = 1;
                    response.msg = "Invalid Credentials!";
                    res.send(response);
                    return;
                }
            });

        } else {
            //console.log("No encuentra la cuenta");
            response.code = 1;
            response.msg = "Invalid Credentials!";
            res.send(response);
            return;
        }
    });

    app.post('/account/create', async (req, res) => {

        var response = {}
        const { rUsername, rPassword } = req.body;
        console.log(req.body);
        if (rUsername == null || rUsername.length < 3 || rUsername.length > 24) {
            response.code = 1;
            response.msg = "Invalid Credentials!";
            res.send(response);
            return;
        }

        if (!passwordRegex.test(rPassword)) {
            response.code = 3;
            response.msg = "Unsafe Password!";
            res.send(response);
            return;
        }

        var userAccount = await Account.findOne({ username: rUsername }, '_id');
        if (userAccount == null) {
            //Create a new Account
            //console.log("Create a new Account ...");

            //Generate a unique access token
            crypto.randomBytes(32, function (err, salt) {

                argon2i.hash(rPassword, salt).then(async (hash) => {

                    var newAccount = new Account({
                        username: rUsername,
                        password: hash,
                        salt: salt,
                        adminFlag: 0,

                        lastAuth: Date.now()
                    });
                    await newAccount.save();

                    var newProgressData = new ProgresData({
                        username: rUsername,
                        currentWorld: 1,
                        gratBarState: 0.0,
                        world1Scene: 1,
                        world2Scene: 4,
                        world3Scene: 6,
                        gratix: 0,
                        //Movimiento
                        playerXpos: 0.0,
                        playerYpos: 0.0,
                        //Grati
                        gratiCustom: [0, 0, 0, 0],
                        gratiSceneCustom: [0.0, 0.0, 0.0, 0.0],
                        //Mundo 1
                        M1_moment1: 0,
                        M1_moment2: 0,
                        M1_moment3: 0,
                        //Datos Nivel1
                        M1_tutorial: false,
                        M1_act1: false,
                        M1_radar: false,
                        M1_gratBar: false,
                        M1_custom: false,
                        M1_cavernM: false,
                        M1_end_1: false,
                        M1_missionLog: false,
                        M1_wordSearch: false,
                        M1_caveRadar: false,
                        M1_end_2: false,
                        //Datos Nivel1_2
                        M1_emoCard: false,
                        M1_bridge: false,
                        M1_gratStory: false,
                        M1_caveLvl2: false,
                        M1_end_3: false,
                        //Mundo2
                        M2_moment1: 0,
                        M2_moment2: 0,
                        //Datos Nivel1
                        M2_gratGame: false,
                        M2_hazeGame: false,
                        M2_trunkGame: false,
                        M2_end_1: false,
                        //Datos Nivel2
                        M2_pairs: false,
                        M2_gratMeaning: false,
                        M2_gratPlan: false,
                        M2_gratRadar: false,
                        M2_end_2: false,
                        //Mundo 3
                        M3_moment1: 0,
                        //Datos
                        M3_matrixGame: false,
                        M3_end_1: false,
                        M3_runner: false,
                        M3_gratiRes: false,
                        M3_end_2: false,
                        M3_feelings: false,
                        M3_end_3: false


                    });
                    await newProgressData.save();

                    var newMissionLog = new MissionLog({
                        username: rUsername,
                        nombreML: "",
                        nPages: 0,
                        m1_wordSearch1: "",
                        m1_wordSearch2: "",
                        m1_wordSearch3: "",
                        m1_iStickers: [0, 0, 0, 0, 0],
                        m1_gratStory: "",
                        m2_mono: "",
                        m2_mono4: "",
                        m2_idStickerPlan: 0,
                        m2_planName: "",
                        m2_planG1: "",
                        m2_planG2: "",
                        m2_planG3: "",
                        m2_planG4: "",
                        m3_mono1RG: "",
                        m3_mono2RG: "",
                        m3_mono3RG: "",
                        m3_mono4RG: "",
                        m3_idMono2RG: 0,
                        m3_idMono3RG: 0,
                        m3_idMono4RG: 0,
                        m3_feelings: ""
                    });

                    await newMissionLog.save();

                    var newStickersData = new StickerData({
                        username: rUsername,
                        numberSticker: 0,
                        s1_posx: 0.0,
                        s1_posy: 0.0,
                        s1_index: 0,
                        s1_name: "",
                        s2_posx: 0.0,
                        s2_posy: 0.0,
                        s2_index: 0,
                        s2_name: "",
                        s3_posx: 0.0,
                        s3_posy: 0.0,
                        s3_index: 0,
                        s3_name: "",
                        s4_posx: 0.0,
                        s4_posy: 0.0,
                        s4_index: 0,
                        s4_name: ""
                    });

                    await newStickersData.save();

                    var newInventoryData = new InventoryData({
                        username: rUsername,
                        idFirstCard: 5,
                        idSecondCard: 0,
                        idThirdCard: 0,
                        idFourthCard: 0,
                        idFiveCard: 0,
                        idSixthCard: 0
                    });

                    await newInventoryData.save();

                    response.code = 0;
                    response.msg = "Account has been created";
                    response.data = (({ username }) => ({ username }))(newAccount);

                    res.send(response);
                    return;
                });
            });
        } else {
            response.code = 2;
            response.msg = "Username is already taken";
            res.send(response);
        }
        return;
    });

    app.post('/account/changePass', async (req, res) => {

        var response = {}

        const { rUsername, rPassword } = req.body;
        if (rUsername == null || !passwordRegex.test(rPassword)) {
            response.code = 1;
            response.msg = "Error! - Fields cannot be empty";
            res.send(response);
            return;
        }

        var userAccount = await Account.findOne({ username: rUsername }, 'username adminFlag password');
        if (userAccount != null) {

            //Create a new Account
            //console.log("Changing pass ... = " + rPassword);

            //Generate a unique access token
            crypto.randomBytes(32, function (err, salt) {

                argon2i.hash(rPassword, salt).then(async (hash) => {

                    userAccount.password = hash;
                    userAccount.salt = salt;
                    userAccount.lastAuth = Date.now();

                    await userAccount.save();

                    response.code = 0;
                    response.msg = "Pass changed";
                    response.data = (({ username, adminFlag }) => ({ username, adminFlag }))(userAccount);

                    res.send(response);
                    return;

                });
            });


        } else {
            response.code = 1;
            response.msg = "Invalid Credentials!";
            res.send(response);
            return;
        }
    });

    app.post('/account/checkPlayer', async (req, res) => {

        //console.log("CheckPlayerExist");
        var response = {}

        const { rUsername } = req.body;
        if (rUsername == null) {
            response.code = 1;
            response.msg = "Error! - Fields cannot be empty";
            res.send(response);
            return;
        }
        //console.log("user = " + rUsername);

        var userAccount = await Account.findOne({ username: rUsername }, 'username adminFlag password');
        if (userAccount != null) {
            //console.log("Encuentra la cuenta");
            response.code = 0;
            response.msg = "Account found";
            res.send(response);
            return;
        } else {
            //console.log("No encuentra la cuenta");
            response.code = 1;
            response.msg = "Invalid Credentials!";
            res.send(response);
            return;
        }
    });
}

