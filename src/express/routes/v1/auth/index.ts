import { Request, Response, Router } from 'express';
import authService from '../../../../services/auth-service';
import validate from '../../../middlewares/validations/validate';
import { registerSchema, loginSchema } from '../../../middlewares/validations/schemas';
import verifyTokenAndRole from '../../../middlewares/verifyTokenAndRole';

const router = Router();

const authRoutes = () => {
	router.post('/register', validate(registerSchema), async (req: Request, res: Response) => {
		try {
			const data = await authService.register(req.body);
			res.status(data.statusCode).send(data);
		} catch (error) {
			console.log(error);
			res.status(500).send({
				status: 500,
				message: 'Internal Server Error',
			});
		}
	});

	router.post('/login', validate(loginSchema), async (req: Request, res: Response) => {
		try {
			const data: any = await authService.loginUser(req.body);
			const userRole = data?.data?.role;
			const idToken = data?.data?.idToken;

			if (idToken && userRole) {
				res.cookie('token', idToken);
				res.cookie('userRole', userRole);
			}

			delete data.data.idToken;
			delete data.data.role;

			res.status(data.statusCode).send(data);
		} catch (error: any) {
			console.log(error);
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
			res.clearCookie('userRole');
			req.session.destroy((err) => {
				if (err) console.log(err);
				console.log('User logged out successfully');
			});
			res.status(data.statusCode).send(data);
		} catch (error: any) {
			console.log(error);
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
			console.log(error);
			res.status(500).send({
				status: 500,
				message: 'Internal Server Error',
			});
		}
	});

	router.get('/protected', verifyTokenAndRole, async (req: Request, res: Response) => {
		try {
			const data: any = await authService.protectedRoute();
			res.status(data.statusCode).send(data);
		} catch (error: any) {
			console.log(error);
			res.status(500).send({
				status: 500,
				message: 'Internal Server Error',
			});
		}
	});

	return router;
};

export default authRoutes;
