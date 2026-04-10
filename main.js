let APP_CONFIG = {
    push_current_biome_notification: true,
    rare_biome_actions: {
        toast: true,
        vibrate: true
    },
    webhook: {
        enable: false,
        url: ""
    },
    private_server_link: "",
    notification: {
        NORMAL: false,
        WINDY: false,
        SNOWY: false,
        RAINY: true,
        SANDSTORM: true,
        HELL: true,
        STARFALL: true,
        HEAVEN: true,
        CORRUPTION: true,
        NULL: true,
        GLITCHED: true,
        DREAMSPACE: true,
        CYBERSPACE: true
    }
}

const { readFileSync, writeFileSync, existsSync } = require("fs");
const split2 = require("split2");

console.clear();

if(existsSync("./config.json")){
    APP_CONFIG = JSON.parse(readFileSync("./config.json", "utf-8"));
    console.log("Loaded config!");
} else {
    writeFileSync("./config.json", JSON.stringify(APP_CONFIG, null, 4));
    console.log("Created config file! Please open config.json and change the settings.");
    process.exit();
}

const { exec } = require('child_process');

let thumbnailCache = {}

if(existsSync("./thumbnailCache.json")){
    thumbnailCache = JSON.parse(readFileSync("./thumbnailCache.json", "utf-8"));
    console.log("[Notifier] Loaded thumbnail cache!");
}

async function sendWebhook(biome, isRareBiome, assetId = ""){
    if(!thumbnailCache[assetId]){
        let res = await fetch(`https://thumbnails.roblox.com/v1/assets?assetIds=${assetId}&size=512x512&format=Png&isCircular=false`);
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
                    "name": "Biome Started"
                },
                "title": biome,
                "description": `**Started at:** <t:${Math.floor(Date.now()/1000)}:R>`,
            }
        ],
        "components": [
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
        ],
    }
    if(thumbnailCache[assetId]) body.embeds[0].thumbnail = {"url": thumbnailCache[assetId]}
    await fetch(`${APP_CONFIG.webhook.url}?with_components=true`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
}

console.log("[Biome Notifier] Make sure to enable shizuku before start!");

let biomes = []
let prevState = ""

for(const biome in APP_CONFIG.webhook_notification){
    if(APP_CONFIG.webhook_notification[biome]) biomes.push(biome);
}

const { spawn } = require('child_process');

spawn("rish", ["-c", "logcat -c"]);
const logcat = spawn("rish", ["-c", "logcat"]);

logcat.stdout.pipe(split2()).on("data", (line)=>{
    const text = line.toString();
    if(text.includes("[BloxstrapRPC]")){
        const start = text.indexOf("{");
        if(start != -1){
            const rpcData = JSON.parse(text.slice(start)).data
            if(rpcData.smallImage && rpcData.smallImage.hoverText === "Sol's RNG" && rpcData.largeImage){
                const biome = rpcData.largeImage.hoverText
                const state = rpcData.state
                const assetId = rpcData.largeImage.assetId;
                // First condition check if the action is equip aura lol
                if((state == prevState || !prevState)){
                    if(biomes.includes(biome)){
                        let isRareBiome = (biome == "GLITCHED" || biome == "DREAMSPACE" || biome == "CYBERSPACE");
                        if(isRareBiome){
                            if(APP_CONFIG.rare_biome_actions.toast) exec(`termux-toast "${biome} just started!!!"`);
                            if(APP_CONFIG.rare_biome_actions.vibrate) exec("termux-vibrate");
                        }
                        if(APP_CONFIG.webhook.enable && APP_CONFIG.webhook.url) sendWebhook(biome, isRareBiome, assetId);
                    }
                    if(APP_CONFIG.push_current_biome_notification) exec(`termux-notification --priority min --id "st_notifier" --title "Current Biome: ${biome}"`);
                }
                prevState = state;
            }
        }
    }
});