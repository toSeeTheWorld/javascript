/*
第一阶段

在页面中，有一个单行输入框，一个按钮，输入框中用来输入
用户的兴趣爱好，允许用户用半角逗号来作为不同爱好的分隔。
当点击按钮时，把用户输入的兴趣爱好，按照上面所说的分隔
符分开后保存到一个数组，过滤掉空的、重复的爱好，在按钮
下方创建一个段落显示处理后的爱好。

第二阶段

单行变成多行输入框，一个按钮，输入框中用来输入用户的兴趣爱好，
允许用户用换行、空格（全角/半角）、逗号（全角/半角）、顿号、
分号来作为不同爱好的分隔。

第三阶段
用户输入的爱好数量不能超过10个，也不能什么都不输入。
当发生异常时，在按钮上方显示一段红色的错误提示文字，
并且不继续执行后面的行为；当输入正确时，提示文字消失。
同时，当点击按钮时，不再是输出到一个段落，而是每一个
爱好输出成为一个checkbox，爱好内容作为checkbox的label。
*/
//字符串转数组
function arrange(strHobby){
	var arrHobby = strHobby.split(/[；;、，,\s\n]/);		//正则分隔字符串得到数组
	console.log(arrHobby)
	for (var i = 0; i < arrHobby.length-1; i++) {	//将第i项与后面每一行j比较
		for (var j = i + 1; j < arrHobby.length; j++) {
			if ((arrHobby[i] == arrHobby[j]) || arrHobby[j] == "" ||arrHobby[j] == " ") {
				arrHobby.splice(j,1);	//发现数组相同，为空，为空格时删除掉
				j--;		//后一项数组会前移，需再比较
			}
		}
	}
	if (arrHobby[0] == "" || arrHobby[0] == " ") {
		arrHobby.splice(0,1);		//上面for循环只能删除后项j，所以第一项需再检查
	}
	console.log(arrHobby)
	return arrHobby;
}
//数组转选项，添加到容器中
function checkbox(arrHobby, container){
	for (var i = 0; i < arrHobby.length; i++) {
		var input = document.createElement("input");
		input.type = "checkbox";
		input.id = "hobby" + (i+1);
		var label = document.createElement("label");
		label.setAttribute("for",input.id);
		var textNode = document.createTextNode(arrHobby[i]);//创建文本节点
		container.appendChild(input);
		container.appendChild(label);
		label.appendChild(textNode);
	}
}
//提示文字
function warn(arrHobby){
	var warn = document.getElementById("warn");
	if (arrHobby.length > 10 || arrHobby[0] == undefined) {//多于10个爱好或一个都没有
		warn.style.visibility = "visible";
		return false;
	} else{
		warn.style.visibility = "hidden";
		return true;
	}
}

var btn = document.getElementById("btn");
btn.onclick = function(){
	var strHobby = document.getElementById("hobby").value;
	var container = document.getElementById("container");
	var hobby = arrange(strHobby);
	if (warn(hobby)) {		//当爱好个数符合条件式，显示
		checkbox(hobby,container);
	}
}

/*示例字符串1：
你好；youyong;dasf、24243，@￥#%￥,hhh youyong
youyong, ,qiguai
nihao hasdf dsf afd3,
示例字符串2： nihao hoafn df（第一个字符是空格）
*/