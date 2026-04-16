const { parentPort } = require("node:worker_threads");
const { TouchManager } = require("../core/TouchManager");
const { RobloxUI } = require("../core/gameUI/RobloxUI");
const { ScreenManager } = require("../core/ScreenManager");
const { isRobloxFocused } = require("../core/utils");

parentPort.on("message", function(){
    setInterval(async () => {
        if(await isRobloxFocused()) await TouchManager.tap(...RobloxUI.getJumpButton(await ScreenManager.getResolution()));
    }, 300000); // 5 mins
});