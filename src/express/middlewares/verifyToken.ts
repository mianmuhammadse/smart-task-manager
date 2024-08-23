import { NextFunction, Request, Response } from 'express';
import { admin } from '../../firebase';
import { errorResponse } from '../../utils/common-utils';
import log from '../../utils/log';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
	const idToken = req.cookies.token;
	if (!idToken) {
		return res.status(403).send({
		  status: 403,
		  message: 'No Token Provided',
		});

	}

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    log.error(error);
    return res.status(403).send({
      status: 403,
      message: 'Invalid Token',
    })
  }
};

export default verifyToken;
