const express = require("express");

const app = express();

module.exports.ServerTask = () => {
	console.log("Task 1, UTC server part");

	const interval = process.env.HW_INTERVAL;
	const timeSpan = process.env.HW_TIMESPAN;

	console.log("Start params: ", interval, timeSpan);

	app.listen(8000, () => {
		console.log("Listen started");
	});

	const Loop = (iter, func) => {
		setTimeout(() => {
			let loopTime = new Date().toUTCString();
			console.log(loopTime);

			if (iter > 0) {
				iter -= timeSpan;
				Loop(iter, func);
			} else func(loopTime);
		}, timeSpan);
	};

	const AwaitLoop = () => {
		return new Promise((ok) => {
			Loop(interval, ok);
		});
	};
	app.get("/", (req, res) => {
		console.log(`resived get`);

		AwaitLoop().then((arg) => {
			res.send(`Client time arg: ${arg} `);
		});
	});
};
