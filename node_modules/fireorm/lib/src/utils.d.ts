import { SubCollectionMetadata } from './MetadataStorage';
import { IEntity } from '.';
/**
 * Extract getters and object in form of data properties
 * @param {T} Entity object
 * @returns {Object} with only data properties
 */
export declare function extractAllGetters(obj: Record<string, unknown>): Record<string, unknown>;
/**
 * Returns a serializable object from entity<T>
 *
 * @template T
 * @param {T} Entity object
 * @param {SubCollectionMetadata[]} subColMetadata Subcollection
 * metadata to remove runtime-created fields
 * @returns {Object} Serialiable object
 */
export declare function serializeEntity<T extends IEntity>(obj: Partial<T>, subColMetadata: SubCollectionMetadata[]): Record<string, unknown>;
/**
 * Returns true if arrays are equal
 *
 * @export
 * @param {Array<unknown>} arr1
 * @param {Array<unknown>} arr2
 * @returns {boolean}
 */
export declare function arraysAreEqual(arr1: unknown[], arr2: unknown[]): boolean;
