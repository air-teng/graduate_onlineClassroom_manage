//全局共享
//课堂总数
var globalClassroomList;//课程摘要列表
var globalClassroom;//课堂信息
var path = window.location.href;
var basePath = path.substr(0,path.lastIndexOf("classroom")+9);
var jumpBasePath;//各个页面跳转的基本路径
var classroomCodeStr = path.split("/")[8];//课堂代码
var curClassroomCode;//当前课堂的代码
$(function(){
	var page = path.split("/");
	if(page.length <= 9){
		$("#classroom-left-nav-onLine").parent("li").addClass("active");
	}else{
		$("#classroom-left-nav-"+page[9]).parent("li").addClass("active");
	}
	//初始化顶部导航栏的值
	$("#classroom-to-index").attr("href",path.substr(0,path.indexOf("user"))+"index");
	//css效果
	$("#classroom-to-index").on("mouseover",function(){
		$(this).css({
			"color":"#08c"
		});
	})
	$("#classroom-to-index").on("mouseout",function(){
		$(this).css({
			"color":"#fff"
		});
	})
	//css效果
	$("#classroom-user-logout").attr("href",path.substr(0,path.indexOf("user")));
	$.ajax({
		url:basePath+"/getByClassroomAndCourseCode",
		data:{"classroomCode":classroomCodeStr},
		type:"POST",
		success:function (data) {
			if (data.status == "true") {
				if(data.object!=null){
					//初始化课堂信息
					initClassroomPage(data.object);
					initNavOfTopAndLeft(data.object);
					initOnLinePageClassroom(data.object);
				}
			}
			if (data.status == "error") {
				alert(data.msg);
			}
		},
		error: function () {
			alert("获取课堂信息失败!");
		}
	})
	$.ajax({
		url:basePath+"/getSimpleClassroomByCourseCode",
		type:"POST",
		success:function (data) {
			if (data.status == "true") {
				if(data.object!=null){
					//初始化课堂模态框内容
					classroomSwitch(data.object);
				}
			}
			if (data.status == "error") {
				alert(data.msg);
			}
		},
		error: function () {
			alert("获取课堂信息失败!");
		}
	})
})
function initClassroomPage(classroom){
	globalClassroom = classroom;
	$("#modal-body-classroom-name").html(classroom.classroomName);//设置为当前课堂名称
}
//设置切换课堂的模态框内容
function classroomSwitch(classroomList){
	globalClassroomList = classroomList;
	if(classroomList == null){
		return ;
	}
	//初始化选择框的值
	for(var i=1;i<classroomList.length+1;i++){
		$("#select-classroom-order").append('<option value="'+classroomList[i-1].classroom_code+'"> '+i+' </option>');
	}
	//点击事件
	$("#classroom-last-classroom").on("click",function(){
		var classroomCode = globalClassroom.classroomCode;
		if(classroomCode == classroomList[0].classroom_code){
			return;
		}
		$(this).attr("href",basePath+"/"+getLastClassroomCode(classroomCode,classroomList));
	});
	$("#classroom-next-classroom").on("click",function(){
		var classroomCode = globalClassroom.classroomCode;
		if(classroomCode == classroomList[classroomList.length-1].classroom_code){
			return;
		}
		$(this).attr("href",basePath+"/"+getNextClassroomCode(classroomCode,classroomList));
	});
	$("#classroom-other-classroom").on("click",function(){
		var selectedClassroomCode = $("#select-classroom-order option:selected").val();
		$(this).attr("href",basePath+"/"+selectedClassroomCode);
	});
	$("#select-classroom-order").on("change",function(){
		//随着所选择的课堂变化而变化
		var index = $("#select-classroom-order option:selected").text()-1;
		$("#modal-body-classroom-name").html(classroomList[index].classroom_name);
	});
	//模态框
	$("#select-classroom-th-click").on("click",function(){
		$("#modal-body-classroom-name").html(classroomList[$("#select-classroom-order option:selected").text()-1].classroom_name);
		$("#select-classroom-th").modal("show");
	})
}
//获取上一堂课的代码
function getLastClassroomCode(curCode,classroomList){
	if(curCode == classroomList[0].classroom_code){
		return curCode;
	}
	for(var i=1;i<classroomList.length;i++){
		if(curCode == classroomList[i].classroom_code){
			return classroomList[i-1].classroom_code;
		}
	}
}
//获取下一堂课的代码
function getNextClassroomCode(curCode,classroomList){
	if(curCode == classroomList[classroomList.length-1].classroom_code){
		return curCode;
	}
	for(var i=0;i<classroomList.length-1;i++){
		if(curCode == classroomList[i].classroom_code){
			return classroomList[i+1].classroom_code;
		}
	}
}
function initNavOfTopAndLeft(globalClassroom){
	//初始化左边导航栏的值
	jumpBasePath=basePath+"/"+globalClassroom.classroomCode;
	$("#classroom-left-nav-onLine").attr("href",jumpBasePath);
	$("#classroom-left-nav-dashboard").attr("href",jumpBasePath+"/dashboard");
	$("#classroom-top-nav-pages-login").attr("href",jumpBasePath+"/login");
	$("#classroom-top-nav-pages-forgot-password").attr("href",jumpBasePath+"/forgot-password");
	$("#classroom-top-nav-pages-404").attr("href",jumpBasePath+"/404");
	$("#classroom-top-nav-pages-blank").attr("href",jumpBasePath+"/blank");
	$("#classroom-left-nav-charts").attr("href",jumpBasePath+"/charts");
	$("#classroom-left-nav-source").attr("href",jumpBasePath+"/source");
}