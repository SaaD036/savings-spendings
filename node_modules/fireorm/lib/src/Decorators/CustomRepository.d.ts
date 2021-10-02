import { Constructor, IEntity } from '../types';
import { BaseRepository } from '../BaseRepository';
export declare function CustomRepository<T extends IEntity = IEntity>(entity: Constructor<T>): (target: BaseRepository) => void;
