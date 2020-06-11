const serv = require("./timeserver");
const fm = require("./fileparser");
const fmasync = require("./fileparserAsync");

const param = process.argv.slice(2)[0];
const inPath = process.argv.slice(2)[1] || "InFolder";
const outPath = process.argv.slice(2)[2] || "OutFolder";
const delFiles = process.argv.slice(2)[3] || "true";

switch (param) {
	case "s":
		serv.ServerTask();
		break;
	case "f":
		fm.FilesTask(inPath, outPath, delFiles);
		break;
	case "fa":
		fmasync.FilesTaskAsync(inPath, outPath, delFiles).then(console.log("copy compleated"));
        break;
    default:
        console.log("wrong params")
        break;
}
