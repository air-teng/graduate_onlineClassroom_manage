$(function(){
	var baseUrl = window.location.href.substr(0,window.location.href.indexOf("index")-1);
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
})