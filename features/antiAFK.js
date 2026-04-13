const { parentPort } = require("node:worker_threads");
const { TouchManager } = require("../core/touchManager");

parentPort.on("message", function(){
    setInterval(() => {
        TouchManager.touch("jump");
    }, 300000); // 5 mins
});