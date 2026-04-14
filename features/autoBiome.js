const { parentPort } = require("node:worker_threads");
const { sleep, isRobloxFocused } = require("../core/utils");
const { TouchManager, ACTION_BUTTON, getActionButtonPos } = require("../core/touchManager");

const delay = 500;

async function rollBiome(){
    if(isRobloxFocused()){
        TouchManager.touch(getActionButtonPos(ACTION_BUTTON.INVENTORY));
        await sleep(delay);
        TouchManager.touch("invItems");
        await sleep(delay);
        TouchManager.typeText("strange controller");
        await sleep(delay);
        TouchManager.touch("invFirstItem");
        await sleep(delay);
        TouchManager.touch("invUse");
        await sleep(delay);
        TouchManager.touch(getActionButtonPos(ACTION_BUTTON.INVENTORY));
        console.log("Used strange controller!")
    }
    setTimeout(rollBiome, 30000);
}

parentPort.on("message", function(){
    setTimeout(rollBiome, 30000);
});