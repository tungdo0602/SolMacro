const { parentPort } = require("node:worker_threads");
const { TouchManager } = require("../core/TouchManager");
const { RobloxUI } = require("../core/gameUI/RobloxUI");
const { ScreenManager } = require("../core/ScreenManager");
const { isRobloxFocused } = require("../core/utils");

parentPort.on("message", async function(){
    setInterval(() => {
        if(isRobloxFocused()){
            const res = ScreenManager.getResolution();
            await TouchManager.tap(...RobloxUI.getJumpButton(res));
        }
    }, 300000); // 5 mins
});