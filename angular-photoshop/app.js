!function(window, angular, undefined){

    angular.module('menu', [])
    .directive('menu', function(){
        return {
            restrict:'E',
            replace: true,
            templateUrl: 'tmpl/menu.html',
            controller: ['$scope', '$uibModal', function($scope, $uibModal){
                var stageCount = 1,
                    stageTopInit = 10,
                    stageLeftInit = 130,
                    stageSpace = 10
                    stageTop = stageTopInit,
                    stageLeft = stageLeftInit;
                $scope.itemClicked = '';
                $scope.menu = {
                    m_file: {
                        label: '文件(F)',
                        menu: {
                            m_new: {
                                label: '新建(N)',
                                shortcut: 'Ctrl+N'
                            },
                            m_open: {
                                label: '打开(O)',
                                shortcut: 'Ctrl+O',
                                isDisable: true
                            },
                            m_openAs: {
                                label: '打开为(A)',
                                shortcut: 'Alt+Shift+Ctrl+O',
                                isDisable: true
                            },
                            m_openAsSmart: {
                                label: '打开为智能对象',
                                shortcut: '',
                                isDisable: true
                            },
                            m_openRecen: {
                                label: '最近打开文件(T)',
                                shortcut: '',
                                hr: true,
                                isDisable: true
                            },
                            m_close: {
                                label: '关闭(C)',
                                shortcut: 'Ctrl+W',
                                isDisable: true
                            },
                            m_closeAll: {
                                label: '全部关闭',
                                shortcut: 'Alt+Ctrl+W',
                                isDisable: true
                            },
                            m_save: {
                                label: '存储(S)',
                                shortcut: 'Ctrl+S',
                                isDisable: true
                            },
                            m_saveAs: {
                                label: '存储为(V)',
                                shortcut: 'Shift+Ctrl+S',
                                isDisable: true
                            },
                            m_checkIn: {
                                label: '签入(C)',
                                shortcut: '',
                                isDisable: true
                            },
                            m_saveAsWeb: {
                                label: '存储为Web和设备所用格式(D)',
                                shortcut: 'Alt+Shift+Ctrl+S',
                                isDisable: true
                            },
                            m_resume: {
                                label: '恢复(R)',
                                shortcut: 'F12',
                                hr: true,
                                isDisable: true
                            },
                            m_embed: {
                                label: '置入(L)...',
                                shortcut: '',
                                hr: true,
                                isDisable: true
                            },
                            m_import: {
                                label: '导入(M)',
                                shortcut: '',
                                isDisable: true
                            },
                            m_export: {
                                label: '导出(E)',
                                shortcut: '',
                                hr: true,
                                isDisable: true
                            },
                            m_automate: {
                                label: '自动(U)',
                                shortcut: '',
                                isDisable: true
                            },
                            m_script: {
                                label: '脚本(K)',
                                shortcut: '',
                                hr: true,
                                isDisable: true
                            },
                            m_profile: {
                                label: '文件简介(F)...',
                                shortcut: 'Alt+Shift+Ctrl+I',
                                hr: true,
                                isDisable: true
                            },
                            m_setfile: {
                                label: '页面设置(G)...',
                                shortcut: 'Shift+Ctrl+P',
                                isDisable: true
                            },
                            m_print: {
                                label: '打印(P)...',
                                shortcut: 'Ctrl+P',
                                isDisable: true
                            },
                            m_printonce: {
                                label: '打印一份(Y)...',
                                shortcut: 'Alt+Shift+Ctrl+P',
                                hr: true,
                                isDisable: true
                            },
                            m_quit: {
                                label: '退出(X)...',
                                shortcut: 'Ctrl+Q',
                                isDisable: true
                            }
                        }
                    },/*
                    m_edit: {
                        label: '编辑(E)',
                        menu: {
                            m_restore: {
                                label: '还原(O)',
                                shortcut: 'Ctrl+Z',
                                isDisable: true
                            }
                        }
                    },*/
                    m_stage: {
                        label: '舞台(S)',
                        menu: {
                            m_stageSize: {
                                label: '舞台大小(S)',
                                isDisable: true
                            }
                            
                        }
                    },
                    m_view: {
                        label: '视图(V)',
                        menu: {
                            m_ruler: {
                                label: '标尺(R)',
                                shortcut: 'Ctrl+R',
                                isDisable: true
                            }/*,
                            m_restore: {
                                label: '缩小(O)',
                                shortcut: 'Ctrl+Z'
                            },
                            m_restore: {
                                label: '放大(O)',
                                shortcut: 'Ctrl+Z'
                            },
                            m_restore: {
                                label: '放大(O)',
                                shortcut: 'Ctrl+Z',
                                isDisable: true
                            }*/

                        }
                    },
                    m_window: {
                        label: '窗口(W)',
                        menu: {
                            m_arrange: {
                                label: '排列(A)',
                                shortcut: '',
                                isDisable: true,
                                hr: true,
                                menu: {
                                    m_cascade: {
                                        label: '层叠(D)'
                                    },
                                    m_horizontal: {
                                        label: '水平平铺(H)',
                                        isDisable: true
                                    },
                                    m_vertical: {
                                        label: '垂直平铺(V)',
                                        isDisable: true
                                    }
                                }
                            },
                            m_tool: {
                                label: '工具',
                                selected: true
                            },
                            m_panel: {
                                label: '面板',
                                selected: true
                            }
                        }
                    }
                }
                $scope.itemClick = function(e, key, k, k2){
                    e.stopPropagation();

                    if(k === undefined){//一级菜单
                        $scope.itemClicked = $scope.itemClicked != key ? key : '';
                    }else if(k2 === undefined){//二级菜单
                        if($scope.menu[key].menu[k].isDisable || $scope.menu[key].menu[k].menu){return false;}
                        $scope.itemClicked = '';
                        switch(key){
                            case 'm_file':
                                switch(k){
                                    case 'm_new':
                                        dialogCreateFile()
                                    break;
                                    case 'm_close':
                                    case 'm_closeAll':
                                        closeFile(k)
                                    break;
                                }
                            break;
                            case 'm_stage':
                                switch(k){
                                    case 'm_stageSize':
                                        dialogResetStage()
                                    break;
                                }
                            break;
                            case 'm_window':
                                switch(k){
                                    case 'm_arrange':
                                    break;
                                    default:
                                        if(/stage_/.test(k)){
                                            var id = Number(k.split('_')[1]);
                                            $scope.$root.stages.forEach(function(item, index, stages){
                                                item.active = item.id === id ? true : false;
                                            })
                                            for (var i in $scope.menu.m_window.menu){
                                                /stage_/.test(i) && ($scope.menu.m_window.menu[i].selected = i === k ? true : false);
                                            }
                                        }
                                }
                            break;
                        }
                    }else{
                        if($scope.menu[key].menu[k].menu[k2].isDisable){return false;}
                        $scope.itemClicked = '';
                        switch(key){
                            case 'm_window':
                                switch(k){
                                    case 'm_arrange':
                                        windowArrange(k2);
                                    break;
                                }
                            break;
                        }
                    }
                }
                $scope.itemEnter = function(key){
                    if($scope.itemClicked != ''){
                        $scope.itemClicked = key;
                    }
                }

                function windowArrange(mode){
                    var stageTop = stageTopInit;
                        stageLeft = stageLeftInit;
                    if(mode === 'm_cascade'){
                        $scope.$root.stages.forEach(function(stage, index, stages){
                            var style = stage.containerStyle;
                            stage.active = index === stages.length - 1;
                            style.zIndex = index + 1;
                            style.top = stageTop;
                            style.left = stageLeft;
                            stageTop += stageSpace;
                            stageLeft += stageSpace;
                        })
                    }else if(mode === 'm_horizontal'){

                    }else if(mode === 'm_vertical'){
                        
                    }
                }

                function dialogCreateFile(){
                    var dialogInstance = $uibModal.open({
                        backdrop: false,
                        animation: false,
                        windowClass: 'dialog-new-file',
                        templateUrl: 'tmpl/dialogCreateFile.html',
                        controller: function($scope) {
                            var title = '未命名-' + stageCount,
                                width = 500,
                                height = 400;
                            $scope.ok = function(){
                                $scope.$close($scope);
                            };
                            $scope.cancel = function(){
                                $scope.$dismiss();
                            };
                            $scope.reset = function(w, h){
                                var scrollWidth = 17,
                                    padding = 16,
                                    panelHeadHeight = 30,
                                    w = w || width,
                                    h = h || height,
                                    stage = {
                                        id: stageCount,
                                        title: title,
                                        active: true,
                                        canvas: {
                                            width: w,
                                            height: h
                                        },
                                        ruler: {
                                            width: w,
                                            height: h
                                        },
                                        containerStyle: {
                                            zIndex: stageCount,
                                            top:stageTop,
                                            left:stageLeft,
                                            width: w + scrollWidth + padding,
                                            height: h + panelHeadHeight + scrollWidth + padding
                                        }
                                    };
                                $scope.stage = stage;
                            };
                            $scope.reset();

                        }
                    });

                    dialogInstance.result.then(function($dialogScope){
                        

                        //菜单和舞台状态改变
                        $scope.menu.m_file.menu.m_close.isDisable = false;
                        $scope.menu.m_file.menu.m_closeAll.isDisable = false;
                        $scope.menu.m_stage.menu.m_stageSize.isDisable = false;
                        $scope.menu.m_view.menu.m_ruler.isDisable = false;
                        $scope.menu.m_window.menu.m_arrange.isDisable = false;

                        $scope.menu.m_view.menu.m_ruler.selected = true;

                        if($scope.$root.stages.length){
                            $scope.$root.stages.forEach(function(item, index, stages){
                                item.active = false;
                                $scope.menu.m_window.menu['stage_' + item.id].selected = false;
                            })
                        }else{
                            var arr = Object.keys($scope.menu.m_window.menu);
                            $scope.menu.m_window.menu[arr[arr.length - 1]].hr = true;
                        }

                        //给当前舞台焦点
                        $dialogScope.reset($dialogScope.stage.canvas.width, $dialogScope.stage.canvas.height);

                        var stage = $dialogScope.stage;
                        $scope.menu.m_window.menu['stage_' + stage.id] = {
                            label: stage.title,
                            selected: true
                        }
                        $scope.$root.stages.push(stage);

                        //设置下次参数
                        stageCount++;
                        stageLeft += stageSpace;
                        stageTop += stageSpace;
                    },function(){});
                }

                function closeFile(k){
                    if(k == 'm_closeAll'){                      
                        $scope.$root.stages = [];

                        for(i in $scope.menu.m_window.menu){
                            if(/stage_/.test(i)){
                                delete $scope.menu.m_window.menu[i];
                            }
                        }

                        var arr = Object.keys($scope.menu.m_window.menu);
                        $scope.menu.m_window.menu[arr[arr.length - 1]].hr = false;
                    }else{
                        var oldId, currentStage = {};
                        $scope.$root.stages.forEach(function(stage, index, stages){
                            if(stage.active){
                                oldId = stage.id;
                                stages.splice(index, 1);
                            }
                        })

                        if($scope.$root.stages.length){
                            currentStage = $scope.$root.stages[$scope.$root.stages.length - 1];
                            currentStage.active = true;
                        }

                        for(i in $scope.menu.m_window.menu){
                            if(/stage_/.test(i)){
                                var id = Number(i.split('_')[1]);
                                if(id === currentStage.id){
                                    $scope.menu.m_window.menu[i].selected = true;
                                }else if(id === oldId){
                                    delete $scope.menu.m_window.menu[i];
                                }
                            }
                        }

                        if(!$scope.$root.stages.length){
                            var arr = Object.keys($scope.menu.m_window.menu);
                            $scope.menu.m_window.menu[arr[arr.length - 1]].hr = false;
                        }
                    }

                    if($scope.$root.stages.length === 0){
                        $scope.menu.m_file.menu.m_close.isDisable = true;
                        $scope.menu.m_file.menu.m_closeAll.isDisable = true;
                        $scope.menu.m_stage.menu.m_stageSize.isDisable = true;
                        $scope.menu.m_view.menu.m_ruler.isDisable = true;
                        $scope.menu.m_window.menu.m_arrange.isDisable = true;

                        $scope.menu.m_view.menu.m_ruler.selected = false;

                    }
                }

                function dialogResetStage(){
                    var dialogInstance = $uibModal.open({
                        backdrop: false,
                        animation: false,
                        windowClass: 'dialog-reset-stage',
                        templateUrl: 'tmpl/dialogResetStage.html',
                        controller: function($scope) {

                            $scope.$root.stages.some(function(item){
                                if(item.active){
                                    $scope.stage = item;
                                    $scope.width = item.canvas.width;
                                    $scope.height = item.canvas.height;
                                }
                                return item.active;
                            })

                            $scope.ok = function(){
                                $scope.$close($scope);
                            };
                            $scope.cancel = function(){
                                $scope.$dismiss($scope);
                            };
                        }
                    });

                    dialogInstance.result.then(function($dialogScope){
                        $dialogScope.stage.ruler.width = $dialogScope.stage.canvas.width;
                        $dialogScope.stage.ruler.height = $dialogScope.stage.canvas.height;
                    },function($dialogScope){
                        $dialogScope.stage.canvas.width = $dialogScope.width;
                        $dialogScope.stage.canvas.height = $dialogScope.height;

                    });
                }

            }],
            link: function($scope,$elem,attrs){

            }
        }
    })

    angular.module('commonArea', [])
    .directive('commonarea', function(){
        return {
            restrict:'E',
            replace: true,
            templateUrl: 'tmpl/commonArea.html',
            controller: ['$scope', function($scope){
                $scope.over = function(){

                }

                /*
                $scope.$on('subNodeMessage',function($event, msg){console.log(msg)
                    if(msg.module == 'toolKit' && msg.event == 'selectToolItem'){
                        $('#commonArea .icon').empty().append(msg.$elem.find('i').clone())
                    }
                });*/
            }],
            link: function($scope,$elem,attrs){
                
            }
        }
    })

    angular.module('editor', [])
    .directive('editor', function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'tmpl/editor.html',
            controller: ['$scope', function($scope){
                $scope.mark = function(stageId){
                    $scope.currentMoving = stageId;
                };
                $scope.unmark = function(){
                    $scope.currentMoving = '';
                };
                $scope.activate = function(stageId){
                    var maxIndex = 0, 
                        currentIndex, 
                        stages = $scope.$root.stages;
                    stages.forEach(function(stage,index){
                        stage.active = stage.id === stageId ? (currentIndex = index, true) : false;
                        maxIndex = Math.max(stage.containerStyle.zIndex, maxIndex);
                    })

                    if(stages[currentIndex].containerStyle.zIndex != maxIndex){
                        stages[currentIndex].containerStyle.zIndex = maxIndex + 1;

                        for(var i in $scope.menu.m_window.menu){
                            if(/stage_/.test(i)){
                                $scope.menu.m_window.menu[i].selected = Number(i.split('_')[1]) === stageId;
                            }
                        }
                    }
                }
            }],
            link: function($scope,$elem,attrs){
            }
        }
    })
    .controller('dragCtrl', function($scope, $document){
        var dragMark  = false,
            sLeft,
            sTop,
            pos,
            pos2,
            style = $scope.item.containerStyle;
        function mousemove(e){
            if(!dragMark){return false;}
            pos2 = getXY(e);
            sLeft = (pos2.x - pos.x);
            sTop = (pos2.y - pos.y);
            $scope.dragInfo.currentElem.elem.style.transform = 'matrix(1,0,0,1,'+sLeft+','+sTop+')';
        }
        function mouseup(e){//todo: 未处理不在handleElem元素松开时的异常
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
            dragMark  = false;
            style.left += sLeft;
            style.top += sTop;
            $scope.dragInfo.currentElem.elem.style.transform = '';
        }
        $scope.dragInfo = Object.create(null);
        $scope.mousedownDrag = function(e){
            if(e.which != 1){return false;}
            if($scope.dragInfo.handleElem && $scope.dragInfo.handleElem.elem !== e.target){return false;}
            dragMark = true;
            sLeft = 0;
            sTop = 0;
            pos = getXY(e);
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
        }
    })
    .directive('moDrag', function($parse){
        return {
            restrict: 'A',
            controller: 'dragCtrl',
            link: function($scope,$elem,attrs){
                $scope.dragInfo.currentElem = {
                    elem: $elem[0],
                    attrs: attrs
                };
                $elem.on('mousedown',$scope.mousedownDrag);
            }
        }
    })
    .directive('moDragHandle', function(){
        return {
            restrict: 'A',
            controller: 'dragCtrl',
            link: function($scope,$elem,attrs){
                $scope.dragInfo.handleElem = {
                    elem: $elem[0],
                    attrs: attrs
                }
            }
        }
    })
    .controller('resetSizeCtrl', function($scope, $document){
        var resizeMark = false,
            pos,pos2,
            style = $scope.item.containerStyle,
            currentBorder,
            top,
            left,
            width,
            height,
            oldWidth,
            oldHeight;
        function mousemove(e){
            if(!resizeMark){return false;}
            pos2 = {
                x: e.pageX,
                y: e.pageY
            };
            
            switch(pos.arrow){
                case 'top':
                    if(pos2.y - pos.y > 0){// down
                        top += pos2.y - pos.y;
                        height -= pos2.y - pos.y;
                    }else{
                        top -= pos.y - pos2.y;
                        height += pos.y - pos2.y;
                    }
                break;
                case 'right':
                    width += pos2.x - pos.x;
                break;
                case 'bottom':
                    height += pos2.y - pos.y;
                break;
                case 'left':
                    if(pos2.x - pos.x > 0){// towards the right
                        left += pos2.x - pos.x;
                        width -= pos2.x - pos.x;
                    }else{
                        left -= pos.x - pos2.x;
                        width += pos.x - pos2.x;
                    }
                break;
                case 'left-top':
                    if(pos2.x - pos.x > 0){// towards the right
                        if(pos2.y - pos.y > 0){// down
                            top += pos2.y - pos.y;
                            height -= pos2.y - pos.y;
                            left += pos2.x - pos.x;
                            width -= pos2.x - pos.x;
                        }else{
                            top -= pos.y - pos2.y;
                            height += pos.y - pos2.y;
                            left += pos2.x - pos.x;
                            width -= pos2.x - pos.x;
                        }
                    }else{
                        if(pos2.y - pos.y > 0){// down
                            top += pos2.y - pos.y;
                            height -= pos2.y - pos.y;
                            left -= pos.x - pos2.x;
                            width += pos.x - pos2.x;
                        }else{
                            top -= pos.y - pos2.y;
                            height += pos.y - pos2.y;
                            left -= pos.x - pos2.x;
                            width += pos.x - pos2.x;
                        }
                    }
                break;
                case 'right-top':
                    if(pos2.y - pos.y > 0){// down
                        top += pos2.y - pos.y;
                        height -= pos2.y - pos.y;
                        width += pos2.x - pos.x;
                    }else{
                        top -= pos.y - pos2.y;
                        height += pos.y - pos2.y;
                        width += pos2.x - pos.x;
                    }
                break;
                case 'right-bottom':
                    width += pos2.x - pos.x;
                    height += pos2.y - pos.y;
                break;
                case 'left-bottom':
                    if(pos2.x - pos.x > 0){// towards the right
                        left += pos2.x - pos.x;
                        width -= pos2.x - pos.x;
                        height += pos2.y - pos.y;
                    }else{
                        left -= pos.x - pos2.x;
                        width += pos.x - pos2.x;
                        height += pos2.y - pos.y;
                    }
                break;
            }
            if(width < 200) {
                width = 200;
            }
            if(height < 200) {
                height = 200;
            }
            pos.x = pos2.x;
            pos.y = pos2.y;

            angular.element($scope.resetSizeInfo.targetElem.elem).css({
                'top': top,
                'left': left,
                'width': width,
                'height': height
            });
        }
        function mouseup(){
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
            angular.element(currentBorder.elem).removeClass('moving');
            resizeMark  = false;

            style.top = top,
            style.left = left,
            style.width = width,
            style.height = height;
            if(width != oldWidth || height != oldHeight){console.log()
                $scope.item.ruler.width = Math.max(width - 16 - 17, $scope.item.canvas.width);
                $scope.item.ruler.height = Math.max(height - 16 - 17 - 30, $scope.item.canvas.height)
            }
        }


        $scope.resetSizeInfo || ($scope.resetSizeInfo = Object.create(null));
        $scope.resetSizeInfo.handletElem || ($scope.resetSizeInfo.handletElem = []);

        $scope.mousedownSize = function(e){
            e.stopPropagation();
            if(e.which != 1){return false;}

            $scope.resetSizeInfo.handletElem.some(function(item){
                var rs = item.elem === e.target;
                if(rs)currentBorder = item;
                return rs;
            });
            pos = {
                x: e.pageX,
                y: e.pageY,
                arrow: currentBorder.attrs.moResetSizeHandle
            };
            top = style.top,
            left = style.left,
            width = style.width,
            height = style.height
            oldWidth = style.width,
            oldHeight = style.height;

            angular.element(e.target).addClass('moving');
            resizeMark = true;
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
        }
    })
    .directive('moResetSize', function(){
        return {
            restrict: 'A',
            controller: 'resetSizeCtrl',
            link: function($scope,$elem,attrs){
                $scope.resetSizeInfo.targetElem = {
                    elem: $elem[0],
                    attrs: attrs
                }
            }
        }
    })
    .directive('moResetSizeHandle', function(){
        return {
            restrict: 'A',
            controller: 'resetSizeCtrl',
            link: function($scope,$elem,attrs){
                $scope.resetSizeInfo.handletElem.push({
                    elem: $elem[0],
                    attrs: attrs
                })
                $elem.on('mousedown',$scope.mousedownSize);
            }
        }
    })
    .directive('moCanvasRender', function(){
        return {
            restrict: 'A',
            controller: ['$scope', '$element', '$attrs', '$timeout', function($scope, $elem, attrs, $timeout){
                $scope.ruler || ($scope.ruler = []);

                if(!$scope.itemWatched){$scope.itemWatched = true;
                    $scope.$watch('item', function(newObj, oldobj, $scope){
                        if(newObj.ruler.width !== oldobj.ruler.width){
                            $scope.ruler.some(function(item){
                                if(item.arrow == 'top'){
                                    draw(item.$elem, item.arrow, newObj.ruler.width);
                                }
                                return item.arrow == 'top';
                            })
                        }
                        if(newObj.ruler.height !== oldobj.ruler.height){
                            $scope.ruler.some(function(item){
                                if(item.arrow == 'left'){
                                    draw(item.$elem, item.arrow, newObj.ruler.height);
                                }
                                return item.arrow == 'left';
                            })
                        }
                    }, true);
                }
                function canvasDraw($elem, attrs){
                    $scope.ruler.push({$elem: $elem, arrow: attrs.moCanvasRender})
                    $timeout(function(){
                        draw($elem, attrs.moCanvasRender);
                    },0);
                }
                function draw($elem, arrow, x){
                    var canvas = $elem[0],
                        w = $elem.width(),
                        h = $elem.height(),
                        ctx = canvas.getContext('2d');
                    ctx.font = "9px \"Lucida Grande\", sans-serif";
                    
                    if(arrow === 'top'){
                        if(x && w != x){
                            w = x;
                            $timeout(function(){
                                ctx.clearRect(0,0,w,h);
                                ctx.translate(0.5,0.5);
                                for (var i = 0; i <= w; i = i + 5) {
                                    var y = i % 25 == 0 ? i % 50 == 0 ? (ctx.fillText(i, i + 2, h - 6), 0) : h - 6 : h - 3;
                                    ctx.moveTo(i, y);
                                    ctx.lineTo(i, h);
                                    ctx.stroke();
                                }
                            },0);
                        }else{
                            ctx.translate(0.5,0.5); 
                            for (var i = 0; i <= w; i = i + 5) {
                                var y = i % 25 == 0 ? i % 50 == 0 ? (ctx.fillText(i, i + 2, h - 6), 0) : h - 6 : h - 3;
                                ctx.moveTo(i, y);
                                ctx.lineTo(i, h);
                                ctx.stroke();
                            }
                        }

                    }else{
                        if(x && h != x){
                            h = x;
                            $timeout(function(){
                                ctx.clearRect(0,0,w,h);
                                ctx.translate(0.5,0.5);
                                for (var i = 0; i <= h; i = i + 5) {
                                    //var x = i % 25 == 0 ? i % 50 == 0 ? (ctx.save(),ctx.rotate(270 * Math.PI / 180),ctx.fillText(i, -(i + i.toString().length * 7), w - 5),ctx.restore(), 0) : w - 6 : w - 3;
                                    var x = i % 25 == 0 ? i % 50 == 0 ? (ctx.save(),ctx.rotate(90 * Math.PI / 180),ctx.fillText(i, i + 2, -(w - 15)),ctx.restore(), 0) : w - 6 : w - 3;
                                    ctx.moveTo(x, i);
                                    ctx.lineTo(w, i);
                                    ctx.stroke();
                                }
                            },0);
                        }else{
                            ctx.translate(0.5,0.5); 
                            for (var i = 0; i <= h; i = i + 5) {
                                //var x = i % 25 == 0 ? i % 50 == 0 ? (ctx.save(),ctx.rotate(270 * Math.PI / 180),ctx.fillText(i, -(i + i.toString().length * 7), w - 5),ctx.restore(), 0) : w - 6 : w - 3;
                                var x = i % 25 == 0 ? i % 50 == 0 ? (ctx.save(),ctx.rotate(90 * Math.PI / 180),ctx.fillText(i, i + 2, -(w - 15)),ctx.restore(), 0) : w - 6 : w - 3;
                                ctx.moveTo(x, i);
                                ctx.lineTo(w, i);
                                ctx.stroke();
                            }
                        }

                    }
                }

                canvasDraw($elem, attrs);
            }],
            link: function($scope,$elem,attrs){

            }
        }
    })

    angular.module('toolKit', [])
    .directive('toolkit', function(){
        return {
            restrict:'E',
            replace: true,
            templateUrl: 'tmpl/toolKit.html',
            controller: ['$scope', '$timeout', function($scope, $timeout){
                $scope.list = [
                    {icon:'eqf-top-button', label:'按钮', name:'button'},
                    {icon:'eqf-top-word', label:'文本', name:'span'},
                    {icon:'eqf-top-list', label:'输入框', name:'input'},
                    {icon:'eqf-top-list', label:'选择框', name:'select'},
                    {icon:'eqf-top-list', label:'列表', name:'ul'},
                    {icon:'eqf-top-list', label:'表格', name:'table'},
                    {icon:'eqf-top-list', label:'标题', name:'h1'},
                    {icon:'eqf-top-list', label:'链接', name:'a'},
                    {icon:'eqf-top-pic', label:'图片', name:'img'},
                    {icon:'eqf-top-music', label:'声音', name:'sound'},
                    {icon:'eqf-top-video', label:'视频', name:'video'},
                    {icon:'eqf-top-video', label:'自定义', name:'div'}
                ];
                $scope.showSubItem = function(index){
                    //$scope.$root.currentToolItem = $scope.list[index];


                    /*
                    $timeout(function () {
                      $scope.$emit('rootNodeMessage', {
                        module: 'toolKit',
                        event: 'selectToolItem',
                        item: $scope.currentItem
                      });
                    });*/
                }
                $scope.postMsg = function($event){
                    [].slice.apply(frames,[0]).forEach(function(win){
                        win.postMessage({
                            cmd:'addWidget', 
                            content:angular.element($event.target).data('name'),
                            pos:{x:$event.screenX,y:$event.screenY}
                        },'/');
                    })
                }


            }],
            link: function($scope,$elem,attrs){
                $elem.on('dragend', 'a[draggable="true"]', function($event){
                    if(isWidgetEntered){
                        $scope.postMsg($event);
                    }
                })
                .on('dragstart', 'a[draggable="true"]', function($event){
                    /*只能在dragstart的时候setDragImage
                    var img = new Image();
                    img.src = 'images/1.jpg';
                    $event.originalEvent.dataTransfer.setDragImage(img, 0, 0)
                    */
                    
                })
                .on('drag', 'a[draggable="true"]', function($event){
                    if(isWidgetEntered){}
                })
            }
        }
    })

    angular.module('panel', [])
    .directive('panel', function(){
        return {
            restrict:'E',
            replace: true,
            templateUrl: 'tmpl/panel.html',
            controller: ['$scope', function($scope){
                $scope.widgetInfo = {};
                $scope.$on('updateWidgetInfo',function($event, msg){
                    $scope.widgetInfo = msg;
                    $scope.widgetInfo.style = JSON.parse(msg.style);
                    $scope.$apply();
                });

            }],
            link: function($scope,$elem,attrs){

            }
        }
    })




    angular.module('app',['ngRoute','menu','commonArea','editor','toolKit','panel','ui.bootstrap'])
    .config(['$routeProvider', function($route){
        $route
            .when('/main', {
                templateUrl: 'tmpl/main.html',
                controller: 'mainCtrl'
            })
            .otherwise({redirectTo: "/main"})
    }])
    .controller('mainCtrl', function($scope){
        $scope.$root.stages = [];
        $scope.$root.mainIsLoaded = true;

        $scope.$on('rootNodeMessage',function($event, msg){
            $scope.$broadcast('subNodeMessage', msg /*[].slice.apply(arguments,[1])*/);
        });
    })
    .directive('bindMainResize', function($window){
        return{
            link: function($scope,$elem,attrs){
                angular.element($window).bind('resize', function(){

                });
                angular.element($window).bind('message', function($event){var e = $event.originalEvent;
                    var isChild = [].slice.apply(frames,[0]).some(function(win){return e.source == win});
                    if(!isChild || typeof e.data != 'object') return;
                    if(e.data.cmd == 'dragEventChange'){
                        switch(e.data.content){
                            case 'enter':
                                isWidgetEntered = true;

                            break;
                            case 'leave':
                                isWidgetEntered = false;
                            
                            break;
                        }
                    }else if(e.data.cmd == 'updateWidgetInfo'){
                        $scope.$broadcast('updateWidgetInfo', e.data.content);
                    }
                });
            }
        }

    })









}(window, window.angular)


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

var isWidgetEntered = false;
