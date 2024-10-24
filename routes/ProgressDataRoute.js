const mongoose = require('mongoose');
const Account = mongoose.model('accounts');
const ProgresData = mongoose.model('progressData');
const MissionLog = mongoose.model('missionLog');
const StickerData = mongoose.model('stickersData');
const InventoryData = mongoose.model('inventoryData');

module.exports = app => {
    //Routes

    //Get the world and level current info
    app.post('/progress/getCurrentLevel', async (req, res) => {//Cambiar nombre a getCurrentLevel

        var response = {}
        const { username } = req.body;
        console.log(req.body);
        var userData = await ProgresData.findOne({ username: username });
        console.log("user data " + userData);

        response.code = 0;
        response.msg = "InitialData";
        response.data = (({ currentWorld, currentLevel }) => ({ currentWorld, currentLevel }))(userData);
        res.send(response);

    });

    //Get all progress data
    app.post('/progress/getAllProgress', async (req, res) => {
        var response = {}
        const { username } = req.body;
        //console.log(req.body);
        console.log("Entra al endpoint /progress/getAllProgress");
        var userData = await ProgresData.findOne({ username: username });
        var userMission = await MissionLog.findOne({ username: username });
        var userSticker = await StickerData.findOne({ username: username });
        var userInventory = await InventoryData.findOne({ username: username });

        //console.log("user data " + userData);
        //console.log("user Mission " + userMission);
        //console.log("user Sticker " + userSticker);
        //console.log("user Inventory " + userInventory);

        response.code = 0;
        response.msg = "Success";
        response.data = userData;
        response.mission = userMission;
        response.sticker = userSticker;
        response.inventory = userInventory;
        res.send(response);

    });

    //Set new data on progress data
    app.post('/progress/setAllProgress', async (req, res) => {

        var response = {}
        var dataReq = req.body;
        console.log("Entra al endpoint /progress/setAllProgress");
        console.error('Body de la solicitud setAllProgress:', dataReq);

        var serverData = await ProgresData.findOne({ username: dataReq.dUsername });
        var serverMission = await MissionLog.findOne({ username: dataReq.dUsername });
        var serverSticker = await StickerData.findOne({ username: dataReq.dUsername });
        var serverInventory = await InventoryData.findOne({ username: dataReq.dUsername });

        if (serverData != null) {
            console.log(`Data del usuario a guardar: ${dataReq.dUsername}`);
            //===== Progress Data ====
            serverData.gratBarState = dataReq.dGratBarState;
            serverData.currentWorld = dataReq.dCurrentWorld;
            serverData.world1Scene = dataReq.dWorld1Scene;
            serverData.world2Scene = dataReq.dWorld2Scene;
            serverData.world3Scene = dataReq.dWorld3Scene;
            serverData.playerXpos = dataReq.dPlayerXpos;
            serverData.playerYpos = dataReq.dPlayerYpos;
            serverData.gratix = dataReq.dGratix;
            //Grati
            serverData.gratiCustom[0] = dataReq.grati_skin
            serverData.gratiCustom[1] = dataReq.grati_face
            serverData.gratiCustom[2] = dataReq.grati_horn
            serverData.gratiCustom[3] = dataReq.grati_hat
            serverData.gratiSceneCustom[0] = dataReq.gratiScene_skin
            serverData.gratiSceneCustom[1] = dataReq.gratiScene_face
            serverData.gratiSceneCustom[2] = dataReq.gratiScene_horn
            serverData.gratiSceneCustom[3] = dataReq.gratiScene_hat
            //World1
            serverData.M1_moment1 = dataReq.m1Moment1;
            serverData.M1_moment2 = dataReq.m1Moment2;
            serverData.M1_moment3 = dataReq.m1Moment3;
            serverData.M1_tutorial = dataReq.m1Tutorial;
            serverData.M1_act1 = dataReq.m1Act1;
            serverData.M1_radar = dataReq.m1Radar;
            serverData.M1_gratBar = dataReq.m1GratBar;
            serverData.M1_custom = dataReq.m1Custom;
            serverData.M1_cavernM = dataReq.m1CavernM;
            serverData.M1_end_1 = dataReq.m1End1;
            serverData.M1_missionLog = dataReq.m1MissionLog;
            serverData.M1_wordSearch = dataReq.m1WordSearch;
            serverData.M1_caveRadar = dataReq.m1CaveRadar;
            serverData.M1_end_2 = dataReq.m1End2;
            serverData.M1_emoCard = dataReq.m1EmoCard;
            serverData.M1_bridge = dataReq.m1Bridge;
            serverData.M1_gratStory = dataReq.m1GratStory;
            serverData.M1_caveLvl2 = dataReq.m1CaveLvl2;
            serverData.M1_end_3 = dataReq.m1End3;
            //World2
            serverData.M2_moment1 = dataReq.m2Moment1;
            serverData.M2_moment2 = dataReq.m2Moment2;
            serverData.M2_gratGame = dataReq.m2GratGame;
            serverData.M2_hazeGame = dataReq.m2HazeGame;
            serverData.M2_trunkGame = dataReq.m2TrunkGame;
            serverData.M2_end_1 = dataReq.m2End1;
            serverData.M2_pairs = dataReq.m2Pairs;
            serverData.M2_gratMeaning = dataReq.m2GratMean;
            serverData.M2_gratPlan = dataReq.m2GratPlan;
            serverData.M2_gratRadar = dataReq.m2GratRadar;
            serverData.M2_end_2 = dataReq.m2End2;

            //World3
            serverData.M3_moment1 = dataReq.m3Moment1;
            serverData.M3_matrixGame = dataReq.m3Matrix;
            serverData.M3_end_1 = dataReq.m3End1;
            serverData.M3_runner = dataReq.m3Runner;
            serverData.M3_gratiRes = dataReq.m3GratiRes;
            serverData.M3_end_2 = dataReq.m3End2;
            serverData.M3_feelings = dataReq.m3Feeling;
            serverData.M3_end_3 = dataReq.m3End3;

            try {
                await serverData.save();
                console.log("Data de server mundos guardada exitosamente");
            } catch (error) {
                if (error.name === 'ValidationError') {
                    console.error('Error de validación:', error.message);
                } else if (error.code === 11000) {
                    console.error('Error: Documento duplicado, ya existe un registro con estos datos.');
                } else if (error.message.includes('failed to connect')) {
                    console.error('Error de conexión con la base de datos.');
                } else {
                    console.error('Error inesperado guardando Data:', error);
                }
            }

            //===== Mission Log =====
            serverMission.nombreML = dataReq.ml_name;
            serverMission.nPages = dataReq.ml_numPages;
            serverMission.m1_wordSearch1 = dataReq.ml_wordSearch1;
            serverMission.m1_wordSearch2 = dataReq.ml_wordSearch2;
            serverMission.m1_wordSearch3 = dataReq.ml_wordSearch3;
            serverMission.m1_gratStory = dataReq.ml_gratStory;
            serverMission.m1_iStickers[0] = dataReq.ml_st1;
            serverMission.m1_iStickers[1] = dataReq.ml_st2;
            serverMission.m1_iStickers[2] = dataReq.ml_st3;
            serverMission.m1_iStickers[3] = dataReq.ml_st4;
            serverMission.m1_iStickers[4] = dataReq.ml_st5;
            serverMission.m2_mono = dataReq.ml_mono;
            serverMission.m2_mono4 = dataReq.ml_mono4;
            serverMission.m2_idStickerPlan = dataReq.ml_planIndex;
            serverMission.m2_planName = dataReq.ml_planName;
            serverMission.m2_planG1 = dataReq.ml_planG1;
            serverMission.m2_planG2 = dataReq.ml_planG2;
            serverMission.m2_planG3 = dataReq.ml_planG3;
            serverMission.m2_planG4 = dataReq.ml_planG4;
            serverMission.m3_mono1RG = dataReq.ml_mono1RG;
            serverMission.m3_mono2RG = dataReq.ml_mono2RG;
            serverMission.m3_mono3RG = dataReq.ml_mono3RG;
            serverMission.m3_mono4RG = dataReq.ml_mono4RG;
            serverMission.m3_idMono2RG = dataReq.ml_id2RG;
            serverMission.m3_idMono3RG = dataReq.ml_id3RG;
            serverMission.m3_idMono4RG = dataReq.ml_id4RG;
            serverMission.m3_feelings = dataReq.ml_feeling;

            try {
                await serverMission.save();
                console.log("Data de server mission guardada exitosamente");
            } catch (error) {
                if (error.name === 'ValidationError') {
                    console.error('Error de validación:', error.message);
                } else if (error.code === 11000) {
                    console.error('Error: Documento duplicado, ya existe un registro con estos datos.');
                } else if (error.message.includes('failed to connect')) {
                    console.error('Error de conexión con la base de datos.');
                } else {
                    console.error('Error inesperado guardando Mission:', error);
                }
            }

            //===== Sticker Data =====
            serverSticker.numberSticker = dataReq.stickerNumber;
            //Sticker1
            serverSticker.s1_posx = dataReq.s1_posX;
            serverSticker.s1_posy = dataReq.s1_posY;
            serverSticker.s1_index = dataReq.s1_index;
            serverSticker.s1_name = dataReq.s1_name;
            //Sticker2
            serverSticker.s2_posx = dataReq.s2_posX;
            serverSticker.s2_posy = dataReq.s2_posY;
            serverSticker.s2_index = dataReq.s2_index;
            serverSticker.s2_name = dataReq.s2_name;
            //Sticker3
            serverSticker.s3_posx = dataReq.s3_posX;
            serverSticker.s3_posy = dataReq.s3_posY;
            serverSticker.s3_index = dataReq.s3_index;
            serverSticker.s3_name = dataReq.s3_name;
            //Sticker4
            serverSticker.s4_posx = dataReq.s4_posX;
            serverSticker.s4_posy = dataReq.s4_posY;
            serverSticker.s4_index = dataReq.s4_index;
            serverSticker.s4_name = dataReq.s4_name;

            try {
                await serverSticker.save();
                console.log("Data de server sticker guardada exitosamente");
            } catch (error) {
                if (error.name === 'ValidationError') {
                    console.error('Error de validación:', error.message);
                } else if (error.code === 11000) {
                    console.error('Error: Documento duplicado, ya existe un registro con estos datos.');
                } else if (error.message.includes('failed to connect')) {
                    console.error('Error de conexión con la base de datos.');
                } else {
                    console.error('Error inesperado guardando Sticker:', error);
                }
            }

            serverInventory.idFirstCard = dataReq.i_firstCard;
            serverInventory.idSecondCard = dataReq.i_secondCard;
            serverInventory.idThirdCard = dataReq.i_thirdCard;
            serverInventory.idFourthCard = dataReq.i_fourthCard;
            serverInventory.idFiveCard = dataReq.i_fiveCard;
            serverInventory.idSixthCard = dataReq.i_sixthCard;

            try {
                await serverInventory.save();
                console.log("Data de server inventory guardada exitosamente");
            } catch (error) {
                if (error.name === 'ValidationError') {
                    console.error('Error de validación:', error.message);
                } else if (error.code === 11000) {
                    console.error('Error: Documento duplicado, ya existe un registro con estos datos.');
                } else if (error.message.includes('failed to connect')) {
                    console.error('Error de conexión con la base de datos.');
                } else {
                    console.error('Error inesperado guardando Inventory:', error);
                }
            }

            response.code = 0;
            response.msg = "Data Updated";
            res.send(response);
            console.log("Data guardada exitosamente");
            return;
        } else {
            response.code = 1;
            response.msg = "User Not Found";
            console.log("Usuario no encontrado");
            res.send(response);
            return;
        }
    });

    //Delete all tables of account
    app.post('/progress/deleteUser', async (req, res) => {
        var response = {}
        const { rUsername } = req.body;
        console.log("Entra al endpoint /progress/deleteUser");

        var userAccount = await Account.findOne({ username: rUsername });
        if (userAccount != null) {
            console.log("Encuentra la cuenta a eliminar");

            await StickerData.findOneAndDelete({ username: rUsername });
            await ProgresData.findOneAndDelete({ username: rUsername });
            await MissionLog.findOneAndDelete({ username: rUsername });
            await InventoryData.findOneAndDelete({ username: rUsername });
            await Account.findOneAndDelete({ username: rUsername });

            response.code = 0;
            response.msg = `Success: Cuenta con usuario ${rUsername} eliminada correctamente`;
            res.send(response);
            return;
        } else {
            console.log("No encuentra la cuenta");

            response.code = 1;
            response.msg = "Error: La cuenta no existe";
            res.send(response);
            return;
        }
    });

    // Get All User Data
    app.get('/progress/getAllUserData', async (req, res) => {
        var response = {}
        console.log("Entra al endpoint /progress/getAllUserData");
        var userProgressData = await ProgresData.find();
        var userMission = await MissionLog.find();
        var userSticker = await StickerData.find();
        var userInventory = await InventoryData.find();

        console.log(`Encuentra datos de base de datos para ${userProgressData.length} usuarios`);

        const userMap = {};

        // Function to add data to the user map
        function addDataToUserMap(array, key) {
            array.forEach(item => {
                const username = item.username;
                if (!userMap[username]) {
                    userMap[username] = { username: username };
                }
                userMap[username][key] = item;
            });
        }

        // Add data from each array
        addDataToUserMap(userProgressData, 'progress');
        addDataToUserMap(userMission, 'mission');
        addDataToUserMap(userSticker, 'inventory');
        addDataToUserMap(userInventory, 'stickers');

        // Convert the user map into an array of objects
        const mergedUserData = Object.values(userMap);
        const userData = {
            total: mergedUserData.length,
            users: mergedUserData
        };

        response.code = 0;
        response.msg = "Success";
        response.data = userData;
        res.send(response);
    });
}