
// --- 上传相关start ---
var originalData = '', //上传的文本数据
	isUpdated = false, //是否已上传

	sourceTableData = { //初始表数据
		textCol: [],
		numCol: [],
		col: [],
		rowData: []
	},

	
	selectOpts = { //属性数据
		activeChartId: '',
		textList: [],
		NumList: []
	}
	;


// 处理上传的文本
function analyzingUpdateData(txt) {
    if((typeof(txt) == 'string')) {
        originalData = txt;
    } else {
        originalData = this.result;
    }

	originalData = originalData.replace(/\r\n?/g, '\n');

	var rows = originalData.split('\n');
	sourceTableData.col = rows[0].split(';'); //第一行当做表头


	for(var i = 1; i < rows.length; i++) {
		var rowData = rows[i].split(';'),
			arr = [];
		sourceTableData.col.forEach(function(col, i) {
			if(rowData[i] !== undefined) {
				arr[i] = rowData[i];
			}
		});
		sourceTableData.rowData.push(arr);
	}

	//区分数字列和文本列
	sourceTableData.col.forEach(function(col, i) {
		if(col != '') {
			var isTextCol = false;
			isNum = sourceTableData.rowData.some(function(row) {
				var value = row[i];
				if(value === undefined || isNaN(value)) {
					isTextCol = true;
				}
				return isTextCol;
			});
			if(isTextCol) {
				sourceTableData.textCol.push(col);
			} else {
				sourceTableData.numCol.push(col);
			}
		}
	});

}

//显示页面组件
function showDomLayout() {
	if(isUpdated) {
		$('#charts').removeClass('hide');
	}
}
// --- 上传相关end ---



// --- 拖动相关start ---
var dragstart = false, //拖拽标识
	inContainer = false; //是否在可释放区
	startX = 0, //拖动开始坐标
	startY = 0, //拖动开始坐标
	w = 80, //拖动物宽
	h = 80, //拖动物高
	$dargImg = null; //拖动对象

//拖动函数
function moveDargImg(e) {
	if(!(dragstart && $dargImg)) {
		return
	}

	var x = e.pageX-w/2,
		y = e.pageY-h/2;

	$dargImg.css({
		left: x,
		top: y
	});

	var c_x = $('#container').offset().left,
		c_y = $('#container').offset().top,
		c_w = $('#container').outerWidth(),
		c_h = $('#container').outerHeight();

	if(e.pageX > c_x && e.pageX < c_x+c_w && e.pageY > c_y && e.pageY < c_y+c_h){
		$('#container').addClass('hover');
		inContainer = true;
	}else{
		$('#container').removeClass('hover');
		inContainer = false;
	}
}

//释放函数
function freeDargImg() {
	if(dragstart) {
		if(inContainer) {
			$('#container').removeClass('hover');

			if(isUpdated) {
				var type = $dargImg.data('type');
				createChart(type);
			}
		}

		dragstart = false;
		inContainer = false;
		$dargImg.remove();
		$dargImg = null;
	}

	$(document).off('mousemove', moveDargImg).off('mouseup', freeDargImg);
}
// --- 拖动相关end ---



var chartsData = { //图表数据
	currentId: -1,
	list: []
};


// 生成图表
function createChart(type) {
	switch(type) {
		case 'line':
			createLineChart();
			break;
		case 'bar':
			createBarChart();
			break;
		case 'pie':
            createPieChart();
			break;
		case 'pivot':
			createPivotTable();
			break;
	}
}

