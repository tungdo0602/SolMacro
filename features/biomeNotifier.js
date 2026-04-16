const { exec, spawn } = require('child_process');
const { readFileSync, writeFileSync, existsSync } = require("fs");
const { writeFile } = require("fs/promises");
const { parentPort } = require("node:worker_threads");
const split2 = require("split2");
const RPC_REGEX = /\[BloxstrapRPC.*?\}\}\}/;

let APP_CONFIG = {}
let thumbnailCache = {}

if(existsSync("./thumbnailCache.json")){
    thumbnailCache = JSON.parse(readFileSync("./thumbnailCache.json", "utf-8"));
    console.log("Loaded thumbnail cache!");
}

async function pushBiomeStatus(biome){
    exec(`termux-notification --priority min --id "st_notifier" --title "Current Biome: ${biome}"`);
}

async function sendWebhook(biome, isRareBiome, assetId = "", title = "Biome Started"){
    if(!thumbnailCache[assetId] && assetId){
        const res = await fetch(`https://thumbnails.roblox.com/v1/assets?assetIds=${assetId}&size=512x512&format=Png&isCircular=false`);
        if(res.status == 200){
            thumbnailCache[assetId] = (await res.json()).data[0].imageUrl;
            writeFileSync("./thumbnailCache.json", JSON.stringify(thumbnailCache));
        }
    }
    let body = {
        "content": (isRareBiome ? "@everyone" : ""),
        "embeds": [
            {
                "author": {
                    "name": title 
                },
                "title": biome,
                "description": `**Started at:** <t:${Math.floor(Date.now()/1000)}:R>`,
            }
        ]
    }
    if(APP_CONFIG.private_server_link){
        body["components"] = [
        {
            "type": 1,
            "components": [
                {
                    "type": 2,
                    "style": 5,
                    "label": "Join Server",
                    "emoji": null,
                    "disabled": false,
                    "url": APP_CONFIG.private_server_link
                }
            ]
        }
        ]
    }
    if(thumbnailCache[assetId]) body.embeds[0].thumbnail = {"url": thumbnailCache[assetId]}
    const res = await fetch(`${APP_CONFIG.webhook.url}?with_components=true`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    if(res.status !== 204){
        console.log(`Failed to send webhook [${res.status}]`);
    }
}

console.log("Make sure to enable shizuku before start!");

let biomes = [];
let prevState = "";
let prevBiome = "";

function startNotifier(){
    for(const biome in APP_CONFIG.webhook_notification){
        if(APP_CONFIG.webhook_notification[biome]) biomes.push((biome === "SANDSTORM" ? "SANDSTORM" : biome));
    }
    if(APP_CONFIG.webhook.enable && APP_CONFIG.webhook.url) sendWebhook("Biome Notifier started!", false, "", "Status");
    if(APP_CONFIG.push_current_biome_notification) pushBiomeStatus("UNKNOWN");
    spawn("rish", ["-c", "logcat -c"]);
    const logcat = spawn("rish", ["-c", "logcat"]);

    logcat.stdout.pipe(split2()).on("data", (line) => {
        const text = line.toString();
        const res = text.match(RPC_REGEX);
        if(res){
            const rpcData = JSON.parse(res[0].slice(15)).data;
            if(rpcData.smallImage && rpcData.smallImage.hoverText === "Sol's RNG" && rpcData.largeImage){
                const biome = rpcData.largeImage.hoverText;
                const state = rpcData.state;

                //if(state === "In Main Menu") return; // reason why it spam webhook

                const assetId = rpcData.largeImage.assetId;
                // First condition check if the action is equip aura lol
                if((state == prevState || !prevState) && (biome !== prevBiome)){
                    if(biomes.includes(biome)){
                        let isRareBiome = (biome == "GLITCHED" || biome == "DREAMSPACE" || biome == "CYBERSPACE");
                        if(isRareBiome){
                            if(APP_CONFIG.rare_biome_actions.toast) exec(`termux-toast "${biome} just started!!!"`);
                            if(APP_CONFIG.rare_biome_actions.vibrate) exec("termux-vibrate");
                        }
                        if(APP_CONFIG.webhook.enable && APP_CONFIG.webhook.url) sendWebhook(biome, isRareBiome, assetId);
                    }
                    prevBiome = biome;
                    writeFile("./biomeCache.txt", biome);
                    if(APP_CONFIG.push_current_biome_notification) pushBiomeStatus(biome);
                }
                prevState = state;
            }
        }
    });
}

parentPort.on("message", function(data){
    APP_CONFIG = data;
    startNotifier();
});