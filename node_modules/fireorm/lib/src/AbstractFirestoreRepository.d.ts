import { DocumentSnapshot, QuerySnapshot, CollectionReference, Transaction } from '@google-cloud/firestore';
import { ValidationError } from './Errors/ValidationError';
import { IEntity, IQueryBuilder, IWherePropParam, IFirestoreVal, IFireOrmQueryLine, IOrderByParams, IRepository, PartialBy, IEntityConstructor, ITransactionReferenceStorage, ICustomQuery } from './types';
import { MetadataStorageConfig, FullCollectionMetadata } from './MetadataStorage';
import { BaseRepository } from './BaseRepository';
export declare abstract class AbstractFirestoreRepository<T extends IEntity> extends BaseRepository implements IRepository<T> {
    protected readonly colMetadata: FullCollectionMetadata;
    protected readonly path: string;
    protected readonly config: MetadataStorageConfig;
    protected readonly firestoreColRef: CollectionReference;
    constructor(pathOrConstructor: string | IEntityConstructor);
    protected toSerializableObject: (obj: T) => Record<string, unknown>;
    protected transformFirestoreTypes: (obj: Record<string, unknown>) => Record<string, unknown>;
    protected initializeSubCollections: (entity: T, tran?: Transaction, tranRefStorage?: ITransactionReferenceStorage) => void;
    protected extractTFromDocSnap: (doc: DocumentSnapshot, tran?: Transaction, tranRefStorage?: ITransactionReferenceStorage) => T;
    protected extractTFromColSnap: (q: QuerySnapshot, tran?: Transaction, tranRefStorage?: ITransactionReferenceStorage) => T[];
    /**
     * Returns a new QueryBuilder with a filter specifying that the
     * value in @param prop must be equal to @param val.
     *
     * @param {IWherePropParam<T>} prop field to be filtered on, where
     * prop could be keyof T or a lambda where T is the first parameter
     * @param {IFirestoreVal} val value to compare in the filter
     * @returns {QueryBuilder<T>} A new QueryBuilder with the specified
     * query applied.
     * @memberof AbstractFirestoreRepository
     */
    whereEqualTo(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T>;
    /**
     * Returns a new QueryBuilder with a filter specifying that the
     * value in @param prop must not be equal to @param val.
     *
     * @param {IWherePropParam<T>} prop field to be filtered on, where
     * prop could be keyof T or a lambda where T is the first parameter
     * @param {IFirestoreVal} val value to compare in the filter
     * @returns {QueryBuilder<T>} A new QueryBuilder with the specified
     * query applied.
     * @memberof AbstractFirestoreRepository
     */
    whereNotEqualTo(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T>;
    /**
     * Returns a new QueryBuilder with a filter specifying that the
     * value in @param prop must be greater than @param val.
     *
     * @param {IWherePropParam<T>} prop field to be filtered on, where
     * prop could be keyof T or a lambda where T is the first parameter
     * @param {IFirestoreVal} val value to compare in the filter
     * @returns {QueryBuilder<T>} A new QueryBuilder with the specified
     * query applied.
     * @memberof AbstractFirestoreRepository
     */
    whereGreaterThan(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T>;
    /**
     * Returns a new QueryBuilder with a filter specifying that the
     * value in @param prop must be greater or equal than @param val.
     *
     * @param {IWherePropParam<T>} prop field to be filtered on, where
     * prop could be keyof T or a lambda where T is the first parameter
     * @param {IFirestoreVal} val value to compare in the filter
     * @returns {QueryBuilder<T>} A new QueryBuilder with the specified
     * query applied.
     * @memberof AbstractFirestoreRepository
     */
    whereGreaterOrEqualThan(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T>;
    /**
     * Returns a new QueryBuilder with a filter specifying that the
     * value in @param prop must be less than @param val.
     *
     * @param {IWherePropParam<T>} prop field to be filtered on, where
     * prop could be keyof T or a lambda where T is the first parameter
     * @param {IFirestoreVal} val value to compare in the filter
     * @returns {QueryBuilder<T>} A new QueryBuilder with the specified
     * query applied.
     * @memberof AbstractFirestoreRepository
     */
    whereLessThan(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T>;
    /**
     * Returns a new QueryBuilder with a filter specifying that the
     * value in @param prop must be less or equal than @param val.
     *
     * @param {IWherePropParam<T>} prop field to be filtered on, where
     * prop could be keyof T or a lambda where T is the first parameter
     * @param {IFirestoreVal} val value to compare in the filter
     * @returns {QueryBuilder<T>} A new QueryBuilder with the specified
     * query applied.
     * @memberof AbstractFirestoreRepository
     */
    whereLessOrEqualThan(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T>;
    /**
     * Returns a new QueryBuilder with a filter specifying that the
     * value in @param val must be contained in @param prop.
     *
     * @param {IWherePropParam<T>} prop field to be filtered on, where
     * prop could be keyof T or a lambda where T is the first parameter
     * @param {IFirestoreVal} val value to compare in the filter
     * @returns {QueryBuilder<T>} A new QueryBuilder with the specified
     * query applied.
     * @memberof AbstractFirestoreRepository
     */
    whereArrayContains(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T>;
    /**
     * Returns a new QueryBuilder with a filter specifying that the
     * field @param prop is an array that contains one or more of the comparison values in @param val
     *
     * @param {IWherePropParam<T>} prop field to be filtered on, where
     * prop could be keyof T or a lambda where T is the first parameter
     * @param {IFirestoreVal[]} val array of values to compare in the filter (max 10 items in array)
     * @returns {QueryBuilder<T>} A new QueryBuilder with the specified
     * query applied.
     * @memberof AbstractFirestoreRepository
     */
    whereArrayContainsAny(prop: IWherePropParam<T>, val: IFirestoreVal[]): IQueryBuilder<T>;
    /**
     * Returns a new QueryBuilder with a filter specifying that the
     * field @param prop matches any of the comparison values in @param val
     *
     * @param {IWherePropParam<T>} prop field to be filtered on, where
     * prop could be keyof T or a lambda where T is the first parameter
     * @param {IFirestoreVal[]} val[] array of values to compare in the filter (max 10 items in array)
     * @returns {QueryBuilder<T>} A new QueryBuilder with the specified
     * query applied.
     * @memberof AbstractFirestoreRepository
     */
    whereIn(prop: IWherePropParam<T>, val: IFirestoreVal[]): IQueryBuilder<T>;
    /**
     * Returns a new QueryBuilder with a filter specifying that the
     * field @param prop matches none of the comparison values in @param val
     *
     * @param {IWherePropParam<T>} prop field to be filtered on, where
     * prop could be keyof T or a lambda where T is the first parameter
     * @param {IFirestoreVal[]} val[] array of values to compare in the filter (max 10 items in array)
     * @returns {QueryBuilder<T>} A new QueryBuilder with the specified
     * query applied.
     * @memberof AbstractFirestoreRepository
     */
    whereNotIn(prop: IWherePropParam<T>, val: IFirestoreVal[]): IQueryBuilder<T>;
    /**
     * Returns a new QueryBuilder with a maximum number of results
     * to return. Can only be used once per query.
     *
     * @param {number} limitVal maximum number of results to return
     * Must be greater or equal than 0
     * @returns {IQueryBuilder<T>} QueryBuilder A new QueryBuilder with
     * the specified limit applied
     * @memberof AbstractFirestoreRepository
     */
    limit(limitVal: number): IQueryBuilder<T>;
    /**
     * Returns a new QueryBuilder with an additional ascending order
     * specified by @param prop. Can only be used once per query.
     *
     * @param {IWherePropParam<T>} prop field to be ordered on, where
     * prop could be keyof T or a lambda where T is the first parameter
     * @returns {QueryBuilder<T>} A new QueryBuilder with the specified
     * ordering applied.
     * @memberof AbstractFirestoreRepository
     */
    orderByAscending(prop: IWherePropParam<T>): IQueryBuilder<T>;
    /**
     * Returns a new QueryBuilder with an additional descending order
     * specified by @param prop. Can only be used once per query.
     *
     * @param {IWherePropParam<T>} prop field to be ordered on, where
     * prop could be keyof T or a lambda where T is the first parameter
     * @returns {QueryBuilder<T>} A new QueryBuilder with the specified
     * ordering applied.
     * @memberof AbstractFirestoreRepository
     */
    orderByDescending(prop: IWherePropParam<T>): IQueryBuilder<T>;
    /**
     * Execute the query and applies all the filters (if specified)
     *
     * @returns {Promise<T[]>} List of documents that matched the filters
     * (if specified)
     * @memberof AbstractFirestoreRepository
     */
    find(): Promise<T[]>;
    /**
     * Execute the query to find at least one document matching all
     * filters (if specified)
     *
     * @returns {Promise<T | null>} One document that matched the filters
     * (if specified), or null if none exists.
     *
     * @memberof AbstractFirestoreRepository
     */
    findOne(): Promise<T | null>;
    /**
     * Returns a new QueryBuilder with an custom query
     * specified by @param func. Can only be used once per query.
     *
     * @param {ICustomQuery<T>} func function to run in a new query
     * @returns {QueryBuilder<T>} A new QueryBuilder with the specified
     * custom query applied.
     * @memberof AbstractFirestoreRepository
     */
    customQuery(func: ICustomQuery<T>): IQueryBuilder<T>;
    /**
     * Uses class-validator to validate an entity using decorators set in the collection class
     *
     * @param item class or object representing an entity
     * @returns {Promise<ValidationError[]>} An array of class-validator errors
     */
    validate(item: T): Promise<ValidationError[]>;
    /**
     * Takes all the queries stored by QueryBuilder and executes them.
     * Must be implemented by base repositores
     *
     * @abstract
     * @param {IFireOrmQueryLine[]} queries list of queries stored in
     * QueryBuilder
     * @param {number} [limitVal] (Optional) if a limit constraint
     * should be applied
     * @param {IOrderByParams} [orderByObj] (Optional) if a sortBy
     * clause should be applied
     * @returns {Promise<T[]>} results from firestore converted into
     * entities <T>
     * @memberof AbstractFirestoreRepository
     */
    abstract execute(queries: IFireOrmQueryLine[], limitVal?: number, orderByObj?: IOrderByParams, single?: boolean, customQuery?: ICustomQuery<T>): Promise<T[]>;
    /**
     * Retrieve a document with the specified id.
     * Must be implemented by base repositores
     *
     * @abstract
     * @param {string} id
     * @returns {Promise<T>}
     * @memberof AbstractFirestoreRepository
     */
    abstract findById(id: string): Promise<T | null>;
    /**
     * Creates a document.
     * If no id is passed, is automatically generated.
     * Must be implemented by base repositores
     *
     * @abstract
     * @param {string} id
     * @returns {Promise<T>}
     * @memberof AbstractFirestoreRepository
     */
    abstract create(item: PartialBy<T, 'id'>): Promise<T>;
    /**
     * Updates a document.
     * Must be implemented by base repositores
     *
     * @abstract
     * @param {string} id
     * @returns {Promise<T>}
     * @memberof AbstractFirestoreRepository
     */
    abstract update(item: T): Promise<T>;
    /**
     * Deletes a document.
     * Must be implemented by base repositores
     *
     * @abstract
     * @param {string} id
     * @returns {Promise<T>}
     * @memberof AbstractFirestoreRepository
     */
    abstract delete(id: string): Promise<void>;
}
