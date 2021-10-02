import { Transaction } from '@google-cloud/firestore';
import { TransactionRepository } from './BaseFirestoreTransactionRepository';
import { IEntity, EntityConstructorOrPath, IFirestoreTransaction, ITransactionReferenceStorage } from '../types';
export declare class FirestoreTransaction implements IFirestoreTransaction {
    private transaction;
    private tranRefStorage;
    constructor(transaction: Transaction, tranRefStorage: ITransactionReferenceStorage);
    getRepository<T extends IEntity = IEntity>(entityOrConstructor: EntityConstructorOrPath<T>): TransactionRepository<T>;
}
