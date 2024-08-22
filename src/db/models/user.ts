
const User = function (sequelize, DataTypes) {

	return sequelize.define('users', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: 'users_email_key'
		}
	}, {
		tableName: 'users',
		timestamps: true
	});
	
};

export default User;
