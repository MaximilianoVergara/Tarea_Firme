"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const services_1 = require("./services");
//En las versiones mas nuevas de mongoose ya no son necesarios useNewUrlParser y useUnifiedTopology
mongoose_1.default.connect('mongodb://database:27017/my-database')
    .then(db => {
    console.log('db conected');
    (0, services_1.Data_management)('https://hn.algolia.com/api/v1/search_by_date?query=nodejs');
    setInterval(() => {
        (0, services_1.Data_management)('https://hn.algolia.com/api/v1/search_by_date?query=nodejs');
    }, 60 * 60 * 1000);
})
    .catch(err => console.log(err));
