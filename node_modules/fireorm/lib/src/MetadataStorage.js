"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataStorage = void 0;
var BaseRepository_1 = require("./BaseRepository");
var utils_1 = require("./utils");
var MetadataStorage = /** @class */ (function () {
    function MetadataStorage() {
        var _this = this;
        this.collections = [];
        this.repositories = new Map();
        this.config = {
            validateModels: false,
            validatorOptions: {},
        };
        this.getCollection = function (pathOrConstructor) {
            var collection;
            // If is a path like users/user-id/messages/message-id/senders,
            // take all the even segments [users/messages/senders] and
            // look for an entity with those segments
            if (typeof pathOrConstructor === 'string') {
                var segments = pathOrConstructor.split('/');
                // Return null if incomplete segment
                if (segments.length % 2 === 0) {
                    throw new Error("Invalid collection path: " + pathOrConstructor);
                }
                var collectionSegments_1 = segments.reduce(function (acc, cur, index) { return (index % 2 === 0 ? acc.concat(cur) : acc); }, []);
                collection = _this.collections.find(function (c) { return utils_1.arraysAreEqual(c.segments, collectionSegments_1); });
            }
            else {
                collection = _this.collections.find(function (c) { return c.entityConstructor === pathOrConstructor; });
            }
            if (!collection) {
                return null;
            }
            var subCollections = _this.collections.filter(function (s) { return s.parentEntityConstructor === (collection === null || collection === void 0 ? void 0 : collection.entityConstructor); });
            return __assign(__assign({}, collection), { subCollections: subCollections });
        };
        this.setCollection = function (col) {
            var existing = _this.getCollection(col.entityConstructor);
            if (existing) {
                throw new Error("Collection with name " + existing.name + " has already been registered");
            }
            var colToAdd = __assign(__assign({}, col), { segments: [col.name] });
            _this.collections.push(colToAdd);
            var getWhereImParent = function (p) {
                return _this.collections.filter(function (c) { return c.parentEntityConstructor === p; });
            };
            var colsToUpdate = getWhereImParent(col.entityConstructor);
            var _loop_1 = function () {
                var c = colsToUpdate.pop();
                if (!c) {
                    return { value: void 0 };
                }
                var parent = _this.collections.find(function (p) { return p.entityConstructor === c.parentEntityConstructor; });
                c.segments = (parent === null || parent === void 0 ? void 0 : parent.segments.concat(c.name)) || [];
                getWhereImParent(c.entityConstructor).forEach(function (col) { return colsToUpdate.push(col); });
            };
            // Update segments for subcollections and subcollections of subcollections
            while (colsToUpdate.length) {
                var state_1 = _loop_1();
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        };
        this.getRepository = function (param) {
            return _this.repositories.get(param) || null;
        };
        this.setRepository = function (repo) {
            var savedRepo = _this.getRepository(repo.entity);
            if (savedRepo && repo.target !== savedRepo.target) {
                throw new Error('Cannot register a custom repository twice with two different targets');
            }
            if (!(repo.target.prototype instanceof BaseRepository_1.BaseRepository)) {
                throw new Error('Cannot register a custom repository on a class that does not inherit from BaseFirestoreRepository');
            }
            _this.repositories.set(repo.entity, repo);
        };
        this.getRepositories = function () {
            return _this.repositories;
        };
    }
    return MetadataStorage;
}());
exports.MetadataStorage = MetadataStorage;
//# sourceMappingURL=MetadataStorage.js.map