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

const { readFileSync, writeFileSync, existsSync, watch } = require("fs");
const { execSync } = require("child_process");
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

const workers = {}

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

function updateMainButtonState(){
    execSync(`termux-notification -i "solmacro" -t "SolMacro" --ongoing --button1 "${workers.autoBiome ? "Disable" : "Enable"} Auto Biome" --button1-action "echo 1 > $PWD/state.txt" --button2 "${workers.autoFishing ? "Disable" : "Enable"} Auto Fishing" --button2-action "echo 2 > $PWD/state.txt"`)
}

watch("./state.txt", (eventType, _) => {
    if(eventType == "change"){
        const state = readFileSync("./state.txt", "utf-8").trim();
        if(state === "1"){
            if(workers.autoBiome){
                workers.autoBiome.terminate();
                workers.autoBiome = null;
            } else createWorker("autoBiome", "./features/autoBiome.js");
            updateMainButtonState();
        } else if(state === "2"){
            // TODO
        }
    }
})

writeFileSync("./state.txt", "");
updateMainButtonState();
createWorker("notifier", "./features/biomeNotifier.js", APP_CONFIG.notifier);
console.log("Started Aiome Notifier!");

if(APP_CONFIG.anti_AFK){
    createWorker("antiAFK", "./features/antiAFK.js");
    console.log("Started Anti AFK!");
}