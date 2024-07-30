"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const express_joi_validation_1 = require("express-joi-validation");
const joi_1 = __importDefault(require("joi"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
const validator = (0, express_joi_validation_1.createValidator)();
const productSchema = joi_1.default.object({
    productname: joi_1.default.string().required(),
    barcode: joi_1.default.string().required(),
    description: joi_1.default.string().allow(null, ''),
    expiry_date: joi_1.default.date().allow(null),
    purchase_date: joi_1.default.date().required(),
    vatable: joi_1.default.boolean().default(true),
    category: joi_1.default.string().required(),
    price: joi_1.default.number().precision(2).positive().required(),
});
router.get('/', auth_1.default, productController_1.getAllProducts);
router.get('/:id', auth_1.default, productController_1.getProductById);
router.post('/', auth_1.default, validator.body(productSchema), productController_1.createProduct);
router.put('/:id', auth_1.default, validator.body(productSchema), productController_1.updateProduct);
router.delete('/:id', auth_1.default, productController_1.deleteProduct);
exports.default = router;
