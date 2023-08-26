// ==UserScript==
// @name         imitui修改图片URL
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://m.imitui.com/manhua/*
// @match        http://m.imitui.com/manhua/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=imitui.com
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    let cdn = ["ntu2.dodomh.com", "nc1.dodomh.com", "nt4.dodomh.com"]
    let http = ["nt3.dodomh.com", "nt1.dodomh.com"]
    function getAllImg(){
        let imgs = $(".scroll-item > img");
        imgs.each(function (index,item) {
            let img = $(item);
            let oldurl = img.attr("data-src")==undefined?img.attr("src"):img.attr("data-src");
            console.error("oldurl:", oldurl)

            if (oldurl.indexOf("loading.gif") == -1){
               img.error(function(){
                   let newurl = oldurl.replace(/^http(s)?:\/\/[^/]+\//, "https://"+cdn[0]+"/");
                   console.error("123:", newurl)
                   img.attr("data-src", newurl);
                   img.attr("src", newurl);
               })
            }

            http.forEach(function(e) {
                if(oldurl.indexOf(e) > -1){
                    let newurl = oldurl.replace(/^http(s)?:\/\/[^/]+\//, "http://"+e+"/");
                    img.attr("src", newurl);
                    img.attr("data-src", newurl);
                    console.error("321:", newurl)
                }
            });

        })
    }
    getAllImg();
    // Your code here...
})();