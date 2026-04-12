const { parentPort } = require("node:worker_threads");
const { sleep } = require("../core/utils");
const { TouchManager } = require("../core/touchManager");

const delay = 500;

async function rollBiome(){
    await TouchManager.touch("inv");
    await sleep(delay);
    await TouchManager.touch("invItems");
    await sleep(delay);
    await TouchManager.typeText("strange controller");
    await sleep(delay);
    await TouchManager.touch("invFirstItem");
    await sleep(delay);
    await TouchManager.touch("invUse");
    await sleep(delay);
    await TouchManager.touch("inv");
    setTimeout(rollBiome, 30000);
}

parentPort.on("message", function(){
    setTimeout(rollBiome, 30000);
});