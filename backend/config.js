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
        SETTLEMENT: {},
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

// SETTLEMENT prices
module.exports.config.PRICES.SETTLEMENT[ore] = 0;
module.exports.config.PRICES.SETTLEMENT[wood] = 1;
module.exports.config.PRICES.SETTLEMENT[brick] = 1;
module.exports.config.PRICES.SETTLEMENT[wheat] = 1;
module.exports.config.PRICES.SETTLEMENT[wool] = 1;

// CITY prices
module.exports.config.PRICES.CITY[ore] = 3;
module.exports.config.PRICES.CITY[wood] = 0;
module.exports.config.PRICES.CITY[brick] = 0;
module.exports.config.PRICES.CITY[wheat] = 2;
module.exports.config.PRICES.CITY[wool] = 0;

// DEV CARD prices
module.exports.config.PRICES.DEV_CARD[ore] = 1;
module.exports.config.PRICES.DEV_CARD[wood] = 0;
module.exports.config.PRICES.DEV_CARD[brick] = 0;
module.exports.config.PRICES.DEV_CARD[wheat] = 1;
module.exports.config.PRICES.DEV_CARD[wool] = 1;

// ROAD prices
module.exports.config.PRICES.ROAD[ore] = 0;
module.exports.config.PRICES.ROAD[wood] = 1;
module.exports.config.PRICES.ROAD[brick] = 1;
module.exports.config.PRICES.ROAD[wheat] = 0;
module.exports.config.PRICES.ROAD[wool] = 0;
