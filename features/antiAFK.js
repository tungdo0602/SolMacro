const { parentPort } = require("node:worker_threads");
const { TouchManager } = require("../core/TouchManager");
const { RobloxUI } = require("../core/gameUI/RobloxUI");
const { isRobloxFocused } = require("../core/utils");

parentPort.on("message", function(){
    setInterval(() => {
        if(isRobloxFocused()) TouchManager.touch(RobloxUI.getJumpButton());
    }, 300000); // 5 mins
});