// 折线图
function createLineChart() {
	if(!(sourceTableData.numCol.length && sourceTableData.textCol.length)) {
		$('#upload-state').text('没有足够的数据展示');
		return;
	}

	chartsData.currentId++;
	chartsData.list[chartsData.currentId] = {
		id: chartsData.currentId,
		type: 'line',
		chartObj: null,
		$wrap: null,
		title: 'chart_' + chartsData.currentId,
		xselected: sourceTableData.textCol[0],
		yselected: sourceTableData.numCol[0],
		xData: [],
		yData: []
	};

	var $wrap = $('<div data-id="' + chartsData.list[chartsData.currentId].id + '" id="chart' + chartsData.list[chartsData.currentId].id + '" class="wrap-item line"><p class="title">' + chartsData.list[chartsData.currentId].title + '</p><div class="body"></div>').appendTo($('#container'));
	var myChart = echarts.init($wrap.find('.body')[0]);
	chartsData.list[chartsData.currentId].chartObj = myChart;
	chartsData.list[chartsData.currentId].$wrap = $wrap;

	updataChart(chartsData.currentId);

}

// 柱状图
function createBarChart() {
	if(!(sourceTableData.numCol.length && sourceTableData.textCol.length)) {
		$('#upload-state').text('没有足够的数据展示');
		return;
	}

	chartsData.currentId++;
	chartsData.list[chartsData.currentId] = {
		id: chartsData.currentId,
		type: 'bar',
		chartObj: null,
		$wrap: null,
		title: 'chart_' + chartsData.currentId,
		xselected: sourceTableData.textCol[0],
		yselected: sourceTableData.numCol[0],
		xData: [],
		yData: []
	};

	var $wrap = $('<div data-id="' + chartsData.list[chartsData.currentId].id + '" id="chart' + chartsData.list[chartsData.currentId].id + '" class="wrap-item bar"><p class="title">' + chartsData.list[chartsData.currentId].title + '</p><div class="body"></div>').appendTo($('#container'));
	var myChart = echarts.init($wrap.find('.body')[0]);
	chartsData.list[chartsData.currentId].chartObj = myChart;
	chartsData.list[chartsData.currentId].$wrap = $wrap;

	updataChart(chartsData.currentId);

}

// 饼图
function createPieChart() {
	if(!(sourceTableData.numCol.length && sourceTableData.textCol.length)) {
		$('#upload-state').text('没有足够的数据展示');
		return;
	}

	chartsData.currentId++;
	chartsData.list[chartsData.currentId] = {
		id: chartsData.currentId,
		type: 'pie',
		chartObj: null,
		$wrap: null,
		title: 'chart_' + chartsData.currentId,
		xselected: sourceTableData.textCol[0],
		yselected: sourceTableData.numCol[0],
		xData: [],
		yData: []
	};

	var $wrap = $('<div data-id="' + chartsData.list[chartsData.currentId].id + '" id="chart' + chartsData.list[chartsData.currentId].id + '" class="wrap-item pie"><p class="title">' + chartsData.list[chartsData.currentId].title + '</p><div class="body"></div>').appendTo($('#container'));
	var myChart = echarts.init($wrap.find('.body')[0]);
	chartsData.list[chartsData.currentId].chartObj = myChart;
	chartsData.list[chartsData.currentId].$wrap = $wrap;

	updataChart(chartsData.currentId);

}

// 表格
function createPivotTable() {
	chartsData.currentId++;
	chartsData.list[chartsData.currentId] = {
		id: chartsData.currentId,
		type: 'pivot',
		chartObj: null,
		$wrap: null,
		title: 'chart_' + chartsData.currentId,
		xselected: [],
		yselected: [],
		pivotData: {}
	};

	var $wrap = $('<div data-id="' + chartsData.list[chartsData.currentId].id + '" id="chart' + chartsData.list[chartsData.currentId].id + '" class="wrap-item pivot"><p class="title">' + chartsData.list[chartsData.currentId].title + '</p><div class="body"></div>').appendTo($('#container'));
	
	chartsData.list[chartsData.currentId].chartObj = $wrap;
	chartsData.list[chartsData.currentId].$wrap = $wrap;

	var $table = $('<table class="sourceTable" cellspacing="0" cellpadding="0" border="0" />'),
		$thead = $('<thead />'),
		$tbody = $('<tbody />');

	//表头
	var $tr = $('<tr />');
	sourceTableData.col.forEach(function(col) {
		$tr.append('<th>' + col + '</th>');
	});
	$table.append($thead.append($tr));

	//表内容
	sourceTableData.rowData.forEach(function(row) {
		var $tr = $('<tr />');
		row.forEach(function(value) {
			$tr.append('<td>' + value + '</td>');
		})
		$tbody.append($tr);
	});
	$wrap.find('.body').append($table.append($tbody));
}


