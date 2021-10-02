"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = exports.isDocumentReference = exports.isGeoPoint = exports.isTimestamp = void 0;
function isTimestamp(x) {
    return typeof x === 'object' && x !== null && 'toDate' in x;
}
exports.isTimestamp = isTimestamp;
function isGeoPoint(x) {
    return typeof x === 'object' && x !== null && x.constructor.name === 'GeoPoint';
}
exports.isGeoPoint = isGeoPoint;
function isDocumentReference(x) {
    return typeof x === 'object' && x !== null && x.constructor.name === 'DocumentReference';
}
exports.isDocumentReference = isDocumentReference;
function isObject(x) {
    return typeof x === 'object';
}
exports.isObject = isObject;
//# sourceMappingURL=TypeGuards.js.map