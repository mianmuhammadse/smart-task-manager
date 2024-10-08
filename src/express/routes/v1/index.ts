import { Router, Application, Request, Response, NextFunction } from 'express';
import userRoutes from './users';
import authRoutes from './auth';
import log from '../../../utils/log';

const index = (app: Application) => {
	app.use((req: Request, res: Response, next: NextFunction) => {
		log.info(req.method, req.url);
		log.info(req.session.id);
		next();
	});

	const router = Router();

	app.use('/v1', router);
	app.get('/', (req: Request, resp: Response) => {
		resp.status(200).send({ application: 'Hello World!!' });
	});

	router.use('/auth', authRoutes());
	router.use('/users', userRoutes());
};

export default index;
