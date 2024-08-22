import { Application } from 'express';
import index from './v1/index';

const setupRoutes = (app: Application) => {
	index(app);
};

export default setupRoutes;
