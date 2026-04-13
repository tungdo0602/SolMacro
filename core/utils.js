const { execSync } = require("child_process");

const sleep = ms => new Promise(r => setTimeout(r, ms));

function isFocusedOnRoblox(){
    try {
        return Boolean(execSync("rish -c 'dumpsys window | grep mFocusedWindow=com.roblox.client'").toString());
    } catch {
        return false;
    }
}

module.exports = {
    sleep,
    isFocusedOnRoblox
}