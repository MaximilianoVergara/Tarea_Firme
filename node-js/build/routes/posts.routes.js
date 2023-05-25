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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Posts_1 = __importDefault(require("../models/Posts"));
const router = (0, express_1.Router)();
router.get('/api/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Posts_1.default.find();
        res.json(data);
    }
    catch (error) {
        console.error('Error get data:', error);
        res.status(500).json({ error: 'No se pudo obtener los datos' });
    }
}));
router.put('/api/data/:objectID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { objectID } = req.params;
    const { blocked } = req.body;
    try {
        yield Posts_1.default.findOneAndUpdate({ objectID }, { blocked: blocked });
        res.json({ success: true });
    }
    catch (error) {
        console.error('Error update blocked:', error);
        res.status(500).json({ error: 'No se pudo eliminar el post' });
    }
}));
exports.default = router;
