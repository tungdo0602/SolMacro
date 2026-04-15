const { execSync } = require("child_process");
const { readFileSync } = require("fs");

const sleep = ms => new Promise(r => setTimeout(r, ms));

function isRobloxFocused(){
    try {
        return Boolean(execSync("rish -c 'dumpsys window | grep mFocusedWindow=com.roblox.client'").toString());
    } catch {
        return false;
    }
}

function getCurrentBiome(){
    try {
        return readFileSync("./biomeCache.txt");
    } catch {
        return "";
    }
}

module.exports = {
    sleep,
    isRobloxFocused,
    getCurrentBiome
}