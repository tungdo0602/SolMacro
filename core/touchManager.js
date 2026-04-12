const { exec } = require("child_process");

const touchData = {
    "blank": [1025, 1230],
    "chat": [1000, 455],
    "jump": [140, 2100],
    "play": [75, 415],
    "auraInv": [800, 155],
    "inv": [595, 150],
    "invItems": [775, 1545],
    "invUse": [505, 850],
    "invClose": [815, 1695],
    "invSearch": [355, 2155],
    "invFirstItem": [630, 1025],
    "fish": [272, 877],
    "fishDialogClose": [926, 1488]
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