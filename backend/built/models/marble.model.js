"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarbleModel = void 0;
var mongoose_1 = require("mongoose");
var MarbleSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: [String] },
    favorite: { type: Boolean, default: false },
    stars: { type: Number, required: true },
    imageurl: { type: String, required: true },
    descriptions: { type: [String], required: true },
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
});
MarbleSchema.virtual("id").get(function () {
    return this._id.toString();
});
MarbleSchema.virtual("id").set(function (id) {
    this._id = id;
});
exports.MarbleModel = (0, mongoose_1.model)("Marble", MarbleSchema);
