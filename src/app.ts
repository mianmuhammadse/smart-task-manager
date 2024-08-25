import setupServer from './express/server';
import 'dotenv/config';
import { connectDatabase } from './db';

const PORT = process.env.PORT || 3000;

console.log('Application starting ...');

export const app = setupServer();

app.listen(PORT, () => {
	console.log(`App started on port ${PORT}`);
	connectDatabase();
});
