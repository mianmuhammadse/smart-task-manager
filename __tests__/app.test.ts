import setupServer from '../src/express/server';
import db from '../src/db';

jest.mock('../src/express/server', () => jest.fn());
jest.mock('../src/db', () => ({
	sequelize: { authenticate: jest.fn().mockResolvedValue('Connection established') },
}));

describe('App initialization', () => {
	let app: { listen: jest.Mock };

	beforeEach(() => {
		(setupServer as jest.Mock).mockReturnValue({
			listen: jest.fn((port: number, callback: () => void) => callback()),
		});
		app = require('../src/app');
	});

	test('should start the server on the specified port', async () => {
		const PORT = process.env.PORT || 3000;
		expect(setupServer).toHaveBeenCalled();
		expect(db.sequelize.authenticate).toHaveBeenCalled();
	});
});
