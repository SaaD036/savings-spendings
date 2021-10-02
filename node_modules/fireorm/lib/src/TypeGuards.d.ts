import { Timestamp, GeoPoint, DocumentReference } from '@google-cloud/firestore';
export declare function isTimestamp(x: unknown): x is Timestamp;
export declare function isGeoPoint(x: unknown): x is GeoPoint;
export declare function isDocumentReference(x: unknown): x is DocumentReference;
export declare function isObject(x: unknown): x is Record<string, unknown>;
