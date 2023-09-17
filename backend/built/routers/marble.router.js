"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var data_1 = require("../data");
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var marble_model_1 = require("../models/marble.model");
var http_status_1 = require("../constants/http_status");
var http_status_2 = require("../constants/http_status");
var router = (0, express_1.Router)();
router.get("/seed", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var marbleCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, marble_model_1.MarbleModel.countDocuments()];
            case 1:
                marbleCount = _a.sent();
                if (marbleCount > 0) {
                    res.send("Seed is already done !");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, marble_model_1.MarbleModel.create(data_1.sample_marble)];
            case 2:
                _a.sent();
                res.send("Seed Is Done !");
                return [2 /*return*/];
        }
    });
}); }));
router.get("/", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var marbels;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, marble_model_1.MarbleModel.find()];
            case 1:
                marbels = _a.sent();
                res.send(marbels); //sample_marble eli feha el data el kol
                return [2 /*return*/];
        }
    });
}); }));
router.get("/search/:searchTerm", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var searchTerm, searchRegex, marbels, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                searchTerm = req.params.searchTerm;
                searchRegex = new RegExp(searchTerm, 'i');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, marble_model_1.MarbleModel.find({ name: searchRegex })];
            case 2:
                marbels = _a.sent();
                res.send(marbels);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res.status(500).send({ error: 'An error occurred while processing the request.' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/tags", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tags, all;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, marble_model_1.MarbleModel.aggregate([
                    {
                        $unwind: '$tags'
                    },
                    {
                        $group: {
                            _id: '$tags',
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            name: '$_id',
                            count: '$count'
                        }
                    }
                ]).sort({ count: -1 })];
            case 1:
                tags = _b.sent();
                _a = {
                    name: 'Tous'
                };
                return [4 /*yield*/, marble_model_1.MarbleModel.countDocuments()];
            case 2:
                all = (_a.count = _b.sent(),
                    _a);
                tags.unshift(all);
                res.send(tags);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/tags/:tagName", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var marbels;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, marble_model_1.MarbleModel.find({ tags: req.params.tagName })];
            case 1:
                marbels = _a.sent();
                res.send(marbels);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/:marbleID", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var marbel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, marble_model_1.MarbleModel.findById(req.params.marbleID)];
            case 1:
                marbel = _a.sent();
                res.send(marbel);
                return [2 /*return*/];
        }
    });
}); }));
router.post("/create", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, price, tags, favorite, stars, imageurl, descriptions, user, newMarbel, dbMarble;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, price = _a.price, tags = _a.tags, favorite = _a.favorite, stars = _a.stars, imageurl = _a.imageurl, descriptions = _a.descriptions;
                return [4 /*yield*/, marble_model_1.MarbleModel.findOne({ name: name })];
            case 1:
                user = _b.sent();
                if (user) {
                    res.status(http_status_1.HTTP_BAD_REQUEST)
                        .send('Marble is already exists');
                    return [2 /*return*/];
                }
                newMarbel = {
                    name: name,
                    price: price,
                    tags: tags,
                    favorite: favorite,
                    stars: stars,
                    imageurl: imageurl,
                    descriptions: descriptions
                };
                return [4 /*yield*/, marble_model_1.MarbleModel.create(newMarbel)];
            case 2:
                dbMarble = _b.sent();
                res.status(201).json(dbMarble);
                return [2 /*return*/];
        }
    });
}); }));
router.delete("/:marbleID", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var marbleId, deletedMarble, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                marbleId = req.params.marbleID;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, marble_model_1.MarbleModel.findByIdAndDelete(marbleId)];
            case 2:
                deletedMarble = _a.sent();
                if (!deletedMarble) {
                    res.status(http_status_2.HTTP_NOT_FOUND).send('Marble not found');
                    return [2 /*return*/];
                }
                res.send(deletedMarble);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(500).send({ error: 'An error occurred while processing the request.' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }));
router.delete("/:marbleID", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var marbleId, deletedMarble, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                marbleId = req.params.marbleID;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, marble_model_1.MarbleModel.findByIdAndDelete(marbleId)];
            case 2:
                deletedMarble = _a.sent();
                if (!deletedMarble) {
                    res.status(http_status_2.HTTP_NOT_FOUND).send('Marble not found');
                    return [2 /*return*/];
                }
                res.send(deletedMarble);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(500).send({ error: 'An error occurred while processing the request.' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }));
router.put("/:marbleID", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var marbleId, _a, name, price, tags, favorite, stars, imageurl, descriptions, updatedMarble, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                marbleId = req.params.marbleID;
                _a = req.body, name = _a.name, price = _a.price, tags = _a.tags, favorite = _a.favorite, stars = _a.stars, imageurl = _a.imageurl, descriptions = _a.descriptions;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, marble_model_1.MarbleModel.findByIdAndUpdate(marbleId, {
                        name: name,
                        price: price,
                        tags: tags,
                        favorite: favorite,
                        stars: stars,
                        imageurl: imageurl,
                        descriptions: descriptions,
                    }, { new: true })];
            case 2:
                updatedMarble = _b.sent();
                if (!updatedMarble) {
                    res.status(http_status_2.HTTP_NOT_FOUND).send('Marble not found');
                    return [2 /*return*/];
                }
                res.send(updatedMarble);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _b.sent();
                res.status(500).send({ error: 'An error occurred while processing the request.' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
