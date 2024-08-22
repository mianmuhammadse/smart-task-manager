import { DataTypes, Sequelize } from 'sequelize';
import config from './config';
import log from '../utils/log';
import initModels from './initModels';

const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];
log.info(' Dialect config: ', envConfig);

export interface Database {
	sequelize: Sequelize;
}

let db: Database = {
	sequelize: new Sequelize({ ...envConfig }),
};

initModels(db, DataTypes);

export default db;
