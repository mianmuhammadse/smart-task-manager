import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import session, { Session } from 'express-session';
import setupRoutes from './routes/routes';

const setupThirdPartyMiddlewares = (app: Application) => {
	console.log('Setting up third-party middleware');

	console.log('Setting up cors()');
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

	console.log('Setting up express.json()');
	app.use(express.json());

	console.log('Setting up express sessions.');
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
		console.log('Setting up middleware...');

		console.log('Setting up global error handler');
		app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
			console.log(err.stack);
			res.status(500).send({ error: err.message });
		});

		setupThirdPartyMiddlewares(app);
		setupRoutes(app);
	} else {
		console.log('Undefined [app] provided');
	}
	return app;
};

export default setupServer;
