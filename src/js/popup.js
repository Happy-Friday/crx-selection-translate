﻿var $ = $ || {};
var test = $;
$.ui = {wordInput : document.getElementById( "tran_word" ) , btn : (function () {
    var a = document.getElementById( "tran" );
    a.addEventListener( "click" , function ( b ) {
        if ( word = $.ui.wordInput.value.trim() ) {
            $.showResult( {"9" : null} );
            $.query( {tran : word} , "yd" , $.handler )
        }
    } );
    return a
}()) , result : function () {
    var b = document.getElementById( "result" ), a = function ( c ) {
        return function ( f ) {
            var d = f.target;
            switch ( d.nodeName ) {
                case"HEADER":
                    d.getElementsByClassName( "copyIt" )[0].style.display = c;
                    break;
                case"DIV":
                case"UL":
                case"DL":
                    d.previousElementSibling.getElementsByClassName( "copyIt" )[0].style.display = c;
                    break;
                case"DT":
                case"DD":
                case"LI":
                    d.parentNode.previousElementSibling.getElementsByClassName( "copyIt" )[0].style.display = c;
                    break;
                case"SPAN":
                    d.style.display = c;
                    break
            }
        }
    };
    b.addEventListener( "mouseover" , a( "inline" ) , true );
    b.addEventListener( "mouseout" , a( "none" ) , false );
    return b
}() , copys : document.getElementById( "result" ).getElementsByClassName( "copyIt" )};
$.showResult = function ( d ) {
    var a = $.ui.result, c = a.children, b = Object.keys( d );
    Array.prototype.forEach.call( c , function ( e , f ) {
        if ( d[f] ) {e.innerHTML = d[f]}
        if ( b.indexOf( f.toString() ) >= 0 ) {e.style.display = "block"} else {e.style.display = "none"}
    } )
};
$.hid = function () {Array.prototype.forEach.call( $.ui.result.children , function ( a ) {a.style.display = "none"} )};
$.handler = function ( d ) {
    var c = d.tran, a = "", b = {};
    console.dir( c );
    if ( c.errorCode !== 0 ) {
        switch ( c.errorCode ) {
            case 20:
                a = "有道翻译服务一次性只能翻译200个字符哦，长文本就用百度翻译吧！";
                break;
            case 30:
                a = "你查询的文本太难了，有道翻译不出来  :( 试试百度翻译吧！";
                break;
            case 40:
                a = "有道翻译不支持这种语言哦，试试百度翻译！";
                break;
            case 50:
                a = "天呐！如果你看见这条错误信息，请立刻发送邮件至i@lmk123.com联系作者！主题请注明：有道着火了。";
                break
        }
        b["7"] = null;
        b["8"] = a
    } else {
        b["0"] = c.query;
        if ( c.basic ) {
            c.basic.explains.forEach( function ( e ) {a += "<li>" + e + "</li>"} );
            b["1"] = null;
            b["2"] = a
        }
        b["3"] = null;
        b["4"] = c.translation[0];
        if ( c.web ) {
            a = "";
            b["5"] = null;
            c.web.forEach( function ( e ) {
                a += "<dt>" + e.key + "</dt>";
                e.value.forEach( function ( f ) {a += "<dd>" + f + "</dd>"} )
            } );
            b["6"] = a
        }
    }
    Array.prototype.forEach.call( $.ui.copys , function ( e ) {e.textContent = "复制"} );
    $.showResult( b )
};
document.addEventListener( "keyup" , function ( a ) {if ( a.keyCode === 13 ) {$.ui.btn.click()}} );
document.addEventListener( "click" , function ( a ) {
    if ( a.target.className === "copyIt" ) {
        Array.prototype.forEach.call( $.ui.copys , function ( b ) {b.textContent = "复制"} );
        $.copy( a.target.parentNode.nextElementSibling.textContent );
        a.target.textContent = "已复制"
    }
} );
$.ui.wordInput.focus();
document.getElementById( "fot" ).addEventListener( "click" , function () {chrome.tabs.create( {url : "https://me.alipay.com/lmk123"} )} );