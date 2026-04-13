const { execSync } = require("child_process");

const ACTION_BUTTON = {
    AURA_STORAGE: 0,
    AURA_COLLECTION: 1,
    INVENTORY: 2,
    QUESTS: 3,
    DAILY_QUESTS: 4,
    MENU: 5
}

const touchData = {
    "blank": [1200, 50],
    "jump": [2090, 900],
    "invItems": [1500, 300],
    "invUse": [875, 580],
    "invSearch": [1500, 350],
    "invFirstItem": [1030, 500],
    "fish": [1005, 800],
    "fishDialogClose": [1500, 100]
}

function getActionButtonPos(buttonIndex){
    return [150, 280 + 100 * buttonIndex];
}

class TouchManager {
    /*
    [0, 0] position started at top left screen
    */
    static getResolution(){
        return execSync("rish -c 'wm size'")
                .toString()
                .slice(15)
                .split("x")
                .map(o => Number(o));
    }

    static getOrientation(){
        return Number(
                execSync("rish -c 'dumpsys display | grep mCurrentOrientation'")
                .toString()
                .trim()[20]
            );
    }

    static touchPos(x, y){
        return execSync(`rish -c "input touch ${x} ${y}"`);
    }

    static touch(name){
        return this.touchPos(...touchData[name]);
    }

    static typeText(content){
        return execSync(`rish -c 'input text "${content}"'`)
    }
}

module.exports = {
    TouchManager,
    ACTION_BUTTON,
    getActionButtonPos
};