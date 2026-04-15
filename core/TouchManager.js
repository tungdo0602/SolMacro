const { execSync } = require("child_process");

class TouchManager {
    static touch(x, y){
        return execSync(`rish -c "input touch ${x} ${y}"`);
    }

    static touchBlank(w){
        this.touch(w / 2, 50);
    }

    static typeText(content){
        return execSync(`rish -c 'input text "${content}"'`)
    }
}

module.exports = {
    TouchManager
};