<!DOCTYPE html>
<html lang="zh-cn">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" >
	<title> New Document </title>
  <META name="Author" content="">
  <META name="Keywords" content="">
  <META name="Description" content="">

<script src="Dock.js"></script>
<script src="EffectBuffer.js"></script>
<script src="MoveLib.js"></script>
<script src="PerfectDrag.js"></script>
<script src="QuirkyPopup.js"></script>


<style type="text/css">
#container{
	height:1700px;
	width:100%;
	overflow:hidden;
}
#messageBoardContainer{
	width:352px;
	height:292px;
	position:absolute;
	border:1px solid #cccccc;

}
#messageBoardContainer h2{
	font-size:14px;
}
#messageBoardContainer .content{
	font-size:12px;
}

</style>
</head>
<body>
<div id="container">
<div id="messageBoardContainer">
	<div id="messageBoard">
		<div class="wrap">
			<h2>
				<span>妙味课堂-2013年新官网- 测试版已经上线啦</span>
				<a href="javascript:if(g_fnQuirkyPopupClose){g_fnQuirkyPopupClose()};" title="关闭"></a>
			</h2>
			<div class="content" style="font-family:Arial;">
				<p><span>妙味课程 - 新官网- 测试版 已经上线啦~<br />新版网站即将取代陪伴了我们3年多的旧版官网。</span></p>
				<p><span>目前我们提供了 Chrome 与 Firefox 浏览器的访问入口，其他浏览器访问 <a href="http://www.miaov.com ">www.miaov.com </a>跳转的仍是目前旧版官网。</span></p>
				<p><span>测试期间我们仍然会不断调整，欢迎大家提出修改意见！</span></p>
				<p style="display:none;"><span><a href="http://bbs.miaov.com/forum.php?mod=viewthread&tid=5962" target="_blank">>> 点击获取最新下载地址</a></span></p>
				<p style="display:none;"><span><a href="http://www.miaov.com/free_experience.html.php" target="_blank">>> 参加妙味课堂免费试听</a></span></p>
				<p style="display:none;"><span>妙味QQ群：172193115</span></p>
				<p class="date" style="position:absolute; bottom:10px; right:20px;"><span>妙味课堂 2013年9月10日</span></p>
			</div>
		</div>
		<div class="bg"></div>
	</div>
</div>
<a href="javascript:;" id="quirkyPopupShowBtn" style="display:none;"></a>
</div>
</body>
<script type="text/javascript">



if (typeof DockType == "undefined") {
        DockType = {
                LEFT: 1,
                RIGHT: 2,
                TOP: 4,
                BOTTOM: 8
         }
}
if (typeof MoveLibType == "undefined") {
        MoveLibType = {
                COLLISION: 1,
                ELASTICITY: 2,
                BUFFER: 3,
                DIRECT: 4,
                DIRECT_SLOW: 5,
                DIRECT_FAST: 6,
                BUFFER_CUSTOM: 7
        }
}
if (typeof ceilSpeed == "undefined") {
        ceilSpeed = function(fSpeed) {
                return fSpeed > 0 ? Math.ceil(fSpeed) : -Math.ceil( - fSpeed)
        }
}
function miaovAppendEventListener(obj, sEventName, fnEvent) {
        if (obj.attachEvent) {
                obj.attachEvent('on' + sEventName, fnEvent)
        } else {
                obj.addEventListener(sEventName, fnEvent, false)
        }
}
function miaovRemoveEventListener(obj, sEventName, fnEvent) {
        if (obj.detachEvent) {
                obj.detachEvent('on' + sEventName, fnEvent)
        } else {
                obj.removeEventListener(sEventName, fnEvent, false)
        }
}
function miaovCancelBubble(oEvent) {
        if (oEvent.stopPropagation) {
                oEvent.stopPropagation()
        } else {
                oEvent.cancelBubble = true
		}
}




function initQuirkyPopup() {

        var oDiv = document.getElementById('messageBoardContainer');
        var oDivContent = oDiv.getElementsByTagName('div')[0];
        var oText = oDiv.getElementsByTagName('div')[2];
        var aSpan = oText.getElementsByTagName('span');
        var oCloseBtn = oDiv.getElementsByTagName('a')[0];
        var oBtnShow = document.getElementById('quirkyPopupShowBtn');
        var w = 354;
        var h = 294;
        var i = 0;
        var t = document.body.scrollTop || document.documentElement.scrollTop;
        oDiv.style.left = (document.documentElement.clientWidth - w) / 2 + 'px';
        oDiv.style.top = t + (document.documentElement.clientHeight) / 2 + 'px';
        for (i = 0; i < aSpan.length; i++) {
                aSpan[i].onmousedown = function(ev) {
                        miaovCancelBubble(window.event || ev);
                        return false
                }
        }
console.log(w);
console.log(h);
console.log(oDiv.offsetWidth);
console.log(oDiv.offsetHeight);
        var oQP = new QuirkyPopup(
			oDiv, 
			oDiv, 
			oBtnShow, 
			oCloseBtn, 
			{x: w,y: h},
			function() { return { x: oDiv.offsetLeft, y: oDiv.offsetTop } },
			function() { return { x: oDiv.offsetWidth, y: oDiv.offsetHeight } },
			function(x, y) { oDiv.style.left = x + 'px'; oDiv.style.top = y + 'px' },
			function(x, y) {
                oDivContent.style.top = (y - h) / 2 + 'px';
                oDivContent.style.left = (x - w) / 2 + 'px';
                oDiv.style.width = x + 'px';
                oDiv.style.height = y + 'px'
			}
		);

        setTimeout(function() { oQP.initShow() }, 1000);
        if (/msie 6/i.test(navigator.userAgent) && !/msie 7/i.test(navigator.userAgent) && !/msie 8/i.test(navigator.userAgent)) {
                oBtnShow.style.position = 'absolute';
                miaovAppendEventListener(
					window, 
					'scroll',
					function() {
                        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                        oBtnShow.style.top = scrollTop + 'px'
                    }
				)
        }
}




initQuirkyPopup()
</script>
</html>