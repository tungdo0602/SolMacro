const ACTION_BUTTON = {
    AURA_STORAGE: 0,
    AURA_COLLECTION: 1,
    INVENTORY: 2,
    QUESTS: 3,
    DAILY_QUESTS: 4,
    MENU: 5
}

class ActionBar {
    static getPos(actionButton){
        return [150, 275 + 105 * actionButton];
    }
}

module.exports = {
    ACTION_BUTTON,
    ActionBar
}