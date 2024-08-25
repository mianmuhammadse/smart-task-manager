import { NextFunction, Request, Response } from 'express';
import { admin } from '../../firebase';

declare global {
	namespace Express {
		interface Request {
			user?: any;
		}
	}
}

const verifyTokenAndRole = async (req: Request, res: Response, next: NextFunction) => {
	const idToken = req.headers.cookie?.split(';')[0].split('=')[1];
	const userRole = req.headers.cookie?.split(';')[1].split('=')[1];

	if (!idToken || !userRole) {
		return res.status(401).send({
			status: 401,
			message: 'No Token Provided',
		});
	}

	try {
		const decodedToken = await admin.auth().verifyIdToken(idToken);
		req.user = decodedToken;
		next();
	} catch (error) {
		console.log(error);
		return res.status(401).send({
			status: 401,
			message: 'Invalid Token',
		});
	}
};

export default verifyTokenAndRole;
