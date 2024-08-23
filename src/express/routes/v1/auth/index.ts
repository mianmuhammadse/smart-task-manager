import { Request, Response, Router } from 'express';
import log from '../../../../utils/log';
import authService from '../../../../services/auth-service';

const router = Router();

const authRoutes = () => {
	router.post('/register', async (req: Request, res: Response) => {
		try {
			const data = await authService.register(req.body);
			res.status(data.statusCode).send(data);
		} catch (error) {
			log.error(error);
			res.status(500).send({
				status: 500,
				message: 'Internal Server Error',
			});
		}
	});

	router.post('/login', async (req: Request, res: Response) => {
		try {
			const data: any = await authService.loginUser(req.body);
			const idToken = data?.data?.idToken;

			if(!idToken) {
				res.cookie('token', idToken, {
					httpOnly: true,
				})
			}

			res.status(data.statusCode).send(data);
		} catch (error: any) {
			log.error(error);
			res.status(500).send({
				status: 500,
				message: 'Internal Server Error',
			});
		}
	});

	return router;
};

export default authRoutes;