function updataChart(chartId) {
	var chart = chartsData.list[chartId];
	if(!chart) {
		return;
	}

	chart.$wrap.find('.title').text(chart.title);

	if(chart.type == 'line') {
		updataLineChart(chart);	
	} else if(chart.type == 'bar') {
		updataBarChart(chart);		
	} else if(chart.type == 'pie') {
		updataPieChart(chart);		
	} else if(chart.type == 'pivot') {
		updataPivotChart(chart);		
	}
}

function updataLineChart(chart) {
	var xData = [],
		yData = [];
	
	var index = -1;
	sourceTableData.col.some(function(col, i) {
		if(col == chart.xselected) {
			index = i;
		}
		return col == chart.xselected;
	});

	sourceTableData.rowData.forEach(function(row) {
		if(row[index] != '' && !xData.includes(row[index])) {
			xData.push(row[index]);
		}
	});

	var indexNum = -1;
	sourceTableData.col.some(function(col, i) {
		if(col == chart.yselected) {
			indexNum = i;
		}
		return col == chart.yselected;
	});
	xData.forEach(function(value) {
		var count = 0;

		var index = -1;
		sourceTableData.col.some(function(col, i) {
			if(chart.xselected == col) {
				index = i;
			}
			return chart.xselected == col;
		});
		sourceTableData.rowData.forEach(function(row) {
			if(value == row[index]) {
				count += parseInt(row[indexNum], 10);
			}
		});
		yData.push(count);
	});

	var option = {
        tooltip : {
            trigger: 'item',
            formatter: "{b} : {c}"
        },
		xAxis: {
			boundaryGap: false,
			data: xData
		},
		yAxis: {
			type: 'value'
		},
		series: [{
			data: yData,
			type: 'line'
		}]
	};

	chart.xData = xData;
	chart.yData = yData;
	chart.chartObj.setOption(option);
}

function updataBarChart(chart) {
	var xData = [],
		yData = [];
	
	var index = -1;
	sourceTableData.col.some(function(col, i) {
		if(col == chart.xselected) {
			index = i;
		}
		return col == chart.xselected;
	});

	sourceTableData.rowData.forEach(function(row) {
		if(row[index] != '' && !xData.includes(row[index])) {
			xData.push(row[index]);
		}
	});

	var indexNum = -1;
	sourceTableData.col.some(function(col, i) {
		if(col == chart.yselected) {
			indexNum = i;
		}
		return col == chart.yselected;
	});
	xData.forEach(function(value) {
		var count = 0;

		var index = -1;
		sourceTableData.col.some(function(col, i) {
			if(chart.xselected == col) {
				index = i;
			}
			return chart.xselected == col;
		});
		sourceTableData.rowData.forEach(function(row) {
			if(value == row[index]) {
				count += parseInt(row[indexNum], 10);
			}
		});
		yData.push(count);
	});

	var option = {
        tooltip : {
            trigger: 'item',
            formatter: "{b} : {c}"
        },
		xAxis: {
			data: xData
		},
		yAxis: {
			type: 'value'
		},
		series: [{
			data: yData,
			type: 'bar'
		}]
	};

	chart.xData = xData;
	chart.yData = yData;
	chart.chartObj.setOption(option);
}

