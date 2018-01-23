const fs = require('fs');
const rx = require('rxjs');

const readFromPath$ = rx.Observable.bindNodeCallback(fs.readdir);
const readFileFromPath$ = rx.Observable.bindNodeCallback(fs.readFile);
const writeToFileFromPath$ = rx.Observable.bindNodeCallback(fs.writeFile);

readFromPath$('./resources')
    .mergeMap(folderNames => rx.Observable.from(folderNames.filter(folderName => /\d/.test(folderName))))
    .mergeMap(folderName => readFromPath$(`./resources/${folderName}`).map(files => ({
        label: parseFileFolderNames(folderName),
        files: files.map(fileName => ({
            label: parseFileFolderNames(fileName),
            path: `./resources/${folderName}/${fileName}`
        }))
    })))
    .reduce((acc, next) =>
`${acc}
${next.label}
    ${next.files.map(fileData => `
    1. [${fileData.label}](${fileData.path})
`).join('')}`, '')
    .mergeMap(tableOfContentString => readFileFromPath$('./README.md', 'utf8')
        .mergeMap((readmeText) =>
         writeToFileFromPath$('./README.md', updateREADME(readmeText, tableOfContentString))
    ))
    .subscribe(res => console.log('success writing to README'));

function parseFileFolderNames(fileOrFolderName) {
    return fileOrFolderName.split('-').map(item =>
        `${isNaN((item.charAt(0).toUpperCase())) ? 
            item.charAt(0).toUpperCase() : 
            `${item.charAt(0).toUpperCase()}.`}${item.substring(1).replace('.md', '')}`).join(' ');
}

function updateREADME(allReadme, replaceContentText) {
    return allReadme.replace(/(<!---generated start-->)([\s\S]*?)(<!---generated end-->)/gmi, `$1 ${replaceContentText} $3`);
}