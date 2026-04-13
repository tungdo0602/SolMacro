const { parentPort } = require("node:worker_threads");
const { TouchManager } = require("../core/touchManager");
const { isFocusedOnRoblox } = require("../core/utils");

parentPort.on("message", function(){
    setInterval(() => {
        if(isFocusedOnRoblox()) TouchManager.touch("jump");
    }, 300000); // 5 mins
});