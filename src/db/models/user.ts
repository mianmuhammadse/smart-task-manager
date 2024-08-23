import { Model, Sequelize, DataTypes } from 'sequelize';

export class User extends Model {
	public id!: number;
	public email!: string;
	public firebaseId!: string;
	public photoURL?: string;
	public displayName?: string;
	public role!: string;
}

export function initializeUserModel(sequelize: Sequelize): void {
	User.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			email: {
				type: new DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			displayName: {
				type: new DataTypes.STRING,
				allowNull: true,
				field: 'display_name',
			},
			photoURL: {
				type: new DataTypes.STRING,
				allowNull: true,
				field: 'photo_url',
			},
			firebaseId: {
				type: new DataTypes.STRING,
				allowNull: false,
				field: 'firebase_id',
				unique: true,
			},
			role: {
				type: new DataTypes.ENUM('admin', 'user'),
				defaultValue: 'user',
				allowNull: false,

			}
		},
		{
			tableName: 'users',
			timestamps: true,
			sequelize,
		}
	);
}
