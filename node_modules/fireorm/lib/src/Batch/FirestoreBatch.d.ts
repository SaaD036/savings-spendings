import { IEntity, EntityConstructorOrPath, IFirestoreBatch } from '../types';
import { BaseFirestoreBatchRepository } from './BaseFirestoreBatchRepository';
import { FirestoreBatchSingleRepository } from './FirestoreBatchSingleRepository';
import { Firestore } from '@google-cloud/firestore';
export declare class FirestoreBatch implements IFirestoreBatch {
    protected firestoreRef: Firestore;
    private batch;
    constructor(firestoreRef: Firestore);
    /**
     *
     * Returns a batch repository of T.
     *
     * @template T
     * @param {EntityConstructorOrPath<T>} entity path or constructor
     * @returns
     * @memberof FirestoreBatch
     */
    getRepository<T extends IEntity>(pathOrConstructor: EntityConstructorOrPath<T>): BaseFirestoreBatchRepository<T>;
    /**
     *
     * Returns a batch repository of a single entity. Required to maintain
     * current features and will be deleted in the next major version.
     *
     * @template T
     * @param {EntityConstructorOrPath<T>} entity path or constructor
     * @returns
     * @memberof FirestoreBatch
     */
    getSingleRepository<T extends IEntity>(pathOrConstructor: EntityConstructorOrPath<T>): FirestoreBatchSingleRepository<T>;
    /**
     *
     * Commits current batch.
     *
     * @template T
     * @param {Constructor<T>} entity
     * @returns
     * @memberof FirestoreBatch
     */
    commit: () => Promise<FirebaseFirestore.WriteResult[]>;
}
