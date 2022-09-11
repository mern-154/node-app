const fs = require("fs");
const url = require("url");
const http = require("http");

const PORT = 3200;

http
	.createServer((req, res) => {
		const urlPath = url.parse(req.url).path;
		const urls = urlPath.split("/").slice(1);
		console.log(urls);

		if (req.method === "GET") {
			return fs.readFile("./about.html", (err, data) => {
				if (err) console.log("Error: ", err.message);

				return res.write(`${data.toString()}`);
			});
		} else if (req.method === "POST") {
			if (urls[0] === "user") {
				if (urls[1] === "edit" && urls[2] > 0) {
					return res.end(`This is a user and that ID is ${urls[2]}`);
				} else if (urls[1] === "create") {
					return res.end(`This is a create user route`);
				} else {
					return res.end("No route is there");
				}
			} else {
				fs.writeFile("test.js", "console.log('Hello, I am creating by your code!');", (err) => {
					if (err) console.log("Error: ", err.message);
				});
				res.end("This is POST Request");
			}
		} else {
			res.end("Request not matched!");
		}
		// res.end("Hello Guys!");
		return res.end();
	})
	.listen(PORT, () => {
		console.log(`Surver is running on http://localhost:${PORT}`);
	});
