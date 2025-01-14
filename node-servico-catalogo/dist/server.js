"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./infra/database"));
const PORT = process.env.PORT || 3000;
(async () => {
    try {
        await database_1.default.authenticate();
        await database_1.default.sync();
        console.log('Conectado ao banco de dados com sucesso.');
        app_1.default.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Erro ao conectar no banco:', error);
    }
})();
