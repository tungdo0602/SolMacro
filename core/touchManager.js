const { readFileSync } = require("fs");

class TouchManager {
    constructor() {
        this.data = JSON.parse(readFileSync("./touchData.json"));
        console.log("Initialized Touch Manager!");
    }

    async touchPos(x, y){
        return exec(`rish -c "input touch ${x} ${y}"`);
    }

    async touch(name){
        return this.touchPos(...this.data[name]);
    }
}