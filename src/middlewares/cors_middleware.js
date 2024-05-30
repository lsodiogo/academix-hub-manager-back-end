function corsMiddleware(req, res, next) {
	res.set("Access-Control-Allow-Origin", req.headers.origin);
	res.set("Access-Control-Allow-Credentials", true);
	res.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
	res.set("Access-Control-Allow-Headers", "Content-Type, *");

	if (req.method === "OPTIONS") {
		res.end();
		return;
	}

	next();
};

module.exports = corsMiddleware;