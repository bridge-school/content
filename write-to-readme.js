const fs = require('fs');
const rx = require('rxjs');

const readFromPath$ = rx.Observable.bindNodeCallback(fs.readdir);

readFromPath$('./resources')
    .mergeMap(folderNames => rx.Observable.from(folderNames.filter(folderName => /\d/.test(folderName))))
    .mergeMap(folderName => readFromPath$(`./resources/${folderName}`).map(files => ({folderName, files})))
    .toArray()
    .subscribe(res => console.log(res));

// fs.readdir('./resources', (err, folderNames) => {
//
//     folderNames.filter((folderName) => /\d/.test(folderName))
//         .map(folderName => ({module: folderName, files: fs.readdir(`./${folderName}/`, (err, files) => .forEach(obj => console.log(obj)))}));
// });



fs.writeFile("./foo.md", "Hey there!", (err) => {


    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
