import type { EntityConstructorOrPath, IEntity } from '../types';
export declare class NoMetadataError extends Error {
    constructor(pathOrConstructor: EntityConstructorOrPath<IEntity>);
}
