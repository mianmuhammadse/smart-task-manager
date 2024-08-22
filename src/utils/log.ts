const log = {
	info: (...text: any) => {
		console.log(
			new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' }) +
				'#INFO#',
			...text
		);
	},
	debug: (...text: any) => {
		if (process.env.LOGGER_DEBUG) {
			console.log(
				new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' }) +
					'#DEBUG#',
				...text
			);
		}
	},
	error: (...text: any) => {
		console.error(
			new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' }) +
				'#ERROR#',
			...text
		);
	}
};

export default log;
