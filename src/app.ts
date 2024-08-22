import setupRoutes from './express/routes/routes';
import setupServer from './express/server';
import log from './utils/log';
import 'dotenv/config';
import db from './db';

db.sequelize
	.authenticate()
	.then(async () => {
		log.info('Connection has been established successfully.');
	})
	.catch((error) => {
		log.error('Unable to connect to the database:', error);
	});

const PORT = process.env.PORT || 3000;

const app = setupServer();

log.info('Application starting ...');

setupRoutes(app);

app.listen(PORT, () => {
	log.info(`App started on port ${PORT}`);
});
