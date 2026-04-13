const { parentPort } = require("node:worker_threads");
const { sleep, isFocusedOnRoblox } = require("../core/utils");
const { TouchManager, ACTION_BUTTON, getActionButtonPos } = require("../core/touchManager");

const delay = 500;

async function rollBiome(){
    if(isFocusedOnRoblox()){
        console.log("Using strange controller...");
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
    }
    setTimeout(rollBiome, 30000);
}

parentPort.on("message", function(){
    setTimeout(rollBiome, 30000);
});