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
        let pos = [0, 0];

        switch(button){
            case INVENTORY_BUTTON.USE:
                pos = [w / 2 - 315, h / 2 + 45];
            
            case INVENTORY_BUTTON.ITEMS:
                pos =  [w / 2 + 350, h / 2 - 230];

            case INVENTORY_BUTTON.GEARS:
                pos =  [w / 2 - 25, h / 2 - 230];
            
            case INVENTORY_BUTTON.SEARCH:
                pos =  [w / 2 + 350, h / 2 - 195];
            
            case INVENTORY_BUTTON.FIRST_ITEM_SLOT:
                pos =  [w / 2 - 125, h / 2 - 75];
        }

        return pos.map(v => Math.floor(v));
    }
}

module.exports = {
    INVENTORY_BUTTON,
    Inventory
}