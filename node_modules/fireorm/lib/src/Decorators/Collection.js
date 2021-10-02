"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
var MetadataUtils_1 = require("../MetadataUtils");
var pluralize_1 = require("pluralize");
function Collection(entityName) {
    return function (entityConstructor) {
        var name = entityName || pluralize_1.plural(entityConstructor.name);
        MetadataUtils_1.getMetadataStorage().setCollection({
            name: name,
            entityConstructor: entityConstructor,
        });
    };
}
exports.Collection = Collection;
//# sourceMappingURL=Collection.js.map