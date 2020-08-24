function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}

describe("top", function () {
    before(function () {
        console.log("Running test suite");
    });
    importTest("game", './testGame');
    importTest("index", './testIndex');
    after(function () {
        console.log("Tests completed");
    });
});