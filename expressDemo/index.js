var express = require('express');
var app = express();



const os = require('os');
const fs = require('fs');
const osPath = require('path');
const querystring = require('querystring');


const isTTY = Boolean(process.stdout.isTTY); //命令行模式
const currentFilePath = __filename; //当前文件绝对地址
const currentPath = __dirname;	//当前路径
const sep = osPath.sep; //路径分隔符

const outputPath = currentPath + sep + 'dist'; //打包文件目录
const devPath = currentPath + sep + 'src'; //开发文件目录



app.all('*', async (req, res)=>{
	let path = req.path,
		files = [];
	if(path.indexOf('.ico') > -1){ //不处理favicon.ico图标
		res.send();
		return 0;
	}
	if(path.lastIndexOf('/') == path.length - 1){ //最后一位不能为sep分隔符
		path = path.substring(0, path.length - 1)
	}
	path = path.split('/').join(sep);
	path = devPath + path;
	var str = '<p>当前目录: ' + path + '</p>';
	await readDir(path).then((res)=>{
		if(res.state){
			files = res.data;
		}else{
			console.log(res.data)
		}
	});
	str += '<table>';
	await each(files, path).then((res)=>{
		str += res;
	});
	str += '</table>';
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
			let path = currentPath + sep + item,
				state = {};
			await stat(path).then((res)=>{
				if(res.state){
					state = res.data;
				}else{
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
		fs.stat(path,(err,stat)=>{
			if(err)
				resolve({state:0, data: err});
			else
				resolve({state:1, data: stat});
		});
	});
}

function readDir(path){
	return new Promise((resolve, reject)=>{
		fs.readdir(path,(err,files)=>{
			if(err)
				resolve({state:0, data: err});
			else
				resolve({state:1, data: files});
		});
	});
}























var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});