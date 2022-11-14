import React, {useEffect} from 'react'
import "./Waiting.css"


export  default  function Waiting(){

    //取消默认事件
    function stopDefault(e) {
        if (e.preventDefault) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            window.event.returnValue = false;
            e.cancelBubble = true;
        }
        return false;
    }
    /* 以下的 document.querySelector("#big-box")为页面中最外层盒子
    经测试绑定在body，html或者window上滚动会一直报这个错误
    [Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive. See <URL>（由于目标被视为被动，无法在被动事件监听器中阻止缺省事件。）
    */
    //开放滚动
    function startwheel() {
        document.querySelector("#waiting-cover").removeEventListener('DOMMouseScroll', function (e) {
            var e = e || window.event;
            stopDefault(e);
        }, false);
        document.querySelector("#waiting-cover").onmousewheel = null;
    }

    //禁用滚动
    function stopwheel() {
        var str = window.navigator.userAgent.toLowerCase();
        if (str.indexOf('firefox') !== -1) { //火狐浏览器
            document.querySelector("#waiting-cover").addEventListener('DOMMouseScroll', function (e) {
                var e = e || window.event;
                //阻止窗口默认的滚动事件
                stopDefault(e);
            }, false);
        } else { //非火狐浏览器
            document.querySelector("#waiting-cover").onmousewheel = function (ev) {
                var e = ev || window.event;
                stopDefault(e);
            };
        }
    }



    useEffect(()=>{
        stopwheel();
    },[])
    useEffect(()=>{
        return () => {
            startwheel();
        }
    },[])



    return(
        <div id="waiting-cover">
            <div id="loading1">
                <div className="gear1">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

            <div id="loading2">
                <div className="gear2">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

            <div id="loading3">
                <div className="gear3">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

            <div id="waiting-text">
                Waiting......
            </div>

        </div>
    );
}