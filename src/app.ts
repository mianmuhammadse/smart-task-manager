import setupServer from './express/server';
import db from './db';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

console.log('Application starting ...');

const app = setupServer();

db.sequelize
	.authenticate()
	.then(() => console.log('Connection has been established successfully.'))
	.catch((error) => console.error('Unable to connect to the database:', error));

app.listen(PORT, () => {
	console.log(`App started on port ${PORT}`);
});
