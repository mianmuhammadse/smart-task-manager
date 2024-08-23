import { Model, Sequelize, DataTypes } from 'sequelize';

export class User extends Model {
	public id!: number;
	public name!: string;
	public email!: string;
}

export function initializeUserModel(sequelize: Sequelize): void {
	User.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: new DataTypes.STRING(128),
				allowNull: false,
			},
			email: {
				type: new DataTypes.STRING(128),
				allowNull: false,
			},
		},
		{
			tableName: 'users',
			timestamps: true,
			sequelize,
		}
	);
}
