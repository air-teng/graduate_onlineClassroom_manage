$(function(){
	preInitResourceTable();
	bindSourceOperationClick();
		
})
function bindSourceOperationClick(){
	$("#source-upload-confirm").on("click",function(){
		var formData = new FormData();
        var param = document.getElementById("learning_resource").files[0];
        if(param == undefined){
        	alert("请选择要上传的文件");
        	return ;
        }
       /* if(document.getElementById("learning_resource").files[0].length > 10240*1024){
        	alert("文件大小不能超过10MB");
        	return ;
        }*/
        formData.append("learningResource", document.getElementById("learning_resource").files[0]); 
        formData.append("resourceIntroduction",$("#resource_introduction").val());
        $.ajax({
            url: "classroom/-1/sourceUpload",
            type: "POST",
            data: formData,
            /**
            *必须false才会自动加上正确的Content-Type
            */
            contentType: false,
            /**
            * 必须false才会避开jQuery对 formdata 的默认处理
            * XMLHttpRequest会对 formdata 进行正确的处理
            */
            processData: false,
            success: function (data) {
                if (data.status == "true") {
                    alert("上传成功！");
                    window.location.reload();
                }
                if (data.status == "error") {
                    alert(data.msg);
                }
            },
            error: function () {
                alert("上传失败!请确认上传的文件大小不超过10MB!");
            }
        });
	})
}
function preInitResourceTable(){
	$.ajax({
		url:"classroom/-1/getResourceInfo",
		type:"post",
		success:function(res){
			if(res.status == "true"){
				initResourceTable(res.object);
				$("#study-source-list").dataTable();
			}else{
				alert("资料信息获取失败!");
			}
		},
		error:function(res){
			alert(res.msg);
		}
	});
}
function initResourceTable(resourceInfoList){
	if(resourceInfoList==null){
		return ;
	}
	$("#study-source-list").find("tbody").html("");
	for(var i=0;i<resourceInfoList.length;i++){
		var trElem = '';
		trElem += 
			'<tr>'+
			'<td>'+(i+1)+'</td>'+
			'<td>'+resourceInfoList[i].resourceName+'</td>'+
			'<td>'+resourceInfoList[i].resourceType+'</td>'
		if(resourceInfoList[i].fileSize>1000*1000){
			var sizeOfFile = parseFloat((resourceInfoList[i].fileSize*1.0)/(1024*1024));
			trElem += '<td>'+sizeOfFile.toFixed(2)+'MB</td>';
		}else{
			var sizeOfFile = parseFloat((resourceInfoList[i].fileSize*1.0)/1024);
			trElem += '<td>'+sizeOfFile.toFixed(1)+'KB</td>';
		}
			
		trElem += 	'<td>'+resourceInfoList[i].resourceIntroduction+'</td>';
		var timeTempVar = dateToDatetimeLocal(resourceInfoList[i].uploadTime);
		trElem += 
		'<td>'+timeTempVar.split("T")[0]+" "+timeTempVar.split("T")[1]+'</td>'+
			'<td>'+resourceInfoList[i].uploadAccount+'</td>';
		
		trElem += '<td>';
		if(resourceInfoList[i].resourceType == "Word" ||
		   resourceInfoList[i].resourceType == "PPT" ||
		   resourceInfoList[i].resourceType == "PDF" ||
		   resourceInfoList[i].resourceType == "Excel" ||
		   resourceInfoList[i].resourceType == "TEXT" ||
		   resourceInfoList[i].resourceType == "Picture" ){//只提供对Word,PPT,Excel和text的预览
			trElem += '<a title="预览" data-source-id='+resourceInfoList[i].sourceId+'><i class="fa fa-eye" aria-hidden="true"><span class="hidden"></span></i></a>';
		}
				
		if(parseInt(userPermission.identificationCode) >= 2){
			trElem += '&nbsp;&nbsp;<a title="下载" href="classroom/-1/sourceDownload?sourceId='+resourceInfoList[i].sourceId+'"><i class="fa fa-download" aria-hidden="true"><span class="hidden"></span></i></a>&nbsp;&nbsp;<a title="删除" onclick="deleteResource('+resourceInfoList[i].sourceId+')"><i class="fa fa-trash-o fa-fw" aria-hidden="true"><span class="hidden"></span></i></a>';
		}else{
			trElem += '&nbsp;&nbsp;<a title="下载" href="classroom/-1/sourceDownload?sourceId='+resourceInfoList[i].sourceId+'"><i class="fa fa-download" aria-hidden="true"><span class="hidden"></span></i></a>';
		}
		
		trElem += '</td></tr>';
		
		$("#study-source-list").find("tbody").append(trElem);
	}
}
function deleteResource(sourceId){
	var r = confirm("你确定删除["+sourceId+"]资料吗？");
	if(!r){
		return ;
	}
	$.ajax({
		url:"classroom/-1/sourceDelete",
		data:{"sourceId":sourceId},
		type:"post",
		success:function(res){
			if(res.status == "true"){
				alert("删除成功");
				window.location.reload();
			}else{
				alert(res.msg);
			}
		},
		error:function(res){
			alert(res.msg);
		}
	});
}
