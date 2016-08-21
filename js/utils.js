/**
 * Created by Administrator on 2016/7/10.
 */
var utils=(function(){
    var flag='getComputedStyle' in window;
    //1.rnd:兼容版的求一定范围的随机数 n,m
    function rnd(n,m){
        n=Number(n);
        m=Number(m);
        if(isNaN(n)||isNaN(m)){
            return  Math.random();//如果传的数字无效，直接返回0-1随机小数
        }
        if(n>m){
            var tmp=n;
            n=m;
            m=tmp;
        }
        return Math.round(Math.random()*(m-n)+n)
    };

    //2.listToArray：类数组转数组
    function listToArray(arg){
        if(flag){
            return Array.prototype.slice.call(arg);
        }
        var ary=[];
        for(var i=0; i<arg.length; i++){
            ary[ary.length]=arg[i];
        }
        return ary;
    };

    //3.jsonParse：把json格式的字符串转成json格式的数据(对象)
    function jsonParse(jsonStr){
        /*var obj={};
         if('JSON' in window){//高级浏览器支持
         obj=JSON.parse(jsonStr);
         }else{//处理低级浏览器的兼容
         obj=eval('('+jsonStr+')')
         }
         return obj;*/
        //return 'JSON' in window?JSON.parse(jsonStr):eval('('+jsonStr+')');
        return 'JSON' in window?JSON.parse(jsonStr):eval('('+jsonStr+')');
    }

    //4.win 浏览器盒子模型的兼容性处理；
    function win(attr,value){
        //获取时候就得return； 设置的时候不需要；
        //win有两个功能： 获取-return 设置（不需要return）
        //当win方法调用时，传了一个参数的时候（1.arguments.length 2.typeof value==='undefined'）；就是获取；否则就是设置；
        if(typeof value==='undefined'){
            return document.documentElement[attr]||document.body[attr]
        }
        document.documentElement[attr]=document.body[attr]=value
    }

    //5.offset 当前元素距离body的位置
    function offset(curEle){
        var l=curEle.offsetLeft;
        var t=curEle.offsetTop;
        var par=curEle.offsetParent;
        while(par){
            if(navigator.userAgent.indexOf('MSIE 8.0')===-1){
                l+=par.clientLeft;
                t+=par.clientTop;
            }
            l+=par.offsetLeft;
            t+=par.offsetTop;
            par=par.offsetParent;
        }
        return {l:left,t:top}
    }

    //6.getByClass 在一定的范围内，通过className来获取元素
    function getByClass(strClass,curEle){
        curEle=curEle||document;
        if(flag){
            return this.listToArray(curEle.getElementsByClassName(strClass));
            //也可以return Array.prototype.slice.call(curEle.getElementsByClassName(strClass))
        }
        var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
        var ary=[];
        var nodeList=curEle.getElementsByTagName('*');
        for(var i=0; i<nodeList.length; i++){
            var curNode=nodeList[i];
            var bok=true;
            for(var k=0; k<aryClass.length; k++){
                var curClass=aryClass[k];
                //??var reg=new RegExp('(^| +)'+curClass+'( +|$)')
                var reg=new RegExp('\\b'+curClass+'\\b')
                if(!reg.test(curNode.className)){
                    bok=false;
                    break;
                }
            }
            if(bok){
                ary[ary.length]=curNode;
            }
        }
        return ary;
    }

    //7.hasClass 验证这个元素上是否有某个class名；
    function hasClass(curEle,cName){
        cName=cName.replace(/(^ +)|( +$)/g,'');
        var reg=new RegExp('\\b'+cName+'\\b');
        return reg.test(curEle.className)
    }

    //8.addClass 如果元素身上没有这个class名，我们才会添加
    function addClass(curEle,strClass){
        var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
        for(var i=0; i<aryClass.length; i++){
            var curClass=aryClass[i];
            if(!this.hasClass(curEle,curClass)){
                curEle.className+=curEle.className?' '+curClass:curClass;
            }
        }
    }

    //9.removeClass 如果元素身上有这个class名，才能删除
    function removeClass(curEle,strClass){
        var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
        for(var i=0; i<aryClass.length; i++){
            var curClass=aryClass[i];
            var reg=new RegExp('\\b'+curClass+'\\b');
            if(reg.test(curEle.className)){
                curEle.className=curEle.className.replace(reg,' ').replace(/\s+/g,' ').replace(/(^ +)|( +$)/g,'')
            }
        }
    }
    //10.getCss 获取经过浏览器计算过的样式（面试：如何获取非行间样式）
    function getCss(curEle,attr){
        var reg,val;
        if(flag){
            val=getComputedStyle(curEle,false)[attr];
        }else{
            if(attr==='opacity'){
                val=curEle.currentStyle['filter'];
                reg=/^alpha\(opacity[=:](\d+)\)$/;
                return reg.test(val)?reg.exec(val)[1]/100:1;
            }else{
                val=curEle.currentStyle[attr];
            }
        }
        reg=/^([-+])?\d+(\.\d+)?(px|pt|rem|em)$/;
        return reg.test(val)?parseFloat(val):val;
    }

    //11.setCss 设置样式 透明度 单位 float
    function setCss(curEle,attr,value){
        if(attr==='float'){
            curEle.style.styleFloat=value;
            curEle.style.cssFloat=value;
            return;
        }
        if(attr==='opacity'){
            curEle.style.opacity=value;
            curEle.style.filter='alpha(opacity='+value*100+')';
            return;
        }
        var reg=/(width|height|top|right|bottom|left|((padding|margin)(top|right|bottom|left)?))/;//???
        if(reg.test(attr)){
            value=parseFloat(value)+'px';
        }
        curEle.style[attr]=value;

    }

    //12.setGroupCss
    function setGroupCss(curEle,options){
        for(var attr in options){
            this.setCss(curEle,attr,options[attr])
        }
    }

    //13.css 取值赋值合体的函数：getCss,setCss,setGroupCss三合一
    function css(curEle){
        var arg2=arguments[1];
        if(typeof arg2==='string'){//获取 或 设置
            var arg3=arguments[2];
            if(typeof arg3==='undefined'){//arg3实参不存在；
                return this.getCss(curEle,arg2);
            }else{//设置1个 arg3实参存在
                this.setCss(curEle,arg2,arg3);
            }
        }
        if(arg2.toString()==='[object Object]'){//说明第二个参数是个对象
            this.setGroupCss(curEle,arg2)
        }
        /*if(arg2 instanceof Object){

         this.setGroupCss(curEle,arg2);
         }
         if(arg2.constructor.name==='Object'){
         console.dir(arg2.constructor)
         this.setGroupCss(curEle,arg2);
         }*/
    }

    //14.getChildren 获取当前元素下的所有子元素
    function getChildren(curEle){
        if(flag){
            return this.listToArray(curEle.children);
        }
        var nodeList=curEle.childNodes;
        var ary=[];
        for(var i=0;i<nodeList.length;i++){
            if(nodeList[i].nodeType===1){
                ary[ary.length]=nodeList[i];
            }
        }
        return ary;
    }

    //15.prev 上一个哥哥元素节点
    function prev(curEle){
        if(flag){
            return curEle.previousElementSibling;
        }
        var pre=curEle.previousSibling;
        while(pre&&pre.nodeType!==1){
            pre=pre.previousSibling;
        }
        return pre;
    }

    //16.prevAll 获取当前元素的所有哥哥元素节点
    function prevAll(curEle){
        var ary=[];
        var pre=this.prev(curEle);
        while(pre){
            ary.unshift(pre);
            pre=this.prev(pre);
        }
        return ary;
    }

    //17.next 下一个弟弟元素节点
    function next(curEle){
        if(flag){
            return curEle.nextElementSibling;
        }
        var nex=curEle.nextSibling;
        while(nex&&nex.nodeType!==1){
            nex=nex.nextSibling;
        }
        return nex;
    }

    //18.nextAll 找所有的弟弟元素几点
    function nextAll(curEle){
        var ary=[];
        var nex=this.next(curEle);
        while(nex){
            ary[ary.length]=nex;
            nex=this.next(nex);
        }
        return ary;
    }

    //19.sibling 获取相邻元素
    function sibling(curEle){
        var pre=this.prev(curEle);
        var nex=this.next(curEle);
        var ary=[];
        if(pre) ary.push(pre);
        /*pre?ary.push(pre):null;*/
        if(nex) ary.push(nex);
        return ary;
    }

    //20.siblings 获取当前元素的所有兄弟节点：所有的哥哥元素节点+所有的弟弟元素节点
    function siblings(curEle){
        return this.prevAll(curEle).concat(this.nextAll(curEle))
    }

    //21.firstChild 当前元素的第一个子元素
    function firstChild(curEle){
        return this.getChildren(curEle)[0];
    }

    //22.lastChild 获取当前元素下的最后一个子
    function lastChild(curEle){
        var aChs=this.getChildren(curEle);
        return aChs[aChs.length-1]
    }

    //23.index 获取当前元素的索引
    function index(curEle){
        return this.prevAll(curEle).length;
    }

    //24.appendChild
    function appendChild(parent,newEle){
        parent.appendChild(newEle);
    }

    //25.prependChild 把新元素插入到当前容器得最开始
    function prependChild(parent,newEle){
        /*//在父级下找所有的子元素
         var aChs=this.getChildren(parent);
         //如果有子元素的话，插入到第一个子元素的前面；
         if(aChs.length){
         var first=this.firChild(parent);
         parent.insertBefore(newEle,first)
         }else{
         parent.appendChild(newEle);
         }*/
        var first=this.firstChild(parent);
        if(first){
            parent.insertBefore(newEle,first);
        }else{
            parent.appendChild(newEle);
        }
    }

    //26.insertBefore
    function insertBefore(newEle,oldEle){
        oldEle.parentNode.insertBefore(newEle,oldEle);
    }

    //27.insertAfter 把新元素插入到指定元素后面(即它的弟弟元素的前面)；
    function insertAfter(newEle,oldEle){
        //获取指定元素的弟弟元素；
        var nex=this.next(oldEle);
        if(nex){
            //如果指定元素的弟弟元素节点存在话，把新元素插入弟弟元素前面
            oldEle.parentNode.insertBefore(newEle,nex);
        }else{
            //如果指定元素的弟弟元素节点不存在，直接插入父容器的末尾；
            oldEle.parentNode.appendChild(newEle);
        }
    }
    return {
        //rnd:兼容版的求一定范围的随机数 n,m
        rnd:rnd,
        //listToArray：类数组转数组
        listToArray:listToArray,
        //jsonParse:把JSON格式的字符串转成JSON格式的数据(对象)
        jsonParse:jsonParse,
        //win:浏览器盒子模型的兼容性处理；
        win:win,
        //offset:当前元素距离body的位置 {left:l,top:t}
        offset:offset,
        //getByClass：在一定的范围内，通过className来获取元素
        getByClass:getByClass,
        //hasClass:验证这个元素上是否有某个class名；
        hasClass:hasClass,
        //addClass:如果元素身上没有这个class名，我们才会添加
        addClass:addClass,
        //removeClass:如果元素身上有这个class名，才能删除
        removeClass:removeClass,
        //getCss:获取经过浏览器计算过的样式（面试：如何获取非行间样式）
        getCss:getCss,
        //setCss:设置样式 透明度 单位 float
        setCss:setCss,
        setGroupCss:setGroupCss,
        //css:取值赋值合体的函数：getCss,setCss,setGroupCss三合一
        css:css,
        //getChildren:获取当前元素下的所有子元素
        getChildren:getChildren,
        //prev:上一个哥哥元素节点
        prev:prev,
        //prevAll:获取当前元素的所有哥哥元素节点
        prevAll:prevAll,
        //next:下一个弟弟元素节点
        next:next,
        //nextAll:找所有的弟弟元素几点
        nextAll:nextAll,
        //sibling:获取相邻元素
        sibling:sibling,
        //siblings:获取当前元素的所有兄弟节点：所有的哥哥元素节点+所有的弟弟元素节点
        siblings:siblings,
        //firstChild:当前元素的第一个子元素
        firstChild:firstChild,
        //lastChild:获取当前元素下的最后一个子元素；
        lastChild:lastChild,
        //index：获取当前元素的索引
        index:index,
        appendChild:appendChild,
        //prependChild:把新元素插入到当前容得最开始
        prependChild:prependChild,
        insertBefore:insertBefore,
        //把新元素插入到指定元素的弟弟元素的前面；
        insertAfter:insertAfter
    }
})()