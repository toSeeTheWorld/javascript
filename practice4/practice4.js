/*
实现一个类似百度搜索框的输入提示的功能。要求如下：
1.允许使用鼠标点击选中提示栏中的某个选项
2.允许使用键盘上下键来选中提示栏中的某个选项，回车确认选中
3.选中后，提示内容变更到输入框中

不要求和后端交互，可以自己伪造一份提示数据例如：
var suggestData = ["abase","abash","abate","abduction","abhor","abominable","abscond","abstain","baby","babysiter","belt","birthday","bench","brave","你好"];
*/

var suggestData = ["abase","abash","abate","abduction","abhor","abominable","abscond","abstain","baby","babysiter","belt","birthday","bench","brave","你好"];
var search = document.getElementById("search");
var container = document.getElementById("container");
var haveUl = false;    //标志是否有提示列表，每次触发input事件时以此判断是否需要移除旧有列表
var prompt
var noActive = true;	//上下键选择的标志位，默认没有激活项false
var activeText;			//存储选中项的文本值，用于赋给文本框

////////输入匹配，显示提示
search.oninput = function(){
	if (haveUl) {
		container.removeChild(container.lastChild)
		haveUl = false;		//移除旧有列表，将列表标志设为false
	}
	var liList = "";		//声明字符串
	var reg = new RegExp("^"+search.value,"i")			//^表示从字符串开头匹配
	var arrPrompt = suggestData.filter(function(item,index,array){		//迭代数组项，执行函数，函数返回true的项组成新数组
		return reg.test(item);						
	})
	if (arrPrompt.length > 0 && search.value != "") {		//有比配的单词且文本框不为空时(无内容会匹配到所有项)
		var promptList = document.createElement("ul")		//创建无序列表
		promptList.setAttribute("id","prompt");
		container.appendChild(promptList);
		prompt = document.getElementById("prompt");
		haveUl = true;										//改变列表标志为true
		for (var i = 0; i < arrPrompt.length; i++) {		
			liList += "<li> <a href='#'>" + arrPrompt[i] + "</a></li>"		//将li标签组成字符串
			prompt.innerHTML = liList;
		}
	}
	noActive = true;		//每次改变内容后清空上下键选择的样式，标志位重置，需重新按上下键选择
}

/////上下键与回车键功能
search.onkeydown = function(event){
	if (haveUl) {			//前提是已有列表
		var event = event ? event : window.event;
		var len = prompt.childNodes.length;		//获取选项个数
		var attr;								//存储每项的class类名
		if (event.keyCode == 40) {				//下箭头键
			activeText = prompt.firstChild.childNodes[1].firstChild.nodeValue;  //默认第一项内容，当进入A循环，选中其他项时重置
			if (noActive) {						//第一次按下箭头，选中第一项
				prompt.firstChild.setAttribute("class", "active");		
			} else{
				for (var i = 0; i < len; i++) {				//遍历每项，找出已有active项			
					attr = prompt.childNodes[i].getAttribute("class");	
					if (i == (len - 1) && attr == "active") {		//如果是最后一项，则跳到第一项
						prompt.childNodes[i].removeAttribute("class");
						prompt.firstChild.setAttribute("class", "active");
					} else if (attr == "active") {								
						prompt.childNodes[i].removeAttribute("class");				
						prompt.childNodes[i + 1].setAttribute("class", "active");	//移除原有类名，下一项添加类名
						activeText = prompt.childNodes[i + 1].childNodes[1].firstChild.nodeValue;//进入A循环时，才更改变量值为对应选中项内容
						break;
					}
				}
			}
			noActive = false;   //已有激活项，下次按键不再设置第一项active，除非在input函数重置
		}
		if (event.keyCode == 38) {
			activeText = prompt.lastChild.childNodes[1].firstChild.nodeValue;
			if (noActive) {	
				prompt.lastChild.setAttribute("class", "active");	
			} else{
				for (var i = 0; i < len; i++) {
					attr = prompt.childNodes[i].getAttribute("class");
					if (i == 0 && attr == "active") {
						prompt.childNodes[i].removeAttribute("class");
						prompt.lastChild.setAttribute("class", "active");
						break;
					} else if (attr == "active") {
						prompt.childNodes[i].removeAttribute("class");
						prompt.childNodes[i - 1].setAttribute("class", "active");
						activeText = prompt.childNodes[i - 1].childNodes[1].firstChild.nodeValue;
						break;
					}
				}
			}
			noActive = false;
		}
		if (!noActive && event.keyCode == 13) {
			search.value = activeText;			//当回车时，将选中项内容赋予文本框
		}
	}
}
