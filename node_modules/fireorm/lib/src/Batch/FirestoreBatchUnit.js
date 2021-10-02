"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreBatchUnit = void 0;
var utils_1 = require("../utils");
var FirestoreBatchUnit = /** @class */ (function () {
    function FirestoreBatchUnit(firestoreRef) {
        var _this = this;
        this.firestoreRef = firestoreRef;
        this.status = 'pending';
        this.operations = [];
        this.commit = function () { return __awaiter(_this, void 0, void 0, function () {
            var batch, _i, _a, op, errors, serialized, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.status === 'committing') {
                            throw new Error('This Batch is being committed');
                        }
                        if (this.operations.length === 0) {
                            throw new Error('Cannot commit a batch with zero operations');
                        }
                        this.status = 'committing';
                        batch = this.firestoreRef.batch();
                        _i = 0, _a = this.operations;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        op = _a[_i];
                        if (!(op.validateModels && ['create', 'update'].includes(op.type))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.validate(op.item, op.collectionMetadata.entityConstructor, op.validatorOptions)];
                    case 2:
                        errors = _b.sent();
                        if (errors.length) {
                            throw errors;
                        }
                        _b.label = 3;
                    case 3:
                        serialized = utils_1.serializeEntity(op.item, op.collectionMetadata.subCollections);
                        switch (op.type) {
                            case 'create':
                                batch.set(op.ref, serialized);
                                break;
                            case 'update':
                                batch.update(op.ref, serialized);
                                break;
                            case 'delete':
                                batch.delete(op.ref, serialized);
                                break;
                        }
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [4 /*yield*/, batch.commit()];
                    case 6:
                        result = _b.sent();
                        this.operations = [];
                        this.status = 'pending';
                        return [2 /*return*/, result];
                }
            });
        }); };
    }
    FirestoreBatchUnit.prototype.add = function (type, item, ref, collectionMetadata, validateModels, validatorOptions) {
        this.operations.push({
            type: type,
            item: item,
            ref: ref,
            collectionMetadata: collectionMetadata,
            validateModels: validateModels,
            validatorOptions: validatorOptions,
        });
    };
    FirestoreBatchUnit.prototype.validate = function (item, Entity, validatorOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var classValidator, entity, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('class-validator')); })];
                    case 1:
                        classValidator = _a.sent();
                        entity = item instanceof Entity ? item : Object.assign(new Entity(), item);
                        return [2 /*return*/, classValidator.validate(entity, validatorOptions)];
                    case 2:
                        error_1 = _a.sent();
                        if (error_1.code === 'MODULE_NOT_FOUND') {
                            throw new Error('It looks like class-validator is not installed. Please run `npm i -S class-validator` to fix this error, or initialize FireORM with `validateModels: false` to disable validation.');
                        }
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return FirestoreBatchUnit;
}());
exports.FirestoreBatchUnit = FirestoreBatchUnit;
//# sourceMappingURL=FirestoreBatchUnit.js.map