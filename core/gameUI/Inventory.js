const INVENTORY_BUTTON = {
    USE: 0,
    GEARS: 1,
    ITEMS: 2,
    SEARCH: 3,
    FIRST_ITEM_SLOT: 4
}

class Inventory {
    static getPos(res, button){
        const [w, h] = res;

        switch(button){
            case INVENTORY_BUTTON.USE:
                return [w / 2 - 25, h / 2 - 230];
            
            case INVENTORY_BUTTON.GEARS:
                return [w / 2 + 350, h / 2 - 230];
            
            case INVENTORY_BUTTON.SEARCH:
                return [w / 2 - 25, h / 2 - 195];
            
            case INVENTORY_BUTTON.FIRST_ITEM_SLOT:
                return [w / 2 - 125, h / 2 - 75];
        }

        return [0, 0];
    }
}

module.exports = {
    INVENTORY_BUTTON,
    Inventory
}