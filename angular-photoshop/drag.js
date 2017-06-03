    (function(){
        //拖拽的构造函数
        function Drag(){}
        //元素拖拽三要素：
        //1:加定位 position:absolute/fixed; 改变的元素:left 和top
        //2:绑定事件:onmousedown (onmousemove onmouseup)---document
        //3:清空鼠标事件
        Drag.prototype.init = function(options){
            var dragObj = this;
            //参数的混入 jquery $.extend
            var opts = mix(Object.create(null),{arrow:"",handler:"",parent:"",position:"relative"},options);
            var boxDom = opts.elem;
            //父元素
            var parentDom = opts.elem;
            if(opts.handler){
                boxDom = boxDom.children[opts.handler*1-1];
            }
            
            //获取父盒子对象   
            var parentBoxDom = opts.parent;
            if(parentBoxDom){
                parentBoxDom.style.position = opts.position;
            }else{
                parentBoxDom = document.body;
            }
            //console.log(parentBoxDom);
    
            var mark  = false;
            boxDom.onmousedown = function(e){
                if(e.which != 1){return false;}
                //拿到元素的位置
                var sleft = parentDom.offsetLeft;
                var stop = parentDom.offsetTop;
                var maxLeft = (parentBoxDom?parentBoxDom.offsetWidth:Math.max(window.innerWidth,document.body.clientWidth)) - parentDom.offsetWidth;
                var maxTop = (parentBoxDom?parentBoxDom.offsetHeight:Math.max(window.innerHeight,document.body.clientHeight)) - parentDom.offsetHeight;//潜在的问题?
                //拿到鼠标的位置
                var pos = getXY(e);
                var parentStyle = getComputedStyle(parentBoxDom);
                mark = true;
                document.onmousemove = function(e){
                    if(mark){
                        //移动鼠标的位置
                        var pos2 = getXY(e);
                        var nleft = pos2.x - pos.x + sleft;
                        var ntop = pos2.y - pos.y + stop;
                        //边界判断
                        var l = Number(parentStyle.paddingLeft.replace('px','')),
                            t = Number(parentStyle.paddingTop.replace('px','')),
                            r = Number(parentStyle.paddingRight.replace('px','')),
                            b = Number(parentStyle.paddingBottom.replace('px',''));

                        if(nleft<l)nleft = l;
                        if(ntop<t)ntop = t;
                        if(nleft>maxLeft-r)nleft = maxLeft-r;
                        if(ntop>maxTop-b)ntop = maxTop-b;
                        //改变位置
                        if(opts.arrow=="left"){
                            parentDom.style.left = nleft+"px";
                        }else if(opts.arrow=="top"){
                            parentDom.style.top = ntop+"px";
                        }else{
                            parentDom.style.left = nleft+"px";
                            parentDom.style.top = ntop+"px";
                        }
                        
                    }
                };
                //鼠标松开的时候，释放拖动
                document.onmouseup = function(){
                    this.onmousemove = null;
                    this.onmouseup = null;
                    mark = false;                    
                    if(opts.callback)opts.callback.call(parentDom);
                };
            };
        };
            
        function mix(target,source){ //多对象混合
            var arr = [];
            var args = arr.slice.call(arguments);
            var i = 1;
            if(args.length==1){
                return target;
            };
            while((source = args[i++])){
                for(var key in source){
                    if(source.hasOwnProperty(key)){
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };

        function getXY(e){  //获取坐标
            var ev = e || window.event;
            var x=0,y=0;
            if(ev.pageX){
                x = ev.pageX;
                y = ev.pageY;
            }else{
                //拿到scrollTop 和scrollLeft
                var sleft = 0,stop = 0;
                //ie678---
                if(document.documentElement){
                    stop =document.documentElement.scrollTop;
                    sleft = document.documentElement.scrollLeft;
                }else{
                //ie9+ 谷歌 
                    stop = document.body.scrollTop;
                    sleft = document.body.scrollLeft;
                }   
                x = ev.clientX + sleft;
                y = ev.clientY + stop;
            }
            return {x:x,y:y};
        };
        window.Drag = Drag;
    })();