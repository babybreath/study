// dir
var fs = require('fs');

var to_extension = 'html';
var files = fs.readdirSync('./');

files.forEach(function(file){
    var pathname = file;
    var stat = fs.lstatSync(pathname);
    if(!stat.isDirectory()){
        var name = file.toString();
        fs.rename(name, name.substr(0, name.indexOf('.')) + '.' + to_extension);
    }
});
