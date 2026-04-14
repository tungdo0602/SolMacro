const { execSync } = require("child_process");

const sleep = ms => new Promise(r => setTimeout(r, ms));

function isRobloxFocused(){
    return Boolean(execSync("rish -c 'dumpsys window | grep mFocusedWindow=com.roblox.client'").toString());
}

module.exports = {
    sleep,
    isRobloxFocused
}