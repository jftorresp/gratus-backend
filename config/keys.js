if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
    console.log("Server configured fro production");
} else {
    module.exports = require('./dev');
    console.log("Server configured fro develop");
}