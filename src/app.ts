import setupServer from './express/server';
import { connectDatabase } from './db';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

console.log('Application starting ...');

const app = setupServer();

app.listen(PORT, () => {
	console.log(`App started on port ${PORT}`);
	connectDatabase();
});
