"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
const sequelize = new sequelize_1.Sequelize(database_1.default.database, database_1.default.username, database_1.default.password, {
    host: database_1.default.host,
    dialect: database_1.default.dialect,
    port: database_1.default.port,
    logging: false
});
exports.default = sequelize;
