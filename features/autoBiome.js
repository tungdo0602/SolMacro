const { parentPort } = require("node:worker_threads");
const { sleep, isRobloxFocused, getCurrentBiome } = require("../core/utils");
const { TouchManager } = require("../core/TouchManager");
const { Inventory, INVENTORY_BUTTON } = require("../core/gameUI/Inventory");
const { ActionBar, ACTION_BUTTON } = require("../core/gameUI/ActionBar");
const { ScreenManager } = require("../core/ScreenManager");

const delay = 500;

async function rollBiome(){
    const res = ScreenManager.getResolution();
    const biome = getCurrentBiome();
    if(isRobloxFocused() && !(biome === "GLITCHED" || biome === "CYBERSPACE" || biome === "DREAMSPACE")){
        TouchManager.touch(...ActionBar.getPos(ACTION_BUTTON.INVENTORY));
        await sleep(delay);
        TouchManager.touch(...Inventory.getPos(res, INVENTORY_BUTTON.SEARCH));
        await sleep(delay);
        TouchManager.typeText("strange controller");
        await sleep(delay);
        TouchManager.touch(...Inventory.getPos(res, INVENTORY_BUTTON.FIRST_ITEM_SLOT));
        await sleep(delay);
        TouchManager.touch(...Inventory.getPos(res, INVENTORY_BUTTON.USE));
        await sleep(delay);
        TouchManager.touch(...ActionBar.getPos(ACTION_BUTTON.INVENTORY));
        console.log("Used strange controller!");
    }
    setTimeout(rollBiome, 30000);
}

parentPort.on("message", function(){
    setTimeout(rollBiome, 30000);
});