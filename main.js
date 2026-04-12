let APP_CONFIG = {
    anti_AFK: true,
    notifier: {
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
        webhook_notification: {
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
}

const { readFileSync, writeFileSync, existsSync } = require("fs");
const { TouchManager } = require("./core/touchManager");
const { Worker } = require("node:worker_threads");

if(existsSync("./config.json")){
    APP_CONFIG = JSON.parse(readFileSync("./config.json", "utf-8"));
    console.log("Loaded config!");
} else {
    writeFileSync("./config.json", JSON.stringify(APP_CONFIG, null, 4));
    console.log("Created config file! Please open config.json and change the settings.");
    process.exit();
}

writeFileSync("./state.txt", "");

let workers = {}
const touchManager = new TouchManager();

function preExit(){
    for(const k in workers){
        if(workers[k]) workers[k].terminate();
    }
    process.exit();
}

process.on("SIGINT", preExit);
process.on("SIGTERM", preExit);

function createWorker(name, path, data = {}){
    workers[name] = new Worker(path, {
        stdout: true
    });

    workers[name].stdout.on("data", (c) => {
        process.stdout.write(c);
    });

    if(data) workers[name].postMessage(data);
}

createWorker("notifier", "./features/biomeNotifier.js", APP_CONFIG.notifier);
console.log("Started Aiome Notifier!");

if(APP_CONFIG.anti_AFK){
    createWorker("antiAFK", "./features/antiAFK.js", touchManager);
    console.log("Started Anti AFK!");
}

createWorker("autoBiome", "./features/autoBiome.js", touchManager);