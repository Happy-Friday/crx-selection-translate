﻿var $ = $ || {};
$.isFrame = (function () {if ( top === self ) {return null} else {return location.href}}());
$.bd = "http://openapi.baidu.com/public/2.0/bmt/translate";
$.bd_post = "client_id=ZGoZqZPUPtSXCmdlCrtqEKFz&from=auto&to=auto&q=";
$.yd = "http://fanyi.youdao.com/openapi.do?keyfrom=chrome&key=1361128838&type=data&doctype=json&version=1.1&q=";
$.query = function ( d , h , i ) {
    var g = this, f = new XMLHttpRequest(), b = encodeURI( d.tran.trim() ), a, c, e;
    switch ( h ) {
        case"bd":
            a = "POST";
            c = g["bd"];
            e = g["bd_post"] + b;
            break;
        case"yd":
            a = "GET";
            c = g["yd"] + b;
            e = null;
            break
    }
    f.open( a , c );
    if ( a === "POST" ) {f.setRequestHeader( "Content-Type" , "application/x-www-form-urlencoded" )}
    f.onreadystatechange = function () {
        if ( f.readyState === 4 && f.status === 200 ) {
            d.tran = JSON.parse( f.responseText );
            i( d )
        }
    };
    f.send( e );
    return this
};
$.localStorage = chrome.storage.local;
$.syncStorage = chrome.storage.sync;
$.onStorageChange = chrome.storage.onChanged;
$.rootPath = chrome.extension.getURL( "/" );
$.isEnableCopy = document.execCommand( "copy" );
$.copyTemp = null;
$.copy = function ( b ) {
    var a;
    if ( $.isEnableCopy ) {
        a = $.copyTemp ? $.copyTemp : ($.copyTemp = document.createElement( "input" ));
        a.type = "text";
        a.value = b;
        a.style.cssText = "position:absolute;top:-100px;";
        document.body.appendChild( a );
        a.select();
        return document.execCommand( "copy" )
    } else {$.sendMessage( {from : "contentScript" , data : b , sign : "copy"} )}
};
$.sendMessage = chrome.runtime.sendMessage;