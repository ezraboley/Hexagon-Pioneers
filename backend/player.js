const {config} = require('./config.js');
const {Resource} = require('./resource.js');

let ID = 0;

class Player {
    constructor() {
        this._id = ID++;
        this.color = config.COLORS[this._id % config.COLORS.length];
        this.resources = [];
        this.towns = [];
        this.vp = 0;
    }

    // res : class Resource
    giveRes(res) {
        if (!(res instanceof Resource)) {
            throw "Not a valid resource to give player";
        }
        this.resources.push(res);
    }
    
    buyDevCard() {

    }
    
    buildTown() {
        if (!validatePurchase(config.TOWN_PRICE))
            return false;
    }

    buildCity() {
        if (!validatePurchase(config.CITY_PRICE))
            return false;
    }

    /* requirements : {config.WOOL: 1, config.WOOD:1, etc}*/
    validatePurchase(requirements) {
        for (res in this.resources) {
            requirements[res]--;
        }
        
        return (requirements[config.WOOL] <== 0 &&
            requirements[config.WOOD] <== 0 &&
            requirements[config.BRICK] <== 0 &&
            requirements[config.ORE] <== 0 &&
            requirements[config.WHEAT] <== 0);
    }
}
module.exports.Player = Player;
