"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloWorld = void 0;
var createUser_1 = __importDefault(require("./services/createUser"));
function HelloWorld(req, res) {
    var user = createUser_1.default({
        name: "Mario",
        email: 'mariojorge19997@outlook.com',
        password: '123456789098765432',
        techs: ['Reactjs', 'Nodejs', 'MongoDB', 'Git', 'Firebase']
    });
    return res.json({ msg: "Move route into file of routes and add types, " + user.techs });
}
exports.HelloWorld = HelloWorld;
;