function updataPieChart(chart) {
	var xData = [],
		yData = [];
	
	var index = -1;
	sourceTableData.col.some(function(col, i) {
		if(col == chart.xselected) {
			index = i;
		}
		return col == chart.xselected;
	});

	sourceTableData.rowData.forEach(function(row) {
		if(row[index] != '' && !xData.includes(row[index])) {
			xData.push(row[index]);
		}
	});

	var indexNum = -1;
	sourceTableData.col.some(function(col, i) {
		if(col == chart.yselected) {
			indexNum = i;
		}
		return col == chart.yselected;
	});
	xData.forEach(function(value) {
		var count = 0;

		var index = -1;
		sourceTableData.col.some(function(col, i) {
			if(chart.xselected == col) {
				index = i;
			}
			return chart.xselected == col;
		});
		sourceTableData.rowData.forEach(function(row) {
			if(value == row[index]) {
				count += parseInt(row[indexNum], 10);
			}
		});
		yData.push({value:count, name:value});
	});

	var option = {
        tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: xData
        },
		series: [{
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: yData
		}]
	};

	chart.xData = xData;
	chart.yData = yData;
	chart.chartObj.setOption(option);
}

function updataPivotChart(chart) {
	if(!chart.xselected.length) {
		return;
	}

	chart.chartObj.find('.sourceTable').addClass('hide');

	var pivotData = {
		rowData: sourceTableData.rowData
	};
	dataToPivot(chart.xselected, pivotData);

	chart.chartObj.find('.pivotTable').remove();

	var $table = $('<table class="pivotTable" cellspacing="0" cellpadding="0" border="0" />');
	var $thead = $('<thead />');
	var $tbody = $('<tbody />');

	var $tr = $('<tr />');
	$tr.append('<th>' + pivotData.title + '</th>');
	chart.yselected.forEach(function(col) {
		$tr.append('<th>' + col + '</th>');
	});
	$table.append($thead.append($tr));
	
	getChildTr(pivotData, 0, chart).forEach(function($tr){
		$tbody.append($tr);
	});

	$table.append($tbody);
	chart.chartObj.find('.body').append($table);
	chart.pivotData = pivotData;
}


// 根据选项转换透视数据
function dataToPivot(selected, parent) {
	selected.forEach(function(name, i ,selfArr) {
		var selfLen = selfArr.length,
			indexCol = -1;
		
		if(i > 0) {
			return;
		}
		
		// 获取列索引indexCol
		sourceTableData.col.some(function(col, iCol) {
			if(col == name) {
				indexCol = iCol;
			}
			return col == name;
		});

		// 获取name的数据值
		var values = [],
			obj = {},
			rowData = [];

		parent.rowData.forEach(function(row) {
			var value = row[indexCol];
			if(value != '') {
				if(!values.includes(value)) {
					values.push(value);
					obj[value] = {
						title: value,
						rowData: []
					};
				}
				obj[value].rowData.push(row);
				rowData.push(row);
			}
		});

		parent.colName = name;
		parent.title = parent.title || name;
		parent.children = obj;
		parent.childrenNames = values;
		parent.rowData = rowData;

		if(i + 1 < selfLen) {
			values.forEach(function(key) {
				dataToPivot(selected.slice(1), obj[key]);
			});
		}
	});
}

// 获取子行
function getChildTr(parent, level, chart) {
	var newTrs = [];
	parent.childrenNames.forEach(function(name) {
		var icon = '',
			space = '<span style="display: inline-block;width:' + level*2 + 'em"></span>',
			len = '';
		var obj = parent.children[name];

		if(parent.children[name].childrenNames && parent.children[name].childrenNames.length) {
			icon = '<i class="folder">+</i> ';
			len = ' (' + parent.children[name].childrenNames.length + ')';
		}

		var $tr = $('<tr data-chartid="'+chart.id+'" data-key="'+name+'" data-level="'+level+'" class="level-'+level+'" />');
		$tr.data('pivotdata', obj);
		$tr.append('<td nowrap="nowrap">'+space+icon+name+len+'</td>');

		// 数据列
		chart.yselected.forEach(function(col2) {
			var index = -1,
				count = 0;
			sourceTableData.col.some(function(col, i) {
				if(col2 == col) {index = i;}
				return col2 == col;
			});
			if(index >= 0) {
				obj.rowData.forEach(function(row) {count += parseInt(row[index], 10);});
			}

			$tr.append('<td>' + count + '</td>');
		});

		newTrs.push($tr);
	});
	return newTrs;
}

