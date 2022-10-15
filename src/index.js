"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = (0, express_1["default"])();
app.use(express_1["default"].urlencoded({ extended: true }));
app.use('/api/converter', require('./api/v1/routes/converterRoutes.ts'));
app.listen(process.env.PORT || 3000, function () {
    console.log("app is listening...");
});
//TODO Write unit tests
// https://www.testim.io/blog/unit-test-rest-api/
