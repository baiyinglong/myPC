/**
 * Created by Administrator on 2016/7/11.
 */
(function(){
    var oHeadC=document.getElementById('headC');
    var oFigure=document.getElementById('figure');
    var aDiv=oFigure.getElementsByTagName('div');
    var aImg=oFigure.getElementsByTagName('img');
    var oFocus=document.getElementById('focus');
    var oUl=oFocus.getElementsByTagName('ul')[0];
    var aLi=oFocus.getElementsByTagName('li');
    var autoTimer=null;
    var interval=5000;
    var step=0;
    clearInterval(autoTimer);
    autoTimer=setInterval(autoMove,interval);
    function autoMove(){
        if(step>=aDiv.length-1){
            step=-1;
        }
        step++;
        setBanner();
    }
    function setBanner(){
        for(var i=0; i<aDiv.length; i++){
            var curClass=aDiv[i];
            if(i===step){
                curClass.style.display='block';
                curClass.style.opacity=0;
                zhufengAnimate(curClass,{opacity:1},500,function(){
                    var siblings=utils.siblings(this);
                    for(var k=0; k<siblings.length; k++){
                        utils.css(siblings[k],'opacity',0)
                    }
                })
            }else{
                curClass.style.display='none';
            }
        }
        bannerTip();
    }
    bannerTip();
    function bannerTip(){
        for(var i=0; i<aLi.length; i++){
            aLi[i].className=i===step?'bg':'';
        }
    }
    oHeadC.onmouseover=function(){
        clearInterval(autoTimer);
    };
    oHeadC.onmouseout=function(){
        autoTimer=setInterval(autoMove,interval);
    };
    //7.dianji焦点手动轮播
    handleChange();
    function handleChange(){
        for(var i=0; i<aLi.length; i++){
            aLi[i].index=i;
            aLi[i].onmouseover=function(){
                step=this.index;
                setBanner();
            }
        }
    }
})();