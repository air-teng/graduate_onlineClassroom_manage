$(function(){
	//初始化页面标题点击效果
	initCurrentPageClick();
	//初始化客观题类型切换效果
	initObjectTypeShift();
	$("#homework-list-table").dataTable();
	$("#finished-or-modified-table").dataTable();
	$("#homework-list-to-submit-table").dataTable();
	$("#homework-list-to-modify-table").dataTable();
	//定义选择题点击事件
	$(".homework-exercise-problem-row-object .chooice-item").on("click",function(){
		$(this).parents("div").siblings().find("label").css({"background-color":"#fff"});
		$(this).css({"background-color":"#000"});
	});
})
function initCurrentPageClick(){
	$("#card-header-ul-li").on("click","li",function(){
		var valueType = $(this).val();
		
		$("#object-create,#subject-create,#homework-list,#homework-operation,#homework-list-finished-or-modified").css({"display":"none"});
		$("#card-header-ul-li li").css({"background":"#f8f9fa"})
		
		if(valueType == '1'){
			$("#object-create").css({"display":"block"});
			$("#card-header-ul-li li[value='1']").css({"background":"#08c"});
		}else if(valueType == '2'){
			$("#subject-create").css({"display":"block"});
			$("#card-header-ul-li li[value='2']").css({"background":"#08c"});
		}else if(valueType == '3'){
			$("#homework-list").css({"display":"block"});
			$("#card-header-ul-li li[value='3']").css({"background":"#08c"});
		}else if(valueType == '4'){
			$("#homework-list-finished-or-modified").css({"display":"block"});
			$("#card-header-ul-li li[value='4']").css({"background":"#08c"});
		}
		else if(valueType == '5'){
			if(userPermission.identificationCode >= 2){
				$("#homework-list-to-modify").css({"display":"block"});
			}else{
				$("#homework-list-to-submit").css({"display":"block"});
			}
			$("#card-header-ul-li li[value='5']").css({"background":"#08c"});
		}
	})
}
function submitHomeWork(){
	if(userPermission.identificationCode >= 2){
		$("#homework-list-to-modify").css({"display":"none"});
	}else{
		$("#homework-list-to-submit").css({"display":"none"});
	}
	$("#homework-operation").css({"display":"block"});
}
function initObjectTypeShift(){
	
	$("#exercise-problem-type").on("change",function(){
		var objectProblemType = $("#exercise-problem-type").find("option:selected").val();
		$("#type_of_ab,#type_of_abc,#type_of_abcd").css({"display":"none"});
		$("#type_of_ab_answer,#type_of_abc_answer,#type_of_abcd_answer").css({"display":"none"});
		if(objectProblemType == "0"){
			$("#type_of_ab").css({"display":"block"});
			$("#type_of_ab_answer").css({"display":"block"});
		}else if(objectProblemType == "1"){
			$("#type_of_abc").css({"display":"block"});
			$("#type_of_abc_answer").css({"display":"block"});
		}else if(objectProblemType == "2"){
			$("#type_of_abcd").css({"display":"block"});
			$("#type_of_abcd_answer").css({"display":"block"});
		}
	})
}