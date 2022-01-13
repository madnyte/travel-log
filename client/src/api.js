const API_URL = 'http://localhost:4000';

// eslint-disable-next-line import/prefer-default-export
export const listLogEntries = async () => {
	const res = await fetch(`${API_URL}/api/logs`);
	return res.json();
};

export const createLogEntry = async logEntry => {
	const res = await fetch(`${API_URL}/api/logs`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(logEntry),
	});
	return res.json();
};
