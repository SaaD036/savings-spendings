"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseFirestoreBatchRepository = void 0;
var MetadataUtils_1 = require("../MetadataUtils");
var Errors_1 = require("../Errors");
var BaseFirestoreBatchRepository = /** @class */ (function () {
    function BaseFirestoreBatchRepository(pathOrConstructor, batch) {
        var _this = this;
        this.pathOrConstructor = pathOrConstructor;
        this.batch = batch;
        this.create = function (item) {
            var doc = item.id ? _this.colRef.doc(item.id) : _this.colRef.doc();
            if (!item.id) {
                item.id = doc.id;
            }
            _this.batch.add('create', item, doc, _this.colMetadata, _this.config.validateModels, _this.config.validatorOptions);
        };
        this.update = function (item) {
            _this.batch.add('update', item, _this.colRef.doc(item.id), _this.colMetadata, _this.config.validateModels);
        };
        this.delete = function (item) {
            _this.batch.add('delete', item, _this.colRef.doc(item.id), _this.colMetadata, _this.config.validateModels);
        };
        var _a = MetadataUtils_1.getMetadataStorage(), getCollection = _a.getCollection, firestoreRef = _a.firestoreRef, config = _a.config;
        var colMetadata = getCollection(pathOrConstructor);
        if (!colMetadata) {
            throw new Errors_1.NoMetadataError(pathOrConstructor);
        }
        this.colMetadata = colMetadata;
        this.path = typeof pathOrConstructor === 'string' ? pathOrConstructor : this.colMetadata.name;
        this.colRef = firestoreRef.collection(this.path);
        this.config = config;
    }
    return BaseFirestoreBatchRepository;
}());
exports.BaseFirestoreBatchRepository = BaseFirestoreBatchRepository;
//# sourceMappingURL=BaseFirestoreBatchRepository.js.map