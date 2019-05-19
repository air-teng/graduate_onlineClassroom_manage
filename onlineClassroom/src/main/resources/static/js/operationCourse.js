$(function(){
	if(userPermission.identificationCode >=2 ){
		var baseUrl = window.location.href.substr(0,window.location.href.indexOf("index")-1);
		//绑定点击事件
		$("#new-course-confirm").on("click",function(){
			var param = {};
			param.techAccount = userPermission.userAccount;
			courseName = $("#createcourse-modal-body input[name='courseName']").val();
			if(courseName == undefined || courseName == "" ){
				alert("课程名不能为空");
				return ;
			}
			param.courseName = courseName;
			param.types = $("#createcourse-modal-body input[name='types']").val();
			param.courseHours = $("#createcourse-modal-body input[name='courseHours']").val();
			param.score = $("#createcourse-modal-body input[name='score']").val();
			if($("#createcourse-modal-body input[name='startTime']").val()!=null && $("#createcourse-modal-body input[name='startTime']").val()!=''){
				param.startTime = datetimeLocalToDate($("#createcourse-modal-body input[name='startTime']").val());
			}
			if(param.courseHours == undefined || param.courseHours == "" ){
				alert("学时不能为空");
				return ;
			}
			if(param.score == undefined || param.score == "" ){
				alert("学分不能为空");
				return ;
			}
			param.introduction =$("#createcourse-modal-body textarea[name='introduction']").val();
			var url = baseUrl+"/user/"+userPermission.userAccount+"/course/add";
			$.ajax({
				url: url,
				type: "POST",
				data: param,
				success:function (data) {
					if (data.status == "true") {
						alert("新增成功!");
						window.location.reload();
					}
					if (data.status == "error") {
						alert(data.msg);
					}
				},
				error: function () {
					alert("新增失败!");
				}
			});
		});
	}
})