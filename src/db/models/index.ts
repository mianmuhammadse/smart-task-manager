import { initializeUserModel } from './user';
import { initializeTaskModel } from './task';

const dbModelInitializer = [initializeUserModel, initializeTaskModel];

export default dbModelInitializer;
