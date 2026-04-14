const { parentPort } = require("node:worker_threads");
const { TouchManager } = require("../core/touchManager");
const { isRobloxFocused } = require("../core/utils");

parentPort.on("message", function(){
    setInterval(() => {
        if(isRobloxFocused()) TouchManager.touch("jump");
    }, 300000); // 5 mins
});