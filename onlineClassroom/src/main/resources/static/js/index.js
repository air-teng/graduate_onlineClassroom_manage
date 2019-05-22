$(function(){
	init();
	courseInit();
//	courseListSuggestion();
})
function courseListSuggestion(){
	if(userPermission.identificationCode >= 2){
		$("#alert-alert-success-location").append(
				'<strong>'+userPermission.name+'</strong>'+
				' 您好！以下是您所创建的所有课程。'+
				'点击右侧 <a><i class="fa fa-plus fa-1x"></i></a> 可创建课程'+
				',点击 <a><i class="fa fa-angle-double-right"></i></a> 可管理课程列表。'
		);
	}else{
		$("#alert-alert-success-location").html(
				userPermission.name+
				'您好！以下是您所参与的所有课程'+
				'点击<a><i class="fa fa-plus fa-2x"></i></a>可进行选课'
		);
	}
}
function courseInit(){
	//为课程绑定点击事件
	$("#courseRows").on("click",'[class*="my-course-classroom-click"]',function(){
		window.location.href = $(this).parent("div").attr("data-hrefPath");
	})
	//为有权限的人添加新增课堂的按钮
	if(userPermission.identificationCode >= 2){//老师及管理员有新增课堂的权限
		$("#alert-alert-success-location").append(
				'<div style="display:inline-block;float:right;"><a title="创建课程" id="new-course-enough-permission-button" data-toggle="modal" data-target="#new-course-modal"><i class="fa fa-plus fa-2x"></i></a>'+
				'<a title="管理课程" id="manage-course-button"><i class="fa fa-angle-double-right"></i></a></div>');
		var path = window.location.href;
		$("#manage-course-button").attr("href",path.substr(0,path.lastIndexOf("/"))+"/user/"+userPermission.userAccount+"/course/tables");
		$("#manage-course-button").css({
			"cursor":"pointer",
			"font-size":'35px',
			"margin-left":"20px",
			"color":"#3385ff"
		});
		$("#new-course-enough-permission-button,#manage-course-button").css({
			"cursor":"pointer",
			"color":"#3385ff",
		});
		//设置悬浮
		$("#new-course-enough-permission-button,#manage-course-button").on("mouseover",function(){
			$(this).css({
				"color":"#2d78f4"
			}
			)
		});
		$("#new-course-enough-permission-button,#manage-course-button").on("mouseout",function(){
			$(this).css({
				"color":"#3385ff"
			}
			)
		});
	}else{
		$("#alert-alert-success-location").append(
				'<a title="去选课" id="select-course-button" style="float:right"><i class="fa fa-plus fa-2x"></i></a>');
		var path = window.location.href;
		$("#select-course-button").attr("href",path.substr(0,path.lastIndexOf("/"))+"/user/"+userPermission.userAccount+"/course/tables");
		$("#select-course-button").css({
			"cursor":"pointer",
			"color":"#3385ff",
		});
		//设置悬浮
		$("#select-course-button").on("mouseover",function(){
			$(this).css({
				"color":"#2d78f4"
			}
			)
		});
		$("#select-course-button").on("mouseout",function(){
			$(this).css({
				"color":"#3385ff"
			}
			)
		});
	}
}
function init(){
	var baseUrl = window.location.href.substr(0,window.location.href.indexOf("index")-1);
	var param={"userAccount":userPermission.userAccount};
	$.ajax({
		url: baseUrl+"/user/"+userPermission.userAccount+"/course/getAllCourse",
		type:"GET",
		data:param,
		success:function (data) {
			if (data.status == "true") {
				if(data.object!=null){
					initDashBoardCourse(data.object);
				}
			}
			if (data.status == "error") {
				alert(data.msg);
			}
		},
		error: function () {
			alert("获取课程列表失败!");
		}
	});
}
//初始化课程列表
function initDashBoardCourse(courseList){
	var formList = {};
	formList.param0 = 
				   '<div class="dashboard-div-wrapper my-course-classroom-click bk-clr-one" style="margin-bottom:5px;">'+
					'	<i class="fa fa-venus dashboard-div-icon"></i>'+
					'	<div class="progress progress-striped active">'+
					'		<div class="progress-bar progress-bar-warning" role="progressbar"'+
					'			aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"'+
					'			style="width: 80%"></div>'+

					'	</div>'+
					'	<h5>Simple Text Here</h5>'+
				'</div>';
	formList.param1 = 
							'<div class="dashboard-div-wrapper my-course-classroom-click bk-clr-two" style="margin-bottom:5px;">'+
					'	<i class="fa fa-edit dashboard-div-icon"></i>'+
					'	<div class="progress progress-striped active">'+
					'		<div class="progress-bar progress-bar-danger" role="progressbar"'+
					'			aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"'+
					'			style="width: 70%"></div>'+
					'	</div>'+
					'	<h5>Simple Text Here</h5>'+
					'</div>';
	   formList.param2 = 
					'	<div class="dashboard-div-wrapper my-course-classroom-click bk-clr-three" style="margin-bottom:5px;">'+
						'	<i class="fa fa-cogs dashboard-div-icon"></i>'+
						'	<div class="progress progress-striped active">'+
						'		<div class="progress-bar progress-bar-success" role="progressbar"'+
						'			aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"'+
						'			style="width: 40%"></div>'+
						'	</div>'+
						'	<h5>Simple Text Here</h5>'+
					'</div>';
	  formList.param3 = 
							 '	<div class="dashboard-div-wrapper my-course-classroom-click bk-clr-four" style="margin-bottom:5px;">'+
								'<i class="fa fa-bell-o dashboard-div-icon"></i>'+
								'<div class="progress progress-striped active">'+
									'<div class="progress-bar progress-bar-primary" role="progressbar"'+
									'	aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"'+
									'	style="width: 50%"></div>'+
								'</div>'+
								'<h5>Simple Text Here</h5>'+
						'</div>';
	   //初始化
	   var str = "";
	   for(var i = 0;i<courseList.length;i++){
		   var curi = i%4;
		   var formListMem = "param"+curi;
		   str = str+
				 '<div class="col-md-3 col-sm-3 col-xs-6" data-course-code="'+(i+1)+'">'+
				   formList[formListMem]+
				   '<button onclick="jumpToDetail(\''+courseList[i].courseCode+'\')" class="course-detail-css">课程详情</button>'+
				   '<button onclick="jumpToCrmList(\''+courseList[i].courseCode+'\')" class="course-classroom-css">课堂列表</button>'+
				   '<button onclick="jumpToResource(\''+courseList[i].courseCode+'\')" class="course-resource-css">学习资料</button>'+
				 "</div>";
	   }
	   //替换
	   $("#courseRows").html(str);
	   var path = window.location.href;
	   path = path.substr(0,path.lastIndexOf("/"));
	   for(var i = 0;i<courseList.length;i++){
		   var hrefPath = path + "/user/"+userPermission.userAccount+"/course/" +courseList[i].courseCode +"/classroom/" + (courseList[i].classroomMaxCode);
		   $("#courseRows div[data-course-code='"+(i+1)+"']").attr("data-hrefPath",hrefPath);
		   $("#courseRows div[data-course-code='"+(i+1)+"']").find("h5").html(courseList[i].courseName);
		   $("#courseRows div[data-course-code='"+(i+1)+"']").find("div[role='progressbar']").css({
			   "width":""+((courseList[i].finishedHours*100.0)/courseList[i].courseHours)+"%"
		   });
		   //样式修改
		   $("#courseRows div[data-course-code]").css({"cursor":"pointer"});
	   }
}
function　jumpToDetail(courseCode){
	var path = window.location.href;
	var basePath = path.split("/")[0]+"//"+path.split("/")[2]+"/user/"+userPermission.userAccount+"/course/";
	$.ajax({
		url:basePath+"changeCourseSession",
		async:false,//同步
		type:"POST",
		data:{"courseCode":courseCode},
		success: function(res){
			if(res.status == "true"){
				window.location.href = basePath + courseCode + "/manage";
			}
		},
		error: function(){
			window.location.href = href_path.substr(0,href_path2.indexOf("course")+6)+"/error";
		}
	})
}
function　jumpToCrmList(courseCode){
	var path = window.location.href;
	var basePath = path.split("/")[0]+"//"+path.split("/")[2]+"/user/"+userPermission.userAccount+"/course/";
	$.ajax({
		url:basePath+"changeCourseSession",
		async:false,//同步
		type:"POST",
		data:{"courseCode":courseCode},
		success: function(res){
			if(res.status == "true"){
				window.location.href = basePath + courseCode + "/classrooms";
			}
		},
		error: function(){
			window.location.href = href_path.substr(0,href_path2.indexOf("course")+6)+"/error";
		}
	})
}
function　jumpToResource(courseCode){
	var path = window.location.href;
	var basePath = path.split("/")[0]+"//"+path.split("/")[2]+"/user/"+userPermission.userAccount+"/course/";
	$.ajax({
		url:basePath+"changeCourseSession",
		async:false,//同步
		type:"POST",
		data:{"courseCode":courseCode},
		success: function(res){
			if(res.status == "true"){
				window.location.href = basePath + courseCode + "/source";
			}
		},
		error: function(){
			window.location.href = href_path.substr(0,href_path2.indexOf("course")+6)+"/error";
		}
	})
}