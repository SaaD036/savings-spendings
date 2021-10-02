import { Firestore } from '@google-cloud/firestore';
import { MetadataStorage, MetadataStorageConfig } from './MetadataStorage';
export interface IMetadataStore {
    metadataStorage: MetadataStorage;
}
export declare function getStore(): IMetadataStore;
/**
 * Return exisiting metadataStorage, otherwise create if not present
 */
export declare const getMetadataStorage: () => MetadataStorage;
export declare const initialize: (firestore: Firestore, config?: MetadataStorageConfig) => void;
/**
 * @deprecated Use initialize. This will be removed in a future version.
 */
export declare const Initialize: (firestore: Firestore, config?: MetadataStorageConfig) => void;
