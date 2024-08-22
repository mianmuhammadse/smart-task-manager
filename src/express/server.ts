import express, { Application } from 'express';
import log from '../utils/log';
import cors from 'cors';

const setupThirdPartyMiddlewares = (app: Application) => {
	log.info('Setting up third-party middleware');

	log.info('Setting up cors()');
	let corsOptions = {
		exposedHeaders: [
			'Accept-Language',
			'Access-Control-Allow-Origin',
			'Connection',
			'Content-Length',
			'Content-Type',
			'Date',
			'Etag',
			'Server',
			'Via',
			'X-Auth',
			'X-Powered-By',
		],
	};
	app.use(cors(corsOptions));

	log.debug('Setting up express.json()');
	app.use(express.json());
};

const setupServer = function () {
	const app = express();
	if (app) {
		log.info('Setting up middleware...');

		setupThirdPartyMiddlewares(app);
	} else {
		log.error('Undefined [app] provided');
	}
	return app;
};

export default setupServer;
