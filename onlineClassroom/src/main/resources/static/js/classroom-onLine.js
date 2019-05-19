$(function(){
	$.ajax({
		url:path.substr(0,path.indexOf("course")+6)+"/getCourse",
		data:{"courseCode":path.split('/')[6]},
		type:"POST",
		success:function (data) {
			if (data.status == "true") {
				if(data.object!=null){
					//初始化课程信息
					initOnLinePageCourse(data.object);
				}
			}
			if (data.status == "error") {
				alert(data.msg);
			}
		},
		error: function () {
			alert("获取课程信息失败!");
		}
	})
	$("#go-into-online-classroom").on("click",function(){
		if($(this).html() == '<i class="fa fa-desktop fa-6"></i>'){
			$(this).html('<i class="fa fa-spinner fa-spin"></i>');
		}else{
			$(this).html('<i class="fa fa-desktop fa-6"></i>');
		}
	});
})
function initOnLinePageCourse(course){
	$("#classroom-course-info").html(
			'<div>课程进度:&nbsp;&nbsp;&nbsp;'+course.finishedHours*100.0/course.courseHours+'%</div>'+
        	'<div><div>课程名称:<span>'+course.courseName+'</span></div><div>课程代码:<span>'+course.courseCode+'</span></div><div>课程类型:<span>'+course.types+'</span></div></div>'+
        	'<div><div>任课老师:<span>'+course.techName+'</span></div><div>老师工号:<span>'+course.techAccount+'</span></div></div>'+
        	'<div><div>课程学分:<span>'+course.score+'</span></div><div>课程学时:<span>'+course.courseHours+'</span></div></div>'+
        	'<div><div>课程介绍:<span>'+course.introduction+'</span></div></div>'
			);
}
function initOnLinePageClassroom(globalClassroom){
	$("#classroom-classroom-info").html(
			'<div><div>课堂名称:<span>'+globalClassroom.classroomName+'</span></div><div>课堂代码:<span>'+globalClassroom.classroomCode+'</span></div></div>'+
			'<div><div>开始时间:<span>'+dateToDatetimeLocal(globalClassroom.startTime)+'</span></div><div>结束时间:<span>'+dateToDatetimeLocal(globalClassroom.endTime)+'</span></div><div>课堂时长:<span>'+globalClassroom.lengthOfTime+'</span></div></div>'+
			'<div><div>教师工号:<span>'+globalClassroom.onlineTechAccount+'</span></div><div>参与人数:<span>'+globalClassroom.participateTotal+'</span></div></div>'+
			'<div><div>课堂介绍:<span>'+globalClassroom.classroomIntroduction+'</span></div></div>'
	);
}