const path = require("path");
const fs = require("fs");

module.exports.FilesTask = (inPath, outPath, delFiles) => {
	console.log("Task 1, file parser");

	console.log("Delete mode:", delFiles === "true");

	fs.stat(inPath, (err, stat) => {
		if (err) {
			console.log(">22", err);
			return;
		}

		if (!stat.isDirectory()) {
			console.log("Invalid input path");
			return;
		}

		if (!fs.existsSync(outPath)) fs.mkdirSync(outPath);

		CopyFiles(inPath);
	});

	const CopyFiles =  (fpath) => {
		let files = fs.readdirSync(fpath);

		files.forEach( (file) => {
			let newPath = path.join(fpath, file);
			let elmType = fs.statSync(newPath);

			if (elmType.isDirectory()) {

                 CopyFiles(newPath);
                if (delFiles === "true") 
                     fs.rmdir(newPath, (err)=>{});
				return;
			}

			 FileMove(newPath);
        });
        if (delFiles === "true") 
             fs.rmdir(fpath, (err)=>{});

	};

	const FileMove =  (file) => {
		let name = path.parse(file).base;
		let dirToCopy = name.charAt(0).toUpperCase();
		try {
			dirToCopy = path.join(outPath, dirToCopy);
			let destFilePath = path.join(dirToCopy, name);

			if (!fs.existsSync(dirToCopy)) fs.mkdirSync(dirToCopy);

			if (fs.existsSync(destFilePath)) {
				 fs.unlink(destFilePath, (err) => {
					if (err) console.log(">2", err);
				});
			}

			if (delFiles !== "true") {
				 fs.copyFile(file, destFilePath, (err) => {
					if (err) console.log(">2", err);
				});
			} else {
				 fs.rename(file, destFilePath, (err) => {
					if (err) console.log(">1", err);
				});
			}
		} catch (err) {
			console.log(">", err.toString());
		}
	};
};
