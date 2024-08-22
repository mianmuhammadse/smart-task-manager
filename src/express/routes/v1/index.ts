import { Router, Application, Request, Response, NextFunction } from 'express';
import userRoutes from './users';
import log from '../../../utils/log';

const index = (app: Application) => {
	app.use((req: Request, res: Response, next: NextFunction) => {
		log.info(req.method, req.url);
		next();
	});

	const router = Router();

	app.use('/v1', router);
	app.get('/', (req, resp) => {
		resp.status(200).send({ application: 'Hello World!!' });
	});

	router.use('/users', userRoutes());
};

export default index;
