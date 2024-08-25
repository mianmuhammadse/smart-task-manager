import setupServer from './express/server';
import 'dotenv/config';
import db from './db';

const PORT = process.env.PORT || 3000;

console.log('Application starting ...')

export const app = setupServer();

db.sequelize
	.authenticate()
	.then(async () => {
		console.log('Connection has been established successfully.');
	})
	.catch((error) => {
		console.log('Unable to connect to the database:', error);
	});

app.listen(PORT, () => {
	console.log(`App started on port ${PORT}`);
});
