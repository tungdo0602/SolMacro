const { exec } = require("child_process");

class TouchManager {
    static async tap(x, y){
        return exec(`rish -c "input tap ${x} ${y}"`);
    }

    static async tapBlank(w){
        this.tap(w / 2, 50);
    }

    static async typeText(content){
        return exec(`rish -c 'input text "${content}"'`);
    }
}

module.exports = {
    TouchManager
};