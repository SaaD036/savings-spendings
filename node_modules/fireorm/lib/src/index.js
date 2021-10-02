"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = exports.Initialize = exports.initialize = void 0;
__exportStar(require("./Decorators"), exports);
__exportStar(require("./BaseFirestoreRepository"), exports);
__exportStar(require("./types"), exports);
__exportStar(require("./helpers"), exports);
var MetadataUtils_1 = require("./MetadataUtils");
Object.defineProperty(exports, "initialize", { enumerable: true, get: function () { return MetadataUtils_1.initialize; } });
Object.defineProperty(exports, "Initialize", { enumerable: true, get: function () { return MetadataUtils_1.Initialize; } });
// Temporary while https://github.com/wovalle/fireorm/issues/58 is being fixed
var class_transformer_1 = require("class-transformer");
Object.defineProperty(exports, "Type", { enumerable: true, get: function () { return class_transformer_1.Type; } });
//# sourceMappingURL=index.js.map