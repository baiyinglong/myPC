/**
 * Created by Administrator on 2016/7/30.
 */
(function () {
    var oInp = document.getElementById('search');
    var oUl = document.getElementById('searchList');
    var aLi = oUl.getElementsByTagName('li');
    var oDiv = document.getElementById('more');
    var liO = document.getElementById('liZero');
    var hide = document.getElementById('hide');
    var inp1 = document.getElementById('inp1');
    var inp2 = document.getElementById('inp2');
    var erw = document.getElementById('erw');
    var che = document.getElementById('che');
    var blo = document.getElementById('blo');
    var non = document.getElementById('non');
    var oO = document.getElementById('sign');
    var signC = document.getElementById('signC');
    var signB = document.getElementById('signB');
    var se = document.getElementById('se');
    var block = document.getElementById('block');
    var none = document.getElementById('none');
    var xian = document.getElementById('xian');
    var liA = document.getElementById('liOne');
    var liB = document.getElementById('liTwo');
    var liC = document.getElementById('liThree');
    var aA = document.getElementById('listA');
    var bB = document.getElementById('listB');
    var cC = document.getElementById('listC');
    var val = null;
    oInp.onfocus = function () {
        oUl.style.display = 'block';
    };
    oInp.onmouseover = function () {
        oInp.style.background = "#ffffff"
    };
    oInp.onmouseout = function () {
        oInp.style.background = "#e1e1e1"
    };
    oInp.onkeyup = function () {
        val = this.value.replace(/(^ +)|( +$)/g, '');
    };
    document.body.onclick = function (e) {
        e = e || window.event;
        var tar = e.target || e.srcElement;
        if (tar.tagName.toLowerCase() === 'a' && tar.parentNode.parentNode.id === 'searchList') {
            oInp.value = tar.innerHTML;
        } else {
            oInp.value = "致青春";
        }
        if (tar.tagName.toLowerCase() === 'input' && tar.id === 'search') {
            oUl.style.display = 'block';
            oInp.value = '';
            oUl.onmouseover = function (e) {
                e = e || window.event;
                oInp.style.background = "#fff"
                for (var i = 0; i < aLi.length; i++) {
                    aLi[i].index = i;
                    aLi[i].onmouseover = function () {
                        aLi[this.index].style.background = "#ffffff"
                        var siblings = utils.siblings(this);
                        for (var i = 0; i < siblings.length; i++) {
                            siblings[i].style.background = "#f2f2f2"
                        }
                    };
                    aLi[i].onmouseout = function () {
                        aLi[this.index].style.background = "#ffffff"
                        var siblings = utils.siblings(this);
                        for (var i = 0; i < siblings.length; i++) {
                            siblings[i].style.background = "#f2f2f2"
                        }
                    }
                }
            }
        } else {
            oUl.style.display = 'none';
            oInp.style.background = "#e1e1e1";
        }
        if (tar.tagName.toLowerCase() === 'a' && tar.parentNode.id === 'liZero') {
            oO.style.display = 'block';
            oO.style.zIndex = 100;
            oDiv.style.display='block';
            hide.onclick=function(){
                oO.style.display = 'none';
                oDiv.style.display='none';
            };
            inp1.onclick=function(){
                inp1.style.borderColor='#69a200';
                inp2.style.border='';
            };
            inp2.onclick=function(){
                inp2.style.borderColor='#69a200';
                inp1.style.border='';
            };
            var bok=true;
            che.onclick=function(){
                if(bok){
                    blo.style.backgroundPosition='-116px -104px';
                    //bok=false;
                    bok=!bok;
                }else{
                    blo.style.backgroundPosition='0 -126px';
                    //bok=true;
                    bok=!bok;
                }
            };
            erw.onclick=function(){
                signB.style.display='none';
                signC.style.display='block';
                inp1.style.border='';
                inp2.style.border='';
            };
            se.onclick=function(){
                signB.style.display='block';
                signC.style.display='none';
            };
            block.onclick=function(){
                none.style.display='block';
                block.style.display='none';
                inp1.style.border='';
                inp2.style.border='';
            };
            xian.onclick=function(){
                block.style.display='block';
                none.style.display='none';
                inp1.style.border='';
                inp2.style.border='';
            };

        }
        if (tar.tagName.toLowerCase() === 'a' && tar.parentNode.id === 'liOne') {
            if (aA.style.display === 'block') {
                aA.style.display = 'none';
            } else {
                aA.style.display = 'block';
            }
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        } else {
            aA.style.display = 'none';
        }
        if (tar.tagName.toLowerCase() === 'a' && tar.parentNode.id === 'liTwo') {
            if (bB.style.display === 'block') {
                bB.style.display = 'none';
            } else {
                bB.style.display = 'block';
            }
        } else{
            bB.style.display = 'none';
        }
        if (tar.tagName.toLowerCase() === 'a' && tar.parentNode.id === 'liThree') {
            if (cC.style.display === 'block') {
                cC.style.display = 'none';
            } else {
                cC.style.display = 'block';
            }
        } else {
            cC.style.display = 'none';
        }
    };
})();
//      ...................选项卡。。。。。。。。。。。。
(function () {
    var bbb = document.getElementById('listB');
    var aLi = bbb.getElementsByTagName('li');
    var aDiv = bbb.getElementsByTagName('div');
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].index = i;
        aLi[i].onmouseover = function () {
            for (var i = 0; i < aLi.length; i++) {
                var cur=aLi[i];
                var cpr=aDiv[i];
                utils.removeClass(cur,'bg1');
                utils.removeClass(cpr,'show');
            }
            var cae=aLi[this.index]
            var cse=aDiv[this.index]
            utils.addClass(cae,'bg1');
            utils.addClass(cse,'show');
        }
    }
})()