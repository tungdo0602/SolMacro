const { exec } = require("child_process");

const touchData = {
    "blank": [1230, 1025],
    "chat": [455, 1000],
    "jump": [2100, 140],
    "play": [415, 75],
    "auraInv": [155, 800],
    "inv": [150, 595],
    "invItems": [1545, 775],
    "invUse": [850, 505],
    "invClose": [1695, 815],
    "invSearch": [2155, 355],
    "invFirstItem": [1025, 630],
    "fish": [877, 272],
    "fishDialogClose": [1488, 926]
}

class TouchManager {
    static async touchPos(x, y){
        return exec(`rish -c "input touch ${x} ${y}"`);
    }

    static async touch(name){
        return this.touchPos(...touchData[name]);
    }

    static async typeText(content){
        return exec(`rish -c 'input text "${content}"'`)
    }
}

module.exports = { TouchManager };