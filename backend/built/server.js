"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http = require('http');
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
require('dotenv').config();
var marble_router_1 = __importDefault(require("./routers/marble.router"));
var user_router_1 = __importDefault(require("./routers/user.router"));
var database_config_1 = require("./configs/database.config");
console.log('MONGO_URI:', process.env.MONGO_URI);
(0, database_config_1.dbConnect)();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: ['http://localhost:4200', 'https://marimex.netlify.app', 'https://marimex.netlify.app']
}));
var corsOptions = {
    origin: 'https://marimex.netlify.app',
};
app.use((0, cors_1.default)(corsOptions));
app.use("/api/marble", marble_router_1.default);
app.use("/api/users", user_router_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/dist/frontend')));
app.get('/*', function (req, res) {
    console.log('Serving frontend index.html');
    res.sendFile(path_1.default.join(__dirname, '../../frontend/dist/frontend/index.html'));
});
var server = http.createServer(app);
var port = process.env.PORT || 5000;
server.listen(port, function () {
    console.log("Website served on http://localhost:" + port);
});
