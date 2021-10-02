"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreTransaction = void 0;
var BaseFirestoreTransactionRepository_1 = require("./BaseFirestoreTransactionRepository");
var MetadataUtils_1 = require("../MetadataUtils");
var metadataStorage = MetadataUtils_1.getMetadataStorage();
var FirestoreTransaction = /** @class */ (function () {
    function FirestoreTransaction(transaction, tranRefStorage) {
        this.transaction = transaction;
        this.tranRefStorage = tranRefStorage;
    }
    FirestoreTransaction.prototype.getRepository = function (entityOrConstructor) {
        if (!metadataStorage.firestoreRef) {
            throw new Error('Firestore must be initialized first');
        }
        return new BaseFirestoreTransactionRepository_1.TransactionRepository(entityOrConstructor, this.transaction, this.tranRefStorage);
    };
    return FirestoreTransaction;
}());
exports.FirestoreTransaction = FirestoreTransaction;
//# sourceMappingURL=FirestoreTransaction.js.map