import { BaseFirestoreRepository } from './BaseFirestoreRepository';
import { IEntity, EntityConstructorOrPath } from './types';
import { FirestoreTransaction } from './Transaction/FirestoreTransaction';
import { FirestoreBatch } from './Batch/FirestoreBatch';
export declare function getRepository<T extends IEntity>(entityConstructorOrPath: EntityConstructorOrPath<T>): BaseFirestoreRepository<T>;
/**
 * @deprecated Use getRepository. This will be removed in a future version.
 */
export declare const GetRepository: typeof getRepository;
export declare function getCustomRepository<T extends IEntity>(entityOrPath: EntityConstructorOrPath<T>): BaseFirestoreRepository<T>;
/**
 * @deprecated Use getCustomRepository. This will be removed in a future version.
 */
export declare const GetCustomRepository: typeof getCustomRepository;
export declare function getBaseRepository<T extends IEntity>(entityOrPath: EntityConstructorOrPath<T>): BaseFirestoreRepository<T>;
/**
 * @deprecated Use getBaseRepository. This will be removed in a future version.
 */
export declare const GetBaseRepository: typeof getBaseRepository;
export declare const runTransaction: <T>(executor: (tran: FirestoreTransaction) => Promise<T>) => Promise<T>;
export declare const createBatch: () => FirestoreBatch;
