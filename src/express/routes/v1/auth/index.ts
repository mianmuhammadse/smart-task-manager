import { Request, Response, Router } from 'express';
import log from '../../../../utils/log';
import authService from '../../../../services/auth-service';
import validate from '../../../middlewares/validations/validate';
import { registerSchema, loginSchema } from '../../../middlewares/validations/schemas';

const router = Router();

const authRoutes = () => {
	router.post('/register', validate(registerSchema), async (req: Request, res: Response) => {
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

	router.post('/login', validate(loginSchema),async (req: Request, res: Response) => {
		try {
			const data: any = await authService.loginUser(req.body);
			const idToken = data?.data?.idToken;

			if (idToken) {
				res.cookie('token', idToken, {
					httpOnly: true,
				});
			}

			delete data.data.idToken;

			res.status(data.statusCode).send(data);
		} catch (error: any) {
			log.error(error);
			res.status(500).send({
				status: 500,
				message: 'Internal Server Error',
			});
		}
	});

	router.post('/logout', async (req: Request, res: Response) => {
		try {
			const data: any = await authService.logOutUser();
			res.clearCookie('token');
			res.status(data.statusCode).send(data);
		} catch (error: any) {
			log.error(error);
			res.status(500).send({
				status: 500,
				message: 'Internal Server Error',
			});
		}
	});
	
	router.post('/forgot-password', async (req: Request, res: Response) => {
		try {
			const data: any = await authService.resetPassword(req.body);
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
