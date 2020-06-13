module.exports.config = {
    // Resources
    ORE: "ore",
    WOOD: "wood",
    BRICK: "brick",
    WHEAT: "wheat",
    WOOL: "wool",
    BOARD_SIZE: 2,
    COLORS: ["red", "blue", "green", "yellow"],
    PRICES: {
        TOWN: {},
        CITY: {},
        DEV_CARD: {},
        ROAD: {}
    }
};

const ore = module.exports.config.ORE;
const wood = module.exports.config.WOOD;
const brick = module.exports.config.BRICK;
const wheat = module.exports.config.WHEAT;
const wool = module.exports.config.WOOL;

// TOWN prices
module.exports.config.PRICES.TOWN[ore] = 0;
module.exports.config.PRICES.TOWN[wood] = 1;
module.exports.config.PRICES.TOWN[brick] = 1;
module.exports.config.PRICES.TOWN[wheat] = 1;
module.exports.config.PRICES.TOWN[wool] = 1;

// CITY prices
module.exports.config.PRICES.CITY[ore] = 3;
module.exports.config.PRICES.CITY[wood] = 0;
module.exports.config.PRICES.CITY[brick] = 0;
module.exports.config.PRICES.CITY[wheat] = 2;
module.exports.config.PRICES.CITY[wool] = 0;

// DEV CARD prices
module.exports.config.PRICES.CITY[ore] = 1;
module.exports.config.PRICES.CITY[wood] = 0;
module.exports.config.PRICES.CITY[brick] = 0;
module.exports.config.PRICES.CITY[wheat] = 1;
module.exports.config.PRICES.CITY[wool] = 1;

// ROAD prices
module.exports.config.PRICES.CITY[ore] = 0;
module.exports.config.PRICES.CITY[wood] = 1;
module.exports.config.PRICES.CITY[brick] = 1;
module.exports.config.PRICES.CITY[wheat] = 0;
module.exports.config.PRICES.CITY[wool] = 0;
