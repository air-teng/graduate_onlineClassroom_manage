$(function(){
	initCourseList();
	bondClick();
})
//初始化课程
function initCourseList(){
	var baseUrl = window.location.href.substr(0,window.location.href.indexOf("index")-1);
	var param={"userAccount":userPermission.userAccount};
	$.ajax({
		url: baseUrl+"/user/"+userPermission.userAccount+"/course/getAllCourseList",
		type:"GET",
		data:param,
		success:function (data) {
			if (data.status == "true") {
				initCourseTable(data.object);
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
function initCourseTable(courseList){
	var str = "";
	var operation = "";
	
//	for(var j=1;j<10;j++){
		for(var i=0;i<courseList.length;i++){
			str+=
				'<tr class="gradeU">'+
			        '<td>'+courseList[i].courseCode+'</td>'+
			        '<td>'+'<a style="cursor:pointer;" href="'+_path.base_url+'/user/'+_path.user+'/course/'+courseList[i].courseCode+'/manage">'+courseList[i].courseName+'</a>'+'</td>'+
			        '<td>'+courseList[i].types+'</td>'+
			        '<td>'+courseList[i].techAccount+'</td>'+
			        '<td>'+courseList[i].teacherName+'</td>'+
			        '<td>'+courseList[i].score+'</td>'+
			        '<td class="center">'+courseList[i].courseHours+'</td>'
			        ;
			if(courseList[i].startTime != null){
				var timeVar = dateToDatetimeLocal(courseList[i].startTime);
				timeVar = timeVar.split("T")[0]+" "+timeVar.split("T")[1];
				str += '<td class="center">'+timeVar+'</td>';
			}else{
				str += '<td class="center">待定</td>';
			}
			if(userPermission.identificationCode < 2){
				if(courseList[i].selectStatus == true){
					operation='<td class="center"><a title="不选" data-type="not-select" class="operation-course" style="cursor:pointer;"><i class="fa fa-close"></i></a>';
				}else{
					operation='<td class="center"><a title="取消选择" data-type="select" class="operation-course" style="cursor:pointer;"><i class="fa fa-plus"></i></a>';
				}
			}else{
				operation='<td class="center"><a title="修改" data-type="update-course" class="operation-course" style="cursor:pointer;"><i class="fa fa-edit"></i></a>&nbsp;&nbsp;<a data-type="delete-course" class="operation-course" title="删除" style="cursor:pointer;"><i class="fa fa-trash-o fa-fw"></i></a>';
			}
			
			str+=operation+
				' &nbsp;<a title="展开" style="cursor:pointer;" class="openorclose-single-course"><i class="fa fa-angle-double-down"></i></a>'+
		        '</td></tr>';
			str+='<tr style="display:none" class="gradeU">'+
			'<td >'+courseList[i].courseCode+'</td>'+
			'<td colspan="8">'+courseList[i].introduction+'</td>'+
			'<td style="display:none"></td>'+
			'<td style="display:none"></td>'+
			'<td style="display:none"></td>'+
			'<td style="display:none"></td>'+
			'<td style="display:none"></td>'+
			'<td style="display:none"></td>'+
			'<td style="display:none"></td></tr>';
			
		}
//	}
	$("#course-list-form").html(str);
	
	//初始化展开操作的点击事件
	$("body").on("click",".openorclose-single-course",function(){
		var status = $(this).parents("tr").next("tr").css("display");
		if(status == "none"){
			$(this).parents("tr").next("tr").css({
				"display":"table-row"
			});
			$(this).html('<i class="fa fa-angle-double-up"></i>');
		}else{
			$(this).parents("tr").next("tr").css({
				"display":"none"
			});
			$(this).html('<i class="fa fa-angle-double-down"></i>');
		}
	})
	//bootstrap初始化
	$('#course-list-table').dataTable( {
		"sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
		"sPaginationType": "bootstrap",
		"oLanguage": {
			"sLengthMenu": "_MENU_ records per page"
		}
	} );
	
}
//绑定点击事件
function bondClick(){
	$("#course-list-form").on("click",".operation-course",function(){
		var operationType = $(this).attr("data-type");
		var courseCode = $(this).parents("tr").find("td:eq(0)").html();
		switch(operationType){
			case "update-course":
				updateCourse(courseCode,this);
				break;
			case "delete-course":
				deleteCourse(courseCode,this);
				break;
			case "select":
				selectCourse(courseCode,this);
				break;
			case "not-select":
				notSelectCourse(courseCode,this);
				break;
		}
	})
}
function updateCourse(courseCode,obj){
	//初始化修改的表格
	$("#modify-course-modal-body").find("input[name='courseCode']").val($(obj).parents("tr").find("td:eq(0)").html());
	$("#modify-course-modal-body").find("input[name='courseName']").val($(obj).parents("tr").find("td:eq(1)").find("a").html());
	$("#modify-course-modal-body").find("input[name='types']").val($(obj).parents("tr").find("td:eq(2)").html());
	$("#modify-course-modal-body").find("input[name='score']").val($(obj).parents("tr").find("td:eq(5)").html());
	$("#modify-course-modal-body").find("input[name='courseHours']").val($(obj).parents("tr").find("td:eq(6)").html());
	//设置时间
	var startTime = $(obj).parents("tr").find("td:eq(7)").html();
	$("#modify-course-modal-body").find("input[name='startTime']").val(startTime);
	$("#modify-course-modal-body").find("textarea[name='introduction']").val($(obj).parents("tr").next("tr").find("td:eq(1)").html());
//	$("#modify-course-modal-body").find("textarea[name='introduction']").val($(obj).parents("tr").find("td:eq(3)").html());
	$("#modify-course-confirm").on("click",function(){
		var path = window.location.href;
		
		var param = {
				"techAccount":userPermission.userAccount,
				"courseCode":$("#modify-course-modal-body").find("input[name='courseCode']").val(),
				"courseName":$("#modify-course-modal-body").find("input[name='courseName']").val(),
				"types":$("#modify-course-modal-body").find("input[name='types']").val(),
				"score":$("#modify-course-modal-body").find("input[name='score']").val(),
				"courseHours":$("#modify-course-modal-body").find("input[name='courseHours']").val(),
				"introduction":$("#modify-course-modal-body").find("textarea[name='introduction']").val(),
				};
		if($("#modify-course-modal-body").find("input[name='startTime']").val() != null
				&& $("#modify-course-modal-body").find("input[name='startTime']").val() != ""){
			param.startTime = datetimeLocalToDate($("#modify-course-modal-body").find("input[name='startTime']").val());
		}
		$.ajax({
			url:path.substr(0,path.lastIndexOf("/"))+"/updateCourse",
			data:param,
			type:"POST",
			success:function (data) {
				if (data.status == "true") {
					alert("修改课程成功!");
					window.location.reload();
//					initCourseList();
				}
				if (data.status == "error") {
					alert(data.msg);
				}
			},
			error: function () {
				alert("修改课程失败!");
			}
		})
	})
	//点击事件
	$("#modify-course-modal").modal('show');
}
function deleteCourse(courseCode,obj){
	$("#delete-confirm-course-Name").html($(obj).parents("tr").find("td:eq(1)").html());
	$(".delete-course-modal-body div").css({
		"font-size":"16px",
		"display":"inline-block",
		"margin":"20px"});
	$("#delete-course-confirm").on("click",function(){
		var path = window.location.href;
		var param = {"courseCode":$(obj).parents("tr").find("td:eq(0)").html()};
		$.ajax({
			url:path.substr(0,path.lastIndexOf("/"))+"/deleteCourse",
			data:param,
			type:"POST",
			success:function (data) {
				if (data.status == "true") {
					alert("删除课程成功!");
					window.location.reload();
//					initCourseList();
				}
				if (data.status == "error") {
					alert(data.msg);
				}
			},
			error: function () {
				alert("删除课程失败!");
			}
		})
	})
	$("#delete-course-modal").modal('show');
}
function notSelectCourse(courseCode,obj){
	$("#not-select-confirm-course-Name").html($(obj).parents("tr").find("td:eq(1)").html());
	$(".not-select-course-modal-body div").css({
		"font-size":"16px",
		"display":"inline-block",
		"margin":"20px"});
	$("#not-select-course-confirm").on("click",function(){
		var param = {};
		var path = window.location.href;
		param.userAccount = userPermission.userAccount;
		param.courseCode = courseCode;
		$.ajax({
			url:path.substr(0,path.lastIndexOf("/"))+"/notSelectCourse",
			data:param,
			type:"POST",
			success:function (data) {
				if (data.status == "true") {
					alert("取消选课成功!");
					window.location.reload();
//					initCourseList();
				}
				if (data.status == "error") {
					alert(data.msg);
				}
			},
			error: function () {
				alert("取消选课失败!");
			}
		})
	})
	$("#not-select-course-modal").modal('show');
}
function selectCourse(courseCode,obj){
	$("#select-confirm-course-Name").html($(obj).parents("tr").find("td:eq(1)").html());
	$(".select-course-modal-body div").css({
		"font-size":"16px",
		"display":"inline-block",
		"margin":"20px"});
	var path = window.location.href;
	$("#select-course-confirm").on("click",function(){
		var param = {};
		param.userAccount = userPermission.userAccount;
		param.courseCode = courseCode;
		param.score = $(obj).parents("tr").find("td:eq(5)").html();
		$.ajax({
			url:path.substr(0,path.lastIndexOf("/"))+"/selectCourse",
			data:param,
			type:"POST",
			success:function (data) {
				if (data.status == "true") {
					alert("选课成功!");
					window.location.reload();
//					initCourseList();
				}
				if (data.status == "error") {
					alert(data.msg);
				}
			},
			error: function () {
				alert("选课失败!");
			}
		})
	})
	$("#select-course-modal").modal('show');
}
