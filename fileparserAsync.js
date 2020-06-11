const path = require("path");
const fs = require("fs");
const util = require("util");

const stat = util.promisify(fs.stat);
const fsrmdir = util.promisify(fs.rmdir);
const fslink = util.promisify(fs.link);
const fsunlink = util.promisify(fs.unlink);
const fsrename = util.promisify(fs.rename);

module.exports.FilesTaskAsync = (inPath, outPath, delFiles) => {
	console.log("Task 1, file parser async");

	console.log("Delete mode:", delFiles === "true");


	const CopyFiles = async (fpath) => {
		return new Promise(async (compleate) => {
			let files = fs.readdirSync(fpath);

			files.forEach(async (file) => {
				let newPath = path.join(fpath, file);
				let elmType = fs.statSync(newPath);

				if (elmType.isDirectory()) {
					await CopyFiles(newPath);
                    if (delFiles === "true") await fsrmdir(newPath);
                    compleate();
					return;
				}

				await FileMove(newPath);
			});
			if (delFiles === "true") await fsrmdir(fpath);

			compleate();
		});
	};

	const FileMove = async (file) => {
		let name = path.parse(file).base;
		let dirToCopy = name.charAt(0).toUpperCase();
		try {
			dirToCopy = path.join(outPath, dirToCopy);
			let destFilePath = path.join(dirToCopy, name);

			if (!fs.existsSync(dirToCopy)) fs.mkdirSync(dirToCopy);

			if (fs.existsSync(destFilePath)) {
				await fsunlink(destFilePath);
			}

			if (delFiles !== "true") {
				await fslink(file);
			} else {
				await fsrename(file, destFilePath);
			}
		} catch (err) {
			console.log(">", err.toString());
		}
    };
    
    return new Promise((compleate, err) => {
		stat(inPath).then((stat) => {
			if (!stat.isDirectory()) {
				console.log("Invalid input path");
				return;
			}

			if (!fs.existsSync(outPath)) fs.mkdirSync(outPath);

			CopyFiles(inPath).then(() => {
				compleate();
			});
		});
	});
};
