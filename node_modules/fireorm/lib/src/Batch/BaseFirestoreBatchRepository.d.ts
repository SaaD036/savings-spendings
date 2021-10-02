import { CollectionReference } from '@google-cloud/firestore';
import { IEntity, WithOptionalId, IBatchRepository, EntityConstructorOrPath } from '../types';
import { MetadataStorageConfig, FullCollectionMetadata } from '../MetadataStorage';
import { FirestoreBatchUnit } from './FirestoreBatchUnit';
export declare class BaseFirestoreBatchRepository<T extends IEntity> implements IBatchRepository<T> {
    protected pathOrConstructor: EntityConstructorOrPath<T>;
    protected batch: FirestoreBatchUnit;
    protected colMetadata: FullCollectionMetadata;
    protected colRef: CollectionReference;
    protected config: MetadataStorageConfig;
    protected path: string;
    constructor(pathOrConstructor: EntityConstructorOrPath<T>, batch: FirestoreBatchUnit);
    create: (item: WithOptionalId<T>) => void;
    update: (item: T) => void;
    delete: (item: T) => void;
}
