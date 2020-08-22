const {config} = require('../../config.js');



class Resource {
    constructor(resType) {
        if (!this.isResource(resType)) {
            throw "Not a valid resource";
        }

        this.type = resType;
    }

    isResource(res) {
        return res === config.ORE || res === config.WOOD || 
            res === config.WOOL || res === config.BRICK || 
            res === config.WHEAT;
    }

    toString() {
        return this.type;
    }
}

module.exports.Resource = Resource;
