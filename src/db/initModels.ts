import { Database } from '.';
import User from './models/user';
import { DataTypes as SequelizeDataTypes } from 'sequelize';

const initModels = async (db: Database, DataTypes: typeof SequelizeDataTypes) => {
	const users = User(db.sequelize, DataTypes);
	// db.sequelize.sync({force: true})

	// driverDocuments.belongsTo(users, {
	// 	as: 'driver',
	// 	foreignKey: 'userId'
	// });

	// vehicles.belongsTo(users, { as: 'vehicles', foreignKey: 'userId' });

	// users.hasOne(vehicles, { as: 'vehicle', foreignKey: 'vehicleId' });

	return { users };
};

export default initModels;
