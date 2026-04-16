const { exec } = require("child_process");

class ScreenManager {
    /*
    [0, 0] position started at top left screen
    */
    static async getResolution(){
        return await exec("rish -c 'wm size'")
                .toString()
                .slice(15)
                .split("x")
                .map(o => Number(o))
                .reverse(); // bc we're at landscape orientation
    }

    static async getOrientation(){
        return await Number(
                execSync("rish -c 'dumpsys display | grep mCurrentOrientation'")
                .toString()
                .trim()[20]
            );
    }
}

module.exports = {
    ScreenManager
}