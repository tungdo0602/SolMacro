const { parentPort } = require("node:worker_threads");
const { sleep } = require("../core/utils");

async function rollBiome(touchManager){
    touchManager.touch("inv");
    await sleep(100);
    touchManager.touch("invItems");
    await sleep(100);
    touchManager.typeText("strange controller");
    await sleep(100);
    touchManager.touch("invFirstItem");
    await sleep(100);
    touchManager.touch("invUse");
    await sleep(100);
    touchManager.touch("invClose");
    setTimeout(rollBiome, 30000);
}

parentPort.on("message", function(touchManager){
    rollBiome(touchManager);
});