$(function(){
	if(userPermission.identificationCode <2){
		$("#new-classroom-modal-click").css({"display":"none"});
	}else{
		$("#new-classroom-modal-click").on("click",function(){
			//初始新增框
			$("#createclassroom-modal-body").find("input[name='courseName']").val(globalClassroom.courseName);
			$("#createclassroom-modal-body").find("input[name='courseCode']").val(globalClassroom.courseCode);
			$("#createclassroom-modal-body").find("input[name='onlineTechAccount']").val(globalClassroom.onlineTechAccount);
			//初始化点击事件和change事件
			$("#input-start-time").on("change",function(){
				$("#input-end-time").val($(this).val());
			});
			$("#new-classroom-confirm").on("click",function(){
				if($("#createclassroom-modal-body").find("input[name='startTime']").val() == "" ||
						$("#createclassroom-modal-body").find("input[name='endTime']").val() == ""){
					alert("开始时间和结束时间不能为空");
					return;
				}
				var param={
					"courseCode":$("#createclassroom-modal-body").find("input[name='courseCode']").val(),
					"courseName":$("#createclassroom-modal-body").find("input[name='courseName']").val(),
					"classroomName":$("#createclassroom-modal-body").find("input[name='classroomName']").val(),
					"startTime":datetimeLocalToDate($("#createclassroom-modal-body").find("input[name='startTime']").val()),
					"endTime":datetimeLocalToDate($("#createclassroom-modal-body").find("input[name='endTime']").val()),
					"onlineTechAccount":$("#createclassroom-modal-body").find("input[name='onlineTechAccount']").val(),
					"classroomIntroduction":$("#createclassroom-modal-body").find("textarea[name='classroomIntroduction']").val(),
				};
				$.ajax({
					url:basePath+"/add",
					data:param,
					success:function(result){
						if(result.status == "true"){
							alert("新增成功");
							window.location.reload();
						}else if(result.status == "error"){
							alert(result.msg);
						}
					},
					error:function(result){
						alert("新增失败");
					}
				});
			})
			$("#new-classroom-modal").modal("show");
		})
		//修改模态框
		$("#update-and-delete-classroom a:eq(0)").on("click",function(){
			$.ajax({
				url:basePath+"/getByClassroomAndCourseCode",
				data:{"classroomCode":globalClassroomList[$("#select-classroom-order option:selected").text()-1].classroom_code},
				type:"POST",
				success:function (data) {
					if (data.status == "true") {
						if(data.object!=null){
							updateClassroom(data.object);
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
			$("#update-classroom-confirm").on("click",function(){
				if($("#updateclassroom-modal-body").find("input[name='startTime']").val() == "" ||
						$("#updateclassroom-modal-body").find("input[name='endTime']").val() == ""){
					alert("起始时间和结束时间不能为空");
					return;
				}
				var param = {
					classroomCode:$("#updateclassroom-modal-body").find("input[name='classroomCode']").val(),
					courseName:$("#updateclassroom-modal-body").find("input[name='courseName']").val(),
				    classroomName:$("#updateclassroom-modal-body").find("input[name='classroomName']").val(),
					startTime:datetimeLocalToDate($("#updateclassroom-modal-body").find("input[name='startTime']").val()),
					endTime:datetimeLocalToDate($("#updateclassroom-modal-body").find("input[name='endTime']").val()),
				    onlineTechAccount:$("#updateclassroom-modal-body").find("input[name='onlineTechAccount']").val(),
					classroomIntroduction:$("#updateclassroom-modal-body").find("textarea[name='classroomIntroduction']").val()
				};
				$.ajax({
					url:basePath+"/update",
					data:param,
					type:"POST",
					success:function (data) {
						if (data.status == "true") {
							alert("修改课堂信息成功!");
							window.location.reload();
						}
						if (data.status == "error") {
							alert(data.msg);
						}
					},
					error: function () {
						alert("修改课堂信息失败!");
					}
				});
			})
		});
		//删除
		$("#update-and-delete-classroom a:eq(1)").on("click",function(){
			$("#delete-confirm-classroom-name").html(globalClassroomList[$("#select-classroom-order option:selected").text()-1].classroom_name);
			$("#delete-confirm-classroom-name").attr("data-classroom-code",globalClassroomList[$("#select-classroom-order option:selected").text()-1].classroom_code);
			$("#modal-footer-cancel-btn").click();
			$("#delete-classroom-modal").modal("show");
			$("#delete-classroom-confirm").on("click",function(){
				$.ajax({
					url:basePath+"/delete",
					data:{"classroomCode":$("#delete-confirm-classroom-name").attr("data-classroom-code")},
					type:"POST",
					success:function (data) {
						if (data.status == "true") {
							alert("删除课堂成功!");
							window.location.reload();
						}
						if (data.status == "error") {
							alert(data.msg);
						}
					},
					error: function () {
						alert("删除课堂失败!");
					}
				});
			});
		});
		
	}
})
//课堂修改弹出框
function updateClassroom(classroom){
	$("#modal-footer-cancel-btn").click();
	$("#updateclassroom-modal-body").find("input[name='classroomCode']").val(classroom.classroomCode);
	$("#updateclassroom-modal-body").find("input[name='courseName']").val(classroom.courseName);
	$("#updateclassroom-modal-body").find("input[name='classroomName']").val(classroom.classroomName);
	$("#updateclassroom-modal-body").find("input[name='startTime']").val(dateToDatetimeLocal(classroom.startTime));
	$("#updateclassroom-modal-body").find("input[name='endTime']").val(dateToDatetimeLocal(classroom.endTime));
	$("#updateclassroom-modal-body").find("input[name='onlineTechAccount']").val(classroom.onlineTechAccount);
	$("#updateclassroom-modal-body").find("textarea[name='classroomIntroduction']").val(classroom.classroomIntroduction);
	$("#update-classroom-modal").modal("show");
}
