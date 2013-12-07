/*
    backToTop.js
    Author: Hu Yue ( http://hudidit.com ).
    Started:2013-09-23.
    License Agreement: It's all yours.
*/
;(function( options ){
    
    options = options||{};
        // 瑕佷笉瑕佸钩婊戠殑婊氬姩锛� 榛樿骞虫粦
    var SMOOTH = ( typeof options.smooth == 'undefined' )?true:options.smooth,
        // 瑕佹粴澶氫箙锛� 榛樿 0.35绉�
        TIME   = ( typeof options.time == 'undefined' )?350:options.time;
    
    // 鍒涘缓涓€涓潡锛岃缃� title锛岃繖鏍烽紶鏍囩Щ涓婂幓鏃舵湁鎻愮ず
    var btn = document.createElement('div');
    btn.title = '鍥炲埌椤堕儴';
    // 缁欏潡鐨� style 灞炴€ц捣涓埆鍚嶏紝鍚庨潰鍐欎唬鐮佹椂鐪佷簨鍎跨偣
    var s   = btn.style;
    // 璁剧疆瀹介珮锛屽氨鍜� SVG 鍥炬爣澶у皬涓€鏍峰ソ鍟�
    s.width = '50px';
    s.height= '50px';
    // 杩欎釜鍧楀湪榛樿鐘舵€佷笅鐨勮儗鏅紝灏辨槸鍒氭墠杞崲鏉ョ殑鍓嶄竴涓� dataURI
    var bg   = 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICdodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQnPjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTAgNTAiIHdpZHRoPSI1MHB4IiBoZWlnaHQ9IjUwcHgiIHg9IjBweCIgeT0iMHB4IiBpZD0iTGF5ZXJfMSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTAgNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwb2x5bGluZSBwb2ludHM9IjAsMjUgMjUsNSA1MCwyNSIgc3R5bGU9ImZpbGw6dHJhbnNwYXJlbnQ7c3Ryb2tlOmJsYWNrO3N0cm9rZS13aWR0aDozOyIvPjwvc3ZnPg==)',
    // 榧犳爣绉讳笂鍘绘椂鐨勮儗鏅�
        bg_hover = 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICdodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQnPjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTAgNTAiIHdpZHRoPSI1MHB4IiBoZWlnaHQ9IjUwcHgiIHg9IjBweCIgeT0iMHB4IiBpZD0iTGF5ZXJfMSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTAgNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwb2x5bGluZSBwb2ludHM9IjAsMjUgMjUsNSA1MCwyNSIgc3R5bGU9ImZpbGw6dHJhbnNwYXJlbnQ7c3Ryb2tlOiM5OTk7c3Ryb2tlLXdpZHRoOjM7Ii8+PC9zdmc+)';
    if( ieVersion() < 9 ){
        bg = bg_hover = 'url(http://gallery.hudidit.com/huyueFramework/backToTop/backToTop.png)';
    }
    // 缁欏潡璁剧疆榛樿鑳屾櫙
    s.background= bg;
    // 璁剧疆鍧楃殑鍩烘湰鏍峰紡锛�
    // 鐩稿浜庣獥鍙ｅ浐瀹�
    s.position  = 'fixed';
    s.zIndex = 999;
    // 鍦ㄥ彸涓嬭浣嶇疆
    s.bottom    = '0';
    s.right     = '20px';
    // 榧犳爣绉讳笂鍘绘椂鍙樻垚灏忔墜锛屽洜涓哄畠鏈韩涓嶅儚鎸夐挳锛屾墍浠ョ敤灏忔墜鎻愰啋鐢ㄦ埛鈥斺€斿畠鍙互鎸夌殑鍝�
    s.cursor    = 'pointer';
    // 榛樿涓嶆樉绀猴紒
    s.display   = 'none';
    // 鐩戝惉浜嬩欢锛氶紶鏍囩Щ涓婂幓鏃讹紝鎹㈡垚鍙︿竴涓儗鏅�
    bind( btn, 'mouseover',function(){
        s.background    = bg_hover;
    });
    // 鐩戝惉浜嬩欢锛氶紶鏍囩Щ璧版椂锛屾崲鍥為粯璁ょ殑鑳屾櫙
    bind( btn, 'mouseout', function(){
        s.background    = bg;
    });
    // 鐩戝惉浜嬩欢锛氱偣鍑绘寜閽椂锛岄〉闈㈠洖鍒伴《閮�
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
    // 鐩戝惉浜嬩欢锛氱獥鍙ｄ笂涓嬫粴鍔ㄦ椂锛屾鏌ユ粴鍔ㄧ殑璺濈
    // 褰撴粴鍔ㄨ窛绂昏秴杩� 200px 鏃讹紝鏄剧ず鎸夐挳
    // 褰撴粴鍔ㄨ窛绂诲皬浜� 200px 鏃讹紝闅愯棌鎸夐挳
    bind( window, 'scroll', function(){
        var scrollTop = document.body.scrollTop+document.documentElement.scrollTop;
        if( scrollTop > 200 ){
            s.display   = 'block';
        } else {
            s.display   = 'none';
        }
    });
    // 鏈€鍚庝竴姝ワ細鎶婃寜閽坊鍔犲埌椤甸潰閲�
    document.body.appendChild(btn);
    
    return btn;
}

// 宸ュ叿鍑芥暟锛氱粦瀹氫簨浠剁敤锛屽吋瀹� IE 鍜屽叾浠栨祻瑙堝櫒
function bind( ele, evt, func, cap ){
     cap = cap||false;
	if(ele.addEventListener){
		ele.addEventListener(evt,func,cap);
	}else if(ele.attachEvent){
		ele.attachEvent('on'+evt,func);
	}
}

// 妫€娴� IE 鐗堟湰锛岄€傜敤浜� IE9 鍙婁互涓�
// 浠ｇ爜鏉ヨ嚜锛歨ttp://james.padolsey.com/javascript/detect-ie-in-js-using-conditional-comments/
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
})( {} );
