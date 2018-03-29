let args = process.argv.slice(2),
    path = args[0],
    operations = []

if (path === undefined) {
    console.log('Usage: node index /path/to/scan')
    return -1
}

const git = require('simple-git')(path),
      dirTree = require('directory-tree'),
      exec = require('child_process').exec

/** Computes score asynchronously, formula is: commit count * (line count / 2). */
let computeScore = function(node) {
    return new Promise((resolve, reject) => {
        exec('wc -l < ' + node.path, function (error, lineCount) {
            git.log({file: node.path}, (err, log) => {
                node.score = log.all.length * (lineCount.trim() / 2)
                resolve()
            })
        })
    })
}

/** Computes score sums for each folder, representing the sum of all its leaves. */
let sumScores = function(obj) {
    if (obj.type === 'file') return obj.score
    else obj.score = 0
    obj.children.forEach(child => {
        child.score = count(child)
        obj.score += child.score
    })
    return obj.score
}

let printResults = function(tree) {
    let strResult = JSON.stringify(tree)
    console.log(strResult);
}

const ignoreList = [/\.git/, /target/, /node_modules/]
let tree = dirTree(path,
    {exclude: ignoreList},
    (node) => operations.push(computeScore(node))
)

Promise.all(operations)
    .then(() => sumScore(tree))
    .then(() => printResults(tree))
