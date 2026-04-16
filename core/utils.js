const { exec } = require("child_process");
const { readFile } = require("fs");

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function isRobloxFocused(){
    try {
        return Boolean((await exec("rish -c 'dumpsys window | grep mFocusedWindow=com.roblox.client'")).toString());
    } catch {
        return false;
    }
}

async function getCurrentBiome(){
    try {
        return await readFile("./biomeCache.txt");
    } catch {
        return "";
    }
}

module.exports = {
    sleep,
    isRobloxFocused,
    getCurrentBiome
}