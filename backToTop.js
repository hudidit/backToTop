/*
    backToTop.js
    Author: Hu Yue ( http://hudidit.com ).
    Started:2013-09-23.
    License Agreement: It's all yours.
*/
function backToTop( options ){
    
    options = options||{};
        // 要不要平滑的滚动？ 默认平滑
    var SMOOTH = ( typeof options.smooth == 'undefined' )?true:options.smooth,
        // 要滚多久？ 默认 0.35秒
        TIME   = ( typeof options.time == 'undefined' )?350:options.time;
    
    // 创建一个块，设置 title，这样鼠标移上去时有提示
    var btn = document.createElement('div');
    btn.title = '回到顶部';
    // 给块的 style 属性起个别名，后面写代码时省事儿点
    var s   = btn.style;
    // 设置宽高，就和 SVG 图标大小一样好啦
    s.width = '50px';
    s.height= '50px';
    // 这个块在默认状态下的背景，就是刚才转换来的前一个 dataURI
    var bg   = 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICdodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQnPjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTAgNTAiIHdpZHRoPSI1MHB4IiBoZWlnaHQ9IjUwcHgiIHg9IjBweCIgeT0iMHB4IiBpZD0iTGF5ZXJfMSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTAgNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwb2x5bGluZSBwb2ludHM9IjAsMjUgMjUsNSA1MCwyNSIgc3R5bGU9ImZpbGw6dHJhbnNwYXJlbnQ7c3Ryb2tlOmJsYWNrO3N0cm9rZS13aWR0aDozOyIvPjwvc3ZnPg==)',
    // 鼠标移上去时的背景
        bg_hover = 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICdodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQnPjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTAgNTAiIHdpZHRoPSI1MHB4IiBoZWlnaHQ9IjUwcHgiIHg9IjBweCIgeT0iMHB4IiBpZD0iTGF5ZXJfMSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTAgNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwb2x5bGluZSBwb2ludHM9IjAsMjUgMjUsNSA1MCwyNSIgc3R5bGU9ImZpbGw6dHJhbnNwYXJlbnQ7c3Ryb2tlOiM5OTk7c3Ryb2tlLXdpZHRoOjM7Ii8+PC9zdmc+)';
    if( ieVersion() < 9 ){
        bg = bg_hover = 'url(http://gallery.hudidit.com/huyueFramework/backToTop/backToTop.png)';
    }
    // 给块设置默认背景
    s.background= bg;
    // 设置块的基本样式：
    // 相对于窗口固定
    s.position  = 'fixed';
    s.zIndex = 999;
    // 在右下角位置
    s.bottom    = '0';
    s.right     = '20px';
    // 鼠标移上去时变成小手，因为它本身不像按钮，所以用小手提醒用户——它可以按的哦
    s.cursor    = 'pointer';
    // 默认不显示！
    s.display   = 'none';
    // 监听事件：鼠标移上去时，换成另一个背景
    bind( btn, 'mouseover',function(){
        s.background    = bg_hover;
    });
    // 监听事件：鼠标移走时，换回默认的背景
    bind( btn, 'mouseout', function(){
        s.background    = bg;
    });
    // 监听事件：点击按钮时，页面回到顶部
    bind( btn, 'click', function(){
        if( SMOOTH !== true ){
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }else{
            var time = TIME,
                steps = 25,
                stepLength = parseInt( ( document.body.scrollTop+document.documentElement.scrollTop ) / steps ),
                stepTime = parseInt( time / steps );
            var scrollInterval = setInterval(function(){
                if( ( document.body.scrollTop+document.documentElement.scrollTop ) == 0 ){
                    clearInterval( scrollInterval );
                }else{
                    document.body.scrollTop -= stepLength;
                    document.documentElement.scrollTop -= stepLength;
                }
            }, stepTime);
        }
    });
    // 监听事件：窗口上下滚动时，检查滚动的距离
    // 当滚动距离超过 200px 时，显示按钮
    // 当滚动距离小于 200px 时，隐藏按钮
    bind( window, 'scroll', function(){
        var scrollTop = document.body.scrollTop+document.documentElement.scrollTop;
        if( scrollTop > 200 ){
            s.display   = 'block';
        } else {
            s.display   = 'none';
        }
    });
    // 最后一步：把按钮添加到页面里
    document.body.appendChild(btn);
    
    return btn;
}

// 工具函数：绑定事件用，兼容 IE 和其他浏览器
function bind( ele, evt, func, cap ){
     cap = cap||false;
	if(ele.addEventListener){
		ele.addEventListener(evt,func,cap);
	}else if(ele.attachEvent){
		ele.attachEvent('on'+evt,func);
	}
}

// 检测 IE 版本，适用于 IE9 及以下
// 代码来自：http://james.padolsey.com/javascript/detect-ie-in-js-using-conditional-comments/
function ieVersion(){
    var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');
 
    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );
    return v > 4 ? v : undef;
}


// 最最后一步，调用这个函数，执行上面的整个过程
backToTop();
