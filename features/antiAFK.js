const { parentPort } = require("node:worker_threads");
const { TouchManager } = require("../core/touchManager");

parentPort.on("message", function(){
    setInterval(() => {
        TouchManager.touch("blank");
    }, 300000); // 5 mins
});