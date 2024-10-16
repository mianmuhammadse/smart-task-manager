import { Request, Response, Router } from 'express';
import userService from '../../../../services/users-service';


const router = Router();

const userRoutes = () => {
	router.get('/hello', async (req: Request, res: Response) => {
		try {
			const data = await userService.helloUser();
			res.status(data.statusCode).send(data);
		} catch (error) {
			console.log(error);
			res.status(500).send({
				status: 500,
				message: 'Internal Server Error',
			});
		}
	});

	return router;
};

export default userRoutes;
