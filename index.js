let args = process.argv.slice(2)
let path = args[0]

if (path === undefined) {
    console.log('Usage: node index /path/to/scan');
    return -1
}

let git = require('simple-git')(path)
let recursive = require("recursive-readdir")
let exec = require('child_process').exec

let ignoreList = ['.git', 'target', 'node_modules']
let handleFile = (filepath) => {
    exec('wc -l < ' + filepath, function (error, lineCount) {
        git.log({file: filepath}, (err, log) => {
            if (log.all.length > 0) {
                console.log(`${filepath.replace(path, '')};${log.all.length};${lineCount.trim()}`);
            }
        });
    });
}

recursive(path, ignoreList, function (err, files) {
	files.forEach(handleFile);
});
