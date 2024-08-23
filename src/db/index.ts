import { Sequelize } from 'sequelize';
import config from './config';
import log from '../utils/log';
import dbModelInitializer from './models';
import { User } from './models/user';
import { Task } from './models/task';


const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];
log.info(' Dialect config: ', envConfig);

export interface Database {
	sequelize: Sequelize;
}

let db: Database = {
	sequelize: new Sequelize({
		username: envConfig.username,
		password: envConfig.password,
		database: envConfig.database,
		host: envConfig.host,
		dialect: envConfig.dialect,
	}),
};

dbModelInitializer.forEach(initializer => {
	initializer(db.sequelize);
});

User.hasMany(Task, { foreignKey: 'userId', as : 'tasks' });
Task.belongsTo(User, { foreignKey: 'userId', as : 'user' });

export default db;
