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
exports.Data_management = void 0;
const axios_1 = __importDefault(require("axios"));
const Posts_1 = __importDefault(require("./models/Posts"));
function Data_management(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(url);
            const data = response.data;
            for (const hit of data['hits']) {
                console.log(hit);
                const { created_at, title, author, url, points, story_text, comment_text, story_id, story_title, story_url, parent_id, objectID } = hit;
                const exist = yield Posts_1.default.findOne({ objectID });
                console.log(exist);
                if (!exist) {
                    const blocked = 0;
                    yield Posts_1.default.create({ created_at, title, author, url, points, story_text, comment_text,
                        story_id, story_title, story_url, parent_id, objectID, blocked });
                }
            }
            console.log("Guardado exitoso");
        }
        catch (error) {
            console.log("Error al obtener o guardar los datos", error);
        }
    });
}
exports.Data_management = Data_management;
