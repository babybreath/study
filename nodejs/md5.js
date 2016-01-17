// 计算文件内容md5|sha1
// command-> node md5.js [md5|sha1] [filename]
var crypto = require('crypto');

var fs = require('fs');
var currentPath = process.cwd();
var argv = process.argv.splice(2);

var hashType = 'md5';

var goUp = function(filename){
	var path;
	if(filename.indexOf(':') > -1){
		path = filename;
	}else{
		path = currentPath + '/' +filename;
	}
	var stat = fs.lstatSync(path);
	if(stat.isDirectory()){
		console.log('file->' + filename + ' is directory.');
		return;
	}
	var s = fs.ReadStream(path);
	var md5 = crypto.createHash( hashType );
	s.on('data', function(d){
		md5.update(d)
	});
	s.on('end', function(){
		var d = md5.digest('hex');
		console.log('file->' + filename + ' ' + hashType + '->' + d);
	});
	s.on('error', function(){
		console.log('file->' + filename + ' not find.');
	});
}
if(argv[0] == 'md5' || argv[0] == 'sha1'){
	hashType = argv[0];
	argv.shift();
}
if(argv.length < 1){
	argv = fs.readdirSync(currentPath);
}
for(var i = 0; i < argv.length; i++){
	goUp(argv[i]);
}
