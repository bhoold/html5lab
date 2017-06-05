jQuery(document).ready(function(){

	Mo.start();
});


var Mo={
	start:function(){
		if(location.href.split("#").length<=1){
			location.href=location.href+'#menu=home';
		};
		this.Menu.show();
	},
	Menu:{
		show:function(){
			var _T=this;
			$("#header").show().stop().animate({marginTop:"0px"},1000,'',function(){
				_T.click(Mo.Url.get('menu'));
			});
		},

		click:function(menu){

			var _T=this;
			$('#header ul li a').click(function(){
				$(this).parent().siblings().find('.hov').removeClass('hov');
				$(this).addClass('hov');
				_T.page(this.href);
			});
			$('#header ul li a:eq(0)').trigger('click');
		},

		page:function(_href){
			//alert(_href);
		}
	},
	Url:{
		data:{},
		get:function(_name){
			if(!((typeof _name === 'string') && (_name.length > 0)))return;
			if(this.data.length>0)return this.data[_name];
			var _href=location.href;
			var _urlDelimiter=['#','&','='];

			for(var i=0;i<_urlDelimiter.length;i++){
				switch(_urlDelimiter[i]){
					case '#':
						_href=_href.split('#');
						if(_href.length<=1)return;
						_href=_href[_href.length-1];
						break;
					case '&':
						_href=_href.split('&');
						break;
					case '=':
						var __href='';
						for(var _i=0;_i<_href.length;_i++){
							__href=_href[_i].split('=');
							if(__href.length==2){
								this.data[__href[0]]=__href[1];
							};
						}
						break;
				}
			}
			return this.data[_name];
		}
	},
	End:{}
};
