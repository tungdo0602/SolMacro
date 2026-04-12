const { parentPort } = require("node:worker_threads");

parentPort.on("message", function(touchManager){
    setInterval(() => {
        touchManager.touch("blank");
    }, 300000); // 5 mins
});