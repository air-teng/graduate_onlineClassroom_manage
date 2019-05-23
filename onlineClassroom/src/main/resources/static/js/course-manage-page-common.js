$(function(){
	initForm();
})
var _path;
var href_path;
function initForm(){
	_path = {};
	href_path = window.location.href;
	var arr = href_path.split("/");
	_path.base_url = arr[0]+"//"+arr[2];
	for(var i=3;i<arr.length;i+=2){
		var param_name = arr[i];
		_path[param_name] = arr[i+1];
	}
	//用户信息设置
	headInfo();
	//跳转路径设置
	jumpURL();
	//导航栏样式设置
	jumpStyle();
	//设置上方切换路径
	setCourseChange();
}
function headInfo(){
	//设置用户名以及标签
	$("#jump-to-home").attr("href",_path.base_url+"/index");
	//css效果
	$("#jump-to-home,#myinfo-nav,#dashboard-nav").on("mouseover",function(){
		$(this).css({
			"color":"#08c",
			"border":"0.5px solid #08c"
		});
	})
	$("#jump-to-home,#myinfo-nav,#dashboard-nav").on("mouseout",function(){
		$(this).css({
			"color":"#777",
			"border":"0"
		});
	})
	//
	$("#user-name").html(userPermission.name);
	$("#logout").attr("href",_path.base_url+"/logout");
}
function setCourseChange(){
	var href_path2 = href_path.replace("info","course");
	$("#course-change-head").find("li:eq(0)").find("a").attr("href",href_path2.substr(0,href_path2.indexOf("course")+6)+"/"+"81689896-32660-4"+"/manage");
	$("#course-change-head").find("li:eq(1)").find("a").attr("href",href_path2.substr(0,href_path2.indexOf("course")+6)+"/"+"81689896-57666-2"+"/manage");
	$("#course-change-head").find("li:eq(2)").find("a").attr("href",href_path2.substr(0,href_path2.indexOf("course")+6)+"/"+"81689896-57666-2"+"/manage");
	$("#course-change-head").find("li:eq(3)").find("a").attr("href",href_path2.substr(0,href_path2.indexOf("course")+6)+"/"+"81689896-88047-3"+"/manage");
}
function jumpURL(){
	//设置跳转标签
	//替换掉course
	var href_path2 = href_path.replace("course","info");
	$("#myinfo,#myinfo-nav").attr("href",href_path2.substr(0,href_path2.indexOf("info")+4)+"/myinfo");
	//替换掉info
	href_path2 = href_path.replace("info","course");
	$("#dashboard,#dashboard-nav").attr("href", href_path2.substr(0,href_path2.indexOf("course")+6)+"/dashboard");
	$("#tables").attr("href", href_path2.substr(0,href_path2.indexOf("course")+6)+"/tables");
	
	if(/[0-9]+-[0-9]+-[0-9]+/.test(_path.course)){
		$.ajax({
			url:href_path2.substr(0,href_path2.indexOf("course")+6)+"/changeCourseSession",
			async:false,//同步
			type:"POST",
			data:{"courseCode":_path.course},
			success: function(res){
				if(res.status == "true"){
					courseCodeFromSession = _path.course;
				}
			},
			error: function(){
				window.location.href = href_path.substr(0,href_path2.indexOf("course")+6)+"/error";
			}
		})
	}
	$("#manage").attr("href", href_path2.substr(0,href_path2.indexOf("course")+6)+"/"+courseCodeFromSession+"/manage");
	$("#classrooms").attr("href", href_path2.substr(0,href_path2.indexOf("course")+6)+"/"+courseCodeFromSession+"/classrooms");
	$("#source").attr("href", href_path2.substr(0,href_path2.indexOf("course")+6)+"/"+courseCodeFromSession+"/source");
	$("#statistics").attr("href", href_path2.substr(0,href_path2.indexOf("course")+6)+"/"+courseCodeFromSession+"/statistics");
	$("#judge").attr("href", href_path2.substr(0,href_path2.indexOf("course")+6)+"/"+courseCodeFromSession+"/judge");
	$("#feedback").attr("href", href_path2.substr(0,href_path2.indexOf("course")+6)+"/"+courseCodeFromSession+"/feedback");
}
function jumpStyle(){
	//当前进入的是哪个页面，则触发哪个按钮
	var curId = href_path.substr(href_path.lastIndexOf("/")+1);
	$("#"+curId).parent("li").addClass("active");
	$("#"+curId+"-nav").parent("li").addClass("active");
	//将当前选中的标签置为#
	$("#"+curId).attr("href","#");
	$("#"+curId+"-nav").attr("href","#");
}