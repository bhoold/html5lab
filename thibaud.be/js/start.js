$(document).ready(function(){

	MVC ={};
	MVC.M = {
		win: {
			height	: 0,
			width	: 0
		},
		pic: {
			height	: 80,
			width	: 80
		},
		box: {
			height	: 100,
			width	: 100,
			right	: 1,
			bottom	: 1
		},
		boxtype: {
			grid: [],
			nav: [
				{index:'01',color:'#403b38',name:'About',img:'images/thumbs/1.jpg',tip:'图片1'},
				{index:'02',color:'#6b6360',name:'Links',img:'images/thumbs/2.jpg',tip:'图片2'},
				{index:'03',color:'#d77074',name:'Works 3D',img:'images/thumbs/3.jpg',tip:'图片3'},
				{index:'04',color:'#319ebd',name:'Works Webdesign',img:'images/thumbs/4.jpg',tip:'图片4'},
				{index:'05',color:'#92c568',name:'Works Identity',img:'images/thumbs/5.jpg',tip:'美图片5'},
				{index:'06',color:'#6b6360',name:'Contact',img:'images/thumbs/6.jpg',tip:'图片6'}
			],
			subnav: []
		}
	};
	MVC.V = {
		window		: window,
		wrapper$	: $('#wrapper'),
		container$	: $('<div id="container" />'),
		nav			: [],
		grid		: []
	};
	MVC.C = {
		init: function(){
			$(window).bind('resize',function(){
				location.reload();
				//MVC.C.resize();
			});
			this.resize();
		},
		makebox: function(){},
		initGridEvent: function(){
			function animate(grid,str){
				var css3 = false;
				if('hover' == str){
					if(css3)
						$(grid).removeClass('grid_nohover').addClass('grid_hover');
					else
						$(grid).stop().css({opacity:0.5});
				}else{
					if(css3)
						$(grid).removeClass('grid_hover').addClass('grid_nohover');
					else
						$(grid).stop().animate({opacity:1},500);
				}
			}

			$('.grid').hover(
				function(){animate(this,'hover');},
				function(){animate(this);}
			);
		},
		resize:function(){
			var _this		= MVC;
			var $W			= $(_this.V.window);
			var $wrapper	= _this.V.wrapper$;
			var $container	= _this.V.container$;
			var vGrids		= _this.V.grid;
			var vNavs		= _this.V.nav;
			var mNavs		= _this.M.boxtype.nav;
			var wHeight		= _this.M.win.height = $W.height();
			var wWidth		= _this.M.win.width = $W.width();
			var bHeight		= _this.M.box.height;
			var bWidth		= _this.M.box.width;
			var bHeightA	= _this.M.box.height + _this.M.box.bottom;
			var bWidthA		= _this.M.box.width + _this.M.box.right;
			var x			= Math.ceil(wWidth / bWidthA);
			var y			= Math.ceil(wHeight / bHeightA);
			var z			= x * y;
			var inter		= [];
			var nav,grid,lengthN = vNavs.length;
			var _pos		=[];
			var nLeft		=0;
			var nTop		=0;
			var noContent	= '页面尺寸太小，无法显示内容!';
			function getGridRandom(){//设置nav的位置
				var i = Math.floor(Math.random() * (inter.length) + 1) - 1;
				if(_pos.join(',').indexOf(i)>=0)i = arguments.callee();
				_pos.push(i);
				return i;
			}

			vGrids.length = 0;
			$container.find('.grid').remove();



			x = wWidth-(x-1)*bWidthA < 2 ? x-1 : x;
			y = wHeight-(y-1)*bHeightA < 2 ? y-1 : y;
			z = x * y;

			for(var i = 1;i <= z; i++){
				grid = $('<div class="grid"></div>').css({
					'height' : bHeight,
					'width' : bWidth,
					'top' : (Math.ceil(i / x) - 1) * bHeightA,
					'left': i > x ? ((i % x)-1) * bWidthA < 0 ? (((i-1) % x)-1) * bWidthA-((i % x)-1) * bWidthA : ((i % x)-1) * bWidthA : (i - 1) * bWidthA
				});

				//第一行 (i<=x)
				//每行第一个 (i%x == 1)
				//每行最后一个 (i%x == 0)
				//最后一行 (i>=z-x)
				if((i<=x) || (i%x <= 1) || (i%x == 0) || (i>=z-x)){
					grid.addClass('outer');
				}else{
					inter.push(i-1);//数组下标从0开始
				}
				vGrids.push(grid);
				$container.append(grid);
			}

			if(inter.length<mNavs.length){$wrapper.html(noContent);return};

			for(var i = 0;i<mNavs.length;i++){
				var index,w1,mask;
				index = getGridRandom();
				index=inter[index];
				nTop=$(vGrids[index][0].outerHTML).css('top');
				nLeft=$(vGrids[index][0].outerHTML).css('left');
				//$container.find('.grid').eq(index).css('background','red');

				if(lengthN){
					vNavs[i].reseat(nLeft,nTop);
				}else{
					w1 = $('<div class="w1"></div>').addClass('font').css({
						'height' : bHeight,
						'width' : bWidth,
						'background' : mNavs[i].color,
						'background' : 'url("'+mNavs[i].img+'") no-repeat center'
					}).html('<h3>'+mNavs[i].index+'</h3><p>'+mNavs[i].name+'</p>').html('');
					mask = $('<div class="mask"></div>').css({
						'height' : bHeight,
						'width' : bWidth
					});

					nav = $('<div class="nav"></div>').css({
						'top' : 0,
						'left' : 0
					}).html(w1).append(mask);
					vNavs.push(new GridNav(nav,nLeft,nTop,mNavs[i].tip));
					nav.appendTo($container);
				}


			}

			$container.css({
				'height' : bHeightA * y,
				'width' : bWidthA * x,
				'margin-top' :1==0 ? -(bHeightA * y - wHeight)/2 : 0,	//居中
				'margin-left' :1==0 ? -(bWidthA * x - wWidth)/2 : 0		//居中
			});

			$wrapper.css({
				'height' : wHeight,
				'width' : wWidth
			}).html($container);

			this.initGridEvent();
		}
	};

	MVC.C.init();


function GridNav(nav,x,y,tip){
	this.dragStartX = 0;
	this.dragStartY = 0;
	this.dragStartMouseX = 0;
	this.dragStartMouseY = 0;
	this.lastX = 0;
	this.lastY = 0;
	this.speedX = 0;
	this.speedY = 0;
	this.isTouch = false;
	this.isDraging = false;
	this.isDraged = false;
	this.isClicked = false;
	this.initFalg = true;
	this.tipFalg = true;
	this.taped = false;
	this.acceleration = 1.2;
	this.deg = 0;
	this.x = typeof x == 'number' ? x : getCssNum('',x);
	this.y = typeof y == 'number' ? y : getCssNum('',y);
	this.$nav = nav;
	this.tiptxt = tip ? '<div class="tip"><div class="wrap"><div class="text font">'+tip+'</div><div class="arrow"></div></div></div>' : '';
	this.subNavs = '';


	this.reseat = function(x,y,a,i,f){	//left,top,动画方式,初始化
		this.x = typeof x == 'number' ? x : getCssNum('',x);
		this.y = typeof y == 'number' ? y : getCssNum('',y);
		this.initFalg = i ? true : false;
		init(a,f);
	};
	this.subnav = function(){}
	this.tip = function(i){
		if (i) {	//第一次
			T.$nav.append(T.tiptxt);
			T.$nav.find('.tip').hide();
		}
		if (T.tipFalg) {
			T.$nav.bind('mouseover',over);
			T.$nav.bind('mouseout',out);
		}else{
			T.$nav.unbind('mouseover');
			T.$nav.unbind('mouseout');
			T.$nav.find('.tip').hide();
		}
		T.tipFalg = !T.tipFalg;
	}

	var M			= MVC;
	var $W			= $(M.V.window);
	var vNavs		= M.V.nav;
	var wHeight		= M.M.win.height;
	var wWidth		= M.M.win.width;
	var bHeight		= M.M.box.height;
	var bWidth		= M.M.box.width;
	var bHeightA	= M.M.box.height + M.M.box.bottom;
	var bWidthA		= M.M.box.width + M.M.box.right;
	var T			= this;
	var t;
	var tapTimer;
	init();

	function init(a,f){
		if(a){
				T.$nav.css({
					'top' : T.y,
					'left' : T.x
				});
		}else{
			T.$nav.animate({
				'top' : T.y,
				'left' : T.x
			},500,'easeOutSine',function(){
					if(typeof f == 'function'){
						f();
					}
			});
		}
		if(T.initFalg){
			if('ontouchstart' in document){T.isTouch=true;}
			//T.$nav.attr('draggable',false);
			add();
		}
	}

	function getCssNum(d,p){
		return Number((d ? d.css(p) : p).replace('px',''));
	}


	function add(){
		if(T.isTouch){
			T.$nav.bind('touchstart',function(e){
				e.preventDefault(); //拖动效果明显
				down(window.event.touches[0]);
			});
			T.$nav.bind('touchmove',function(e){
				e.preventDefault();
				move(window.event.touches[0]);
			});
			T.$nav.bind('touchend',function(e){
				e.preventDefault();
				up(window.event.touches[0]);
			});
		}else{
			T.$nav.bind('mousedown',down);
			T.$nav.bind('dragstart',function(){console.log('dragstart');return false;});
			//T.$nav.bind('drag',function(){console.log('drag');return false;});
			//T.$nav.bind('dragend',function(){console.log('dragend');return false;});
		}

		T.tip(1);
	}

	function over(e){
		var e,$tip,f;
		e = e || window.event;
		if(!$(e.target).hasClass('mask')){return;}
		$tip = T.$nav.addClass('active').find('.tip').removeClass().addClass('tip');
		if(T.y>bHeight){f = 1;}else{f = 3;}

		if (f == 1) {
			$tip.addClass('up').show().css({
				'top':'-90px'
			}).animate({'top':'-101px'},200);
		}else if(f == 2){
			$tip.addClass('right').show().css({
				'left':'90px'
			}).animate({'left':'101px'},200);
		}else if(f == 3){
			$tip.addClass('down').show().css({
				'top':'90px'
			}).animate({'top':'101px'},200);
		}else if(f == 4){
			$tip.addClass('left').show().css({
				'left':'-90px'
			}).animate({'left':'-101px'},200);
		}


	}

	function out(){
		T.$nav.removeClass('active').find('.tip').hide();
	}

	function down(e){
		var e = e || window.event;
		var tapi = 0;
		if (T.isTouch) {if(window.event && window.event.touches.length>1){alert('暂时只支持单点控制');return;}}
		if(!T.isDraging){
			T.isDraging = true;
			T.dragStartX = T.x;
			T.dragStartY = T.y;
			T.dragStartMouseX = e.clientX;
			T.dragStartMouseY = e.clientY;
			T.$nav.addClass('active');
			T.tip();
			if(!T.isTouch){
				$W.bind('mousemove',move);
				$W.bind('mouseup',up);
			}else{	//实现长按
				tapTimer = setInterval(function(){
					tapi+=10;
					if (tapi>=1000 || T.isDraged) {
						clearTimeout(tapTimer);
						if(!T.isDraged){T.taped = true;over(e);}
					}
				},10);
			}
		}
	}

	function up(e){
		if(T.isDraging){
			T.isDraging = false;
			if(!T.isTouch){
				$W.unbind('mousemove',move);
				$W.unbind('mouseup',up);
			}else{
				clearTimeout(tapTimer);
			}
			upMove(e);
			
		}
	}

	function click(){
		if(T.taped){out();return;}
		T.tip();
		T.subnav();
	}

	function move(e){
		var e = e || window.event;
		var x,y;
		x = T.dragStartX + e.clientX - T.dragStartMouseX;
		y = T.dragStartY + e.clientY - T.dragStartMouseY;
		if(x<0){
			x = 0;
			T.speedX = Math.abs(T.speedX);
		}
		if(y<0){
			y = 0;
			T.speedY = Math.abs(T.speedY);
		}
		if(x>wWidth-bWidth){
			x = wWidth-bWidth;
			T.speedX = -Math.abs(T.speedX);
		}
		if(y>wHeight-bHeight){
			y = wHeight-bHeight;
			T.speedY = -Math.abs(T.speedY);
		}

		T.reseat(x,y,1);

		T.speedX = x - T.lastX;
		T.speedY = y - T.lastY;
		T.lastX = x;
		T.lastY = y;
		T.isDraged = true;
		if(T.taped){T.taped = false;out();}
T.deg+=0.5;
T.$nav.css({
	'transform-origin':'(left,top)',
	'transform':'rotate('+T.deg+'deg) '
})







	}

	function upMove(e){
		var e = e || window.event;
		var t;
		var x,y;
		var ax,ay;
		var tx,ty;
		var flag = false;
		var acceleration = T.acceleration;
		var maxSpeed = 100;
		var s=1;
		function end(x,y){

				x = (x === undefined) ? Math.round(T.x/bWidthA)*bWidthA : x;
				y = (y === undefined) ? Math.round(T.y/bHeightA)*bHeightA : y;

				if (x+bWidthA>wWidth) {x-=bWidthA}
				if (y+bHeightA>wHeight) {y-=bHeightA}

				if(x>wWidth-2*bWidthA)s=2;
				if (s==2 && x-bWidthA<0)s=3;
				if(s==3 && y>wHeight-2*bHeightA)s=4;
				if(s==4 && y<0) {alert('移动距离超出范围');}

				for(var i=0;i<vNavs.length;i++){
					if (vNavs[i].isDraged) {continue;}
					if(x == vNavs[i].x && y == vNavs[i].y){
						flag = true;
						break;
					}
				}
				if(flag && T.isDraged){//如果重合查找周围
					if(s == 1)x+=bWidthA;
					else if(s == 2)x-=bWidthA;
					else if(s == 3)y+=bHeightA;
					else if(s == 4)y-=bHeightA;
					flag = false;
					arguments.callee(x,y);
					return;
				}
				T.$nav.css({
					'transform':'rotate(0deg)'
				})
				T.isDraged = false;
				T.reseat(x,y,0,0,function(){
					T.$nav.removeClass('active');
					T.tip();
				});
		}

		if(!T.isDraged){	//单击
			T.$nav.removeClass('active');
			click();
			return;
		}

		t = setInterval(function(){
			if(Math.abs(T.speedX)>maxSpeed){
				T.speedX = T.speedX>0 ? maxSpeed : -maxSpeed;
			}
			if(Math.abs(T.speedY)>maxSpeed){
				T.speedY = T.speedY>0 ? maxSpeed : -maxSpeed;
			}

			T.reseat(T.x + T.speedX,T.y + T.speedY,1);

			if (ax == 0 && ay == 0) {
				clearTimeout(t);
				end();
			}

			ax = Math.abs(T.speedX) - acceleration;
			ay = Math.abs(T.speedY) - acceleration;

			if(ax<0)ax=0;
			if(ay<0)ay=0;
			T.speedX = T.speedX >= 0?ax: -ax;
			T.speedY = T.speedY >= 0?ay: -ay;

			x = T.x;
			y = T.y;

            if (x < 0) {
                T.speedX = Math.abs(T.speedX);
				acceleration+=acceleration/2;
            }
            if (x > wWidth - bWidthA) {
                T.speedX = -Math.abs(T.speedX);
				acceleration+=acceleration/2;
            }
            if (y < 0) {
                T.speedY = Math.abs(T.speedY);
				acceleration+=acceleration/2;
            }
            if (y > wHeight - bHeightA) {
                T.speedY = -Math.abs(T.speedY);
				acceleration+=acceleration/2;
            }
		},20);
	}
}


});



