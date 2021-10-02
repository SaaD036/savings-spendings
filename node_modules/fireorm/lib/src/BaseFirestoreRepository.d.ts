import 'reflect-metadata';
import { IRepository, IFireOrmQueryLine, IOrderByParams, IEntity, PartialBy, ITransactionRepository, ICustomQuery } from './types';
import { AbstractFirestoreRepository } from './AbstractFirestoreRepository';
export declare class BaseFirestoreRepository<T extends IEntity> extends AbstractFirestoreRepository<T> implements IRepository<T> {
    findById(id: string): Promise<T>;
    create(item: PartialBy<T, 'id'>): Promise<T>;
    update(item: T): Promise<T>;
    delete(id: string): Promise<void>;
    runTransaction<R>(executor: (tran: ITransactionRepository<T>) => Promise<R>): Promise<R>;
    createBatch(): import("./Batch/FirestoreBatchSingleRepository").FirestoreBatchSingleRepository<IEntity>;
    execute(queries: Array<IFireOrmQueryLine>, limitVal?: number, orderByObj?: IOrderByParams, single?: boolean, customQuery?: ICustomQuery<T>): Promise<T[]>;
}
