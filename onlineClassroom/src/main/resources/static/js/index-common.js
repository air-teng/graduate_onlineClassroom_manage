$(function(){
	activeStatusSet();
	technologySupport();
})
/*动态状态设置*/
function activeStatusSet(){
	var path = window.location.href;
	if(path.split("/")[3] == "index"){
		$("#menu-top").find("a[class='menu-top-active']").removeClass("menu-top-active");
		$("#menu-top").find("a[href='/index']").addClass("menu-top-active");
		$("#menu-top").find("a[href='/index']").attr("href","#");
	}else if(path.split("/")[3] == "personalInfo"){
		$("#menu-top").find("a[class='menu-top-active']").removeClass("menu-top-active");
		$("#menu-top").find("a[href='/personalInfo']").addClass("menu-top-active");
		$("#menu-top").find("a[href='/personalInfo']").attr("href","#");
	}else if(path.split("/")[3] == "sociaty"){
		$("#menu-top").find("a[class='menu-top-active']").removeClass("menu-top-active");
		$("#menu-top").find("a[href='/sociaty']").addClass("menu-top-active");
		$("#menu-top").find("a[href='/sociaty']").attr("href","#");
	}else if(path.split("/")[3] == "message"){
		$("#menu-top").find("a[class='menu-top-active']").removeClass("menu-top-active");
		$("#menu-top").find("a[href='/message']").addClass("menu-top-active");
		$("#menu-top").find("a[href='/message']").attr("href","#");
	}else if(path.split("/")[3] == "email"){
		$("#menu-top").find("a[class='menu-top-active']").removeClass("menu-top-active");
		$("#menu-top").find("a[href='/email']").addClass("menu-top-active");
		$("#menu-top").find("a[href='/email']").attr("href","#");
	}
}
function technologySupport(){
//	var baseUrl = window.location.href.substr(0,window.location.href.indexOf("index")-1);
	var path = window.location.href;
	var baseUrl = path.split("/")[0]+"//"+path.split("/")[2];
	if(userPermission == null){
		window.location.href = baseUrl;
	}
	var identification = "普通用户";
	switch(userPermission.identificationCode){
		case 0:
			identification="普通用户";
			break;
		case 1:
			identification="学生";
			break;
		case 2:
			identification="老师";
			break;
		case 3:
			identification="管理员";
			break;
	}
	//头像
	var srcpath = "http://localhost:8070/user/"+userPermission.userAccount+"/info/download";
	$("#avatar-my").attr("src",srcpath);
	//身份
	$(".media-heading").next("h5").html(identification);
	//技术支持
	$("#supportEmail").html("paincloudfly@163.com");
	$("#supportPhone").html("182-8168-9896");
	$("#personalBioText").html(userPermission.personalBio);
	$("#userNameText").html(userPermission.name);
	$("#full-profile").attr("href",baseUrl+"/user/"+userPermission.userAccount+"/info/myinfo");
}