"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCollection = void 0;
var MetadataUtils_1 = require("../MetadataUtils");
var pluralize_1 = require("pluralize");
function SubCollection(entityConstructor, entityName) {
    return function (parentEntity, propertyKey) {
        MetadataUtils_1.getMetadataStorage().setCollection({
            entityConstructor: entityConstructor,
            name: entityName || pluralize_1.plural(entityConstructor.name),
            parentEntityConstructor: parentEntity.constructor,
            propertyKey: propertyKey,
        });
    };
}
exports.SubCollection = SubCollection;
//# sourceMappingURL=SubCollection.js.map