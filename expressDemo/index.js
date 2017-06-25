var express = require('express');
var app = express();



const os = require('os');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');


const isTTY = Boolean(process.stdout.isTTY); //命令行模式
const currentFilePath = __filename; //当前文件绝对地址
const currentPath = __dirname;	//当前路径
const sep = path.sep; //路径分隔符

const outputPath = currentPath + sep + 'dist'; //打包文件目录
const devPath = currentPath + sep + 'src'; //开发文件目录



app.get('*', function (req, res) {
	fs.readdir(devPath,(err,files)=>{
		if(err)
			console.log(err)
		let str = '<p>当前目录: ' + devPath + '</p><table>';
		files.forEach((item)=>{
			var path = devPath + sep + item;

			str += '<tr><td><a href="' + item + '">' + item + '</a></td></p>';

		});
		str += '</table>';
		res.send(str);
	})



  
});














var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});