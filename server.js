const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3200;

app.get("/", (req, res) => {
	return res.json({ msg: "This is get route" });
});

app.put("/user/edit/:id", (req, res) => {
	return res.json({ msg: `This is put route and requested ID is ${req.params.id}` });
});

app.post("/user/create", (req, res) => {
	return res.json(req.body);
});

const authMiddleWare = (req, res, next) => {
	if (req.headers["token"] !== "df65g43df") return res.status(401).json({ msg: "You are Unauthorized" });

	next();
};

const isAdmin = (req, res, next) => {
	console.log(req.headers["is-admin"]);
	if (req.headers["is-admin"] === "false") return res.status(401).json({ msg: "You are not admin" });

	next();
};

const empDetails = (req, res) => {
	const date = new Date();
	return res.json({ name: "Test", email: "test@test.com", salary: 2521561321, doj: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`, dob: date.getTime() });
};

app.get("/users/:id", (req, res) => {
	return res.json({ params: req.params, query: req.query });
});

app.post("/employeeDetails", [authMiddleWare, isAdmin], empDetails);

app.listen(PORT, () => {
	console.log(`Surver is running on http://localhost:${PORT}`);
});
