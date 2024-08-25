import express, { Application, NextFunction, Request, Response } from 'express';
import log from '../utils/log';
import cors from 'cors';
import session, { Session } from 'express-session';

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

	log.info('Setting up express.json()');
	app.use(express.json());

	log.info('Setting up express sessions.');
	app.use(session({
		secret: process.env.SESSION_SECRET || 'secret',
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 1000 * 60,
		}
	}))
};

const setupServer = function () {
	const app: Application = express();
	if (app) {
		log.info('Setting up middleware...');

		log.info('Setting up global error handler');
		app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
			log.error(err.stack);
			res.status(500).send({ error: err.message });
		});

		setupThirdPartyMiddlewares(app);
	} else {
		log.error('Undefined [app] provided');
	}
	return app;
};

export default setupServer;
