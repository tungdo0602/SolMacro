const { exec } = require("child_process");

const touchData = {
    "blank": [1230, 1025],
    "jump": [2090, 900],
    "auraInv": [155, 800],
    "inv": [160, 500],
    "invItems": [1500, 300],
    "invUse": [875, 580],
    "invSearch": [1500, 350],
    "invFirstItem": [1030, 500],
    "fish": [1005, 800],
    "fishDialogClose": [1500, 100]
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