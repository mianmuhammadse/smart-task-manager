import setupRoutes from './express/routes/routes';
import setupServer from './express/server';
import log from './utils/log';
import 'dotenv/config';
import db from './db';

const PORT = process.env.PORT || 3000;

log.info('Application starting ...');

const app = setupServer();

setupRoutes(app);

db.sequelize
	.authenticate()
	.then(async () => {
		log.info('Connection has been established successfully.');
	})
	.catch((error) => {
		log.error('Unable to connect to the database:', error);
	});

app.listen(PORT, () => {
	log.info(`App started on port ${PORT}`);
});
