const MO = {
	// 模块
	os: require('os'),
	fs: require('fs'),
	path: require('path'),
	querystring: require('querystring'),
	jschardet: require("jschardet"),

	//文件
	conf: require('./config'),
	env: {}
}
MO.env = {
	isTTY: Boolean(process.stdout.isTTY),
	sep: MO.path.sep
}






var express = require('express');
var app = express();



app.all('*', async (req, res)=>{
	let path = req.path;
	if(path.indexOf('.ico') > -1){ //不处理favicon.ico图标
		res.send();
		return 0;
	}
	if(path.lastIndexOf('/') == path.length - 1){ //最后一位不能为sep分隔符
		path = path.substring(0, path.length - 1)
	}
	path = path.split('/').join(MO.env.sep);
	path =  MO.conf.devPath + path;

	var errorMsg = {};
	var files = [], 
		state = {},
		str = '';

	await stat(path).then((res)=>{
		if(res.state){
			state = res.data;
		}else{
			errorMsg.code = 1;
			errorMsg.msg = res.data.path;
			console.log(res.data)
		}
	});
	
	if(state.isDirectory && state.isDirectory()){
		str = '<p>当前目录: ' + path + '</p>'
		str += '<table>';
		await readDir(path).then((res)=>{
			if(res.state){
				files = res.data;
			}else{
				errorMsg.code = 2;
				errorMsg.msg = res.data.path;
				console.log(res.data)
			}
		});
		await each(files, path).then((res)=>{
			str += res;
		});
		str += '</table>';
	}else{
		await readFile(path).then((res)=>{
			if(res.state){
				str = res.data;
			}else{
				errorMsg.code = 3;
				errorMsg.msg = res.data.path;
				console.log(res.data)
			}
		});
	}
	if(errorMsg.code)str = '错误号' + errorMsg.code + ':' + errorMsg.msg;
	res.send(str);
});





function each(files, currentPath) {
	return new Promise((resolve, reject)=>{
		var i = 0, 
			str = '';
		if(!files.length){
			resolve('');
		}
		files.forEach(async (item)=>{
			let path = MO.conf.devPath + MO.env.sep + item,
				state = {};
			await stat(path).then((res)=>{
				if(res.state){
					state = res.data;
				}else{
					errorMsg.code = 1;
					errorMsg.msg = res.data.path;
					console.log(res.data)
				}

			});
			str += '<tr>';
			if(state.isDirectory && state.isDirectory())
				str += '<td>[目录]</td>';
			else
				str += '<td>[文件]</td>';
			str += '<td><a href="' + item + '">' + item + '</a></td>';
			str += '</tr>';
			i++;
			if(files.length == i){
				resolve(str);
			}
		});
	});
}

function stat(path){
	return new Promise((resolve, reject)=>{
		console.log('stat:-------------')
		console.log(path)
		MO.fs.stat(path,(err,stat)=>{
			if(err)
				resolve({state:0, data: err});
			else
				resolve({state:1, data: stat});
		});
	});
}

function readDir(path){
	return new Promise((resolve, reject)=>{
		MO.fs.readdir(path,(err,files)=>{
			if(err)
				resolve({state:0, data: err});
			else
				resolve({state:1, data: files});
		});
	});
}

function readFile(path){
	return new Promise((resolve, reject)=>{
		MO.fs.readFile(path, 'utf-8', (err,text)=>{
			if(err)
				resolve({state:0, data: err});
			else
				resolve({state:1, data: text});
		});
	});
}



var server = app.listen(MO.conf.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});