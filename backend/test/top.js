function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}

describe("Full Test Suite", function () {
    // before(function () {
    //     console.log("Running test suite");
    // });
    importTest("game", './testGame');
    importTest("index", './testIndex');
    // after(function () {
    //     console.log("Tests completed");
    // });
});