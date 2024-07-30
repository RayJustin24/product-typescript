"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const express_joi_validation_1 = require("express-joi-validation");
const joi_1 = __importDefault(require("joi"));
const router = express_1.default.Router();
const validator = (0, express_joi_validation_1.createValidator)();
const userSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required().min(6),
});
router.post('/register', validator.body(userSchema), authController_1.register);
router.post('/login', validator.body(userSchema), authController_1.login);
exports.default = router;
