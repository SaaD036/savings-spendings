import { IEntityConstructor, IEntity } from '../types';
export declare function SubCollection(entityConstructor: IEntityConstructor, entityName?: string): (parentEntity: IEntity, propertyKey: string) => void;
