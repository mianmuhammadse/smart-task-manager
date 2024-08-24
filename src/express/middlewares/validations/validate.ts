import { Request, Response, NextFunction } from 'express';
import * as z from 'zod';

const validate = (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
	try {
		schema.parse(req.body);
		next();
	} catch (error: any) {
		const errors = error.errors.map((err: any) => ({ field: err.path[0], message: err.message }));
		return res.status(400).json({
			errors,
		});
	}
};

export default validate;
