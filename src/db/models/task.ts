import { Model, Sequelize, DataTypes } from 'sequelize';

export class Task extends Model {
	public id!: number;
	public title!: string;
	public description!: string;
	public userId!: number;
}

export function initializeTaskModel(sequelize: Sequelize): void {
	Task.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			title: {
				type: new DataTypes.STRING(128),
				allowNull: false,
			},
			description: {
				type: new DataTypes.STRING(128),
				allowNull: false,
			},
			userId: {
				type: new DataTypes.INTEGER(),
				allowNull: false,
				references: {
					model: 'users',
					key: 'id',
				},
			},
		},
		{
			tableName: 'tasks',
			timestamps: true,
			sequelize,
		}
	);
}
