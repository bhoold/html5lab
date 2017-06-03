$(document).ready(function($){
    var arrowHeight = 20;




    $(document)
        .on('click',function(e){
            var $elem = $(e.target);
            if(($elem.closest('#menu').length == 0 || $elem.attr('id') == 'menu') && $('#menu').hasClass('open')){
                $('#menu').removeClass('open');
                $('#menu .item').removeClass('show');
                $('#menu .submenu.wheel').removeClass('wheel');
                $('#menu .list-wrap').attr('style','');
                $('#menu .list').attr('style','');
            }
        })
        .mousewheel(function(e, delta){
            var $elem = $(e.target).closest('.submenu');
            if($elem.length && $elem.hasClass('wheel')){
                e.preventDefault();
                e.stopPropagation();

                var $list = $elem.find('.list:eq(0)'),
                    $wrap = $elem.find('.list-wrap:eq(0)');
                var y = $list.data('offsetY') || 0,
                    speed = 20,
                    height = $list.data('height') || $list.height();
                if(!$list.data('height')){
                    height = $list.height();
                    $list.data('height' ,height);
                    $wrap.data('height' ,$wrap.height());

                }
                if(delta > 0){ //up
                    y = Math.min(0, y + speed);
                }else{//down
                    y = Math.max(0-(height - $wrap.data('height')), y - speed);
                }
                $list.css('transform','matrix(1,0,0,1,0,' + y + ')').data('offsetY', y);
                return false;
            }
        })
        .on('click','#menu .item',function(e){
            e.preventDefault();
            e.stopPropagation();
        })
        .on('mouseenter','#menu .submenu .item',function(e){
            var $this = $(this);
            if($this.attr('disabled') != "disabled"){
                if(!$('#menu-fixed').length) $('<div id="menu-fixed"></div>').appendTo('body');
                $this.find('.submenu:eq(0)').appendTo('#menu-fixed');
            }
        })
        .on('mouseleave','#menu .submenu .item',function(e){
            $('#menu-fixed').remove();
        })
        .on('click','#menu .item-level-1',function(){
            if($('#menu').toggleClass('open').hasClass('open')){
                $(this).addClass('show');

                var $submenu = $(this).find('.submenu-level-1'),
                    maxHeight = $(window).height() - $('#menu').height(),
                    height;
                if($submenu.height() > maxHeight){
                    height = maxHeight - arrowHeight*2;
                    $submenu.addClass('wheel').find('.list-wrap').height(height);
                }

            }else{
                $(this).removeClass('show');
                $('#menu .submenu.wheel').removeClass('wheel');
                $('#menu .list-wrap').attr('style','');
                $('#menu .list').attr('style','');
            }
        })
        .on('mouseenter','#menu .item-level-1',function(){
            if($('#menu').hasClass('open')){
                if($(this).hasClass('show')){return false; }
                $('#menu .submenu.wheel').removeClass('wheel');
                $('#menu .list-wrap').attr('style','');
                $('#menu .list').attr('style','');

                $(this).addClass('show').siblings().removeClass('show');

                var $submenu = $(this).find('.submenu-level-1'),
                    maxHeight = $(window).height() - $('#menu').height(),
                    height;
                if($submenu.height() > maxHeight){
                    height = maxHeight - arrowHeight*2;
                    $submenu.addClass('wheel').find('.list-wrap').height(height);
                }

            }
        })
        .on('click','#menu .submenu.wheel',function(e){
            e.preventDefault();
            e.stopPropagation();

            var $elem = $(this).closest('.submenu');
            var $list = $elem.find('.list:eq(0)'),
                $wrap = $elem.find('.list-wrap:eq(0)');
            var y = $list.data('offsetY') || 0,
                speed = $wrap.height(),
                height = $list.data('height') || $list.height();
            if(!$list.data('height')){
                height = $list.height();
                $list.data('height' ,height);
                $wrap.data('height' ,$wrap.height());

            }
            if(e.originalEvent.offsetY > arrowHeight){ //up
                y = Math.max(0-(height - $wrap.data('height')), y - speed);
            }else{//down
                y = Math.min(0, y + speed);
            }
            $list.css('transform','matrix(1,0,0,1,0,' + y + ')').data('offsetY', y);

        })
        /*
        .on('mousedown','#menu .submenu.wheel',function(e){
            e.preventDefault();
            e.stopPropagation();

            var $elem = $(this).closest('.submenu');
            var $list = $elem.find('.list:eq(0)'),
                $wrap = $elem.find('.list-wrap:eq(0)');

        window.timer = setInterval(function(){
            var y = $list.data('offsetY') || 0,
                speed = 20,
                height = $list.data('height') || $list.height();
            if(!$list.data('height')){
                height = $list.height();
                $list.data('height' ,height);
                $wrap.data('height' ,$wrap.height());

            }
            if(e.originalEvent.offsetY > arrowHeight){ //up
                y = Math.max(0-(height - $wrap.data('height')), y - speed);
            }else{//down
                y = Math.min(0, y + speed);
            }
            $list.css('transform','matrix(1,0,0,1,0,' + y + ')').data('offsetY', y);
        },100);

        })
        .on('mouseup','#menu .submenu.wheel',function(e){
            e.preventDefault();
            e.stopPropagation();
            clearInterval(window.timer)
        })
        */


});



