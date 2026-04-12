const { parentPort } = require("node:worker_threads");
const { sleep } = require("../core/utils");
const { TouchManager } = require("../core/touchManager");

async function rollBiome(){
    TouchManager.touch("inv");
    await sleep(100);
    TouchManager.touch("invItems");
    await sleep(100);
    TouchManager.typeText("strange controller");
    await sleep(100);
    TouchManager.touch("invFirstItem");
    await sleep(100);
    TouchManager.touch("invUse");
    await sleep(100);
    TouchManager.touch("invClose");
    setTimeout(rollBiome, 30000);
}

parentPort.on("message", function(){
    rollBiome();
});