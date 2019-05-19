$(function(){
	//初始化用户信息呈现
	function initDisplayUserInfo(){
		$(".user-info-display-form").find("span[name='birthday']").html(userPermission.birthday.split("T")[0]);
		$(".user-info-display-form").find("span[name='date_time']").html(userPermission.dateTime.split("T")[0]);
		$(".user-info-display-form").find("textarea[name='personalBio']").html(userPermission.personalBio);
		$(".user-info-display-form").find("span[name='age']").html(userPermission.age);
		$(".user-info-display-form").find("span[name='name']").html(userPermission.name);
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
		$(".user-info-display-form").find("span[name='identification_code']").html(identification);
		if(userPermission.sex == "m"){
			$(".user-info-display-form").find("span[name='sex']").html("男");
		}else{
			$(".user-info-display-form").find("span[name='sex']").html("女");
		}
		$(".user-info-display-form textarea[name='personalBio']").parent("div").css({
			"width":"720px",
		});
		$(".user-info-display-form textarea[name='personalBio']").css({
			"readonly":"readonly",
			"background":"#ccc",
			"height":"100px"
		});
	}
	initDisplayUserInfo();
	//初始化编辑框用户信息
	function initEditUserInfo(){
		//设置属性值
		$(".user-info-present").find("input[name='name']").attr("value",userPermission.name);
		if(userPermission.sex == 'm'){
			$(".user-info-present").find("input[name='sex']").attr("value","男");
		}else{
			$(".user-info-present").find("input[name='sex']").attr("value","女");
		}
		$(".user-info-present").find("input[name='age']").attr("value",userPermission.age);
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
		
		$(".user-info-present").find("input[name='identification']").attr("value",identification);
		$(".user-info-present").find("input[name='createTime']").attr("value",userPermission.dateTime.split("T")[0]);
		$(".user-info-present").find("input[name='birthday']").attr("value",userPermission.birthday.split("T")[0]);
		$(".user-info-present").find("textarea[name='personalBio']").val(userPermission.personalBio);
	}
	//绑定点击事件
	$("#edit-user-info").on("click",function(){
		$("#div-of-user-info").html(
				'<form>'+
            	'<span><strong>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</strong>：<input type="text" name="name"/></span>'+
            	'<span><strong>性别</strong>：<input type="radio" name="edit-sex" value="m"/>男&nbsp;&nbsp;<input type="radio" name="edit-sex" value="f"/>女</span>'+
            	'<br/>'+
            	'<span><strong>生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</strong>：<input type="date" name="birthday"/></span>'+
            	'<span><strong>年龄</strong>：<input type="text" name="age"/></span>'+
            	'<br/>'+
            	'<span><strong>注册时间</strong>：<input type="date" name="createTime"/></span>'+
            	'<span><strong>身份</strong>：<input type="radio" name="identification_code" value="0"/>普通用户&nbsp;&nbsp;<input type="radio" name="identification_code" value="1"/>学生&nbsp;&nbsp;<input type="radio" name="identification_code" value="2"/>老师&nbsp;&nbsp;<input type="radio" name="identification_code" value="3"/>管理员'+
            	'<br/>'+
            	'<span><strong>个人简介</strong>：<br/><textarea cols="20" rows="5" name="personalBio" wrap="hard"></textarea></span>'+
        	    '</form>'+
        	    '<div class="user-info-operation">'+
        	    '<button id="cancel-user-info" type="button">取消</button>&nbsp;&nbsp;'+
            		'<button id="save-user-info" type="button">保存</button>'+
            	'</div>'
		);
		
		if(userPermission.sex == 'm'){
			$("#div-of-user-info input[value='m']").attr("checked",true);
		}else{
			$("#div-of-user-info input[value='f']").attr("checked",true);
		}
		$("#div-of-user-info input[value='"+userPermission.identificationCode+"']").attr("checked",true);
		
		initEditUserInfo();
		//更改日期时同步更新年龄
		$("input[name='birthday']").on("change",function(){
			var nowDate = getNowFormatDate();
			var birthday = $("input[name='birthday']").val();
			$("input[name='age']").val(getAge(birthday,nowDate));
		});
		//保存编辑的内容
		$("#save-user-info").on("click",function(){
			var param = {};
			param.userAccount = userPermission.userAccount;
			param.name = $("input[name='name']").val();
			param.sex = $("input[type='radio']:checked").val();
			param.birthday = $("input[name='birthday']").val();
			param.identificationCode = parseInt($("input[name='identification_code']:checked").val());
			param.age = $("input[name='age']").val();
			param.personalBio = $("textarea[name='personalBio']").val();
			$.ajax({
				url: "editInfo",
				type: "POST",
				data: param,
				success: function (data) {
					if (data.status == "true") {
						alert("修改成功!");
						window.location.reload();
					}
					if (data.status == "error") {
						alert(data.msg);
					}
				},
				error: function () {
					alert("修改失败!");
				}
			})
		});
		//取消保存
		$("#cancel-user-info").on("click",function(){
			window.location.reload();
		})
	});
	//头像上传
	$("#avatar-upload").on("click",function(){
        var formData = new FormData();
        var param = document.getElementById("user_avatar").files[0];
        if(param == undefined){
        	alert("请点击头像区域选择要上传的图片");
        	return ;
        }
        formData.append("userAvatar", document.getElementById("user_avatar").files[0]); 
        
        $.ajax({
            url: "uploadAvatar",
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
                alert("上传失败!请确认上传的图片大小不超过10MB!");
            }
        });
    });
	//头像上传输入框显示
	$("#avatar_select").on("click",function(){
		$("#user_avatar").css("display","inline");
		$("#user_avatar").click();
	});
	//头像下载
	$("#avatar-download").on("click",function(){
		var formData = new FormData();
		$.ajax({
			url: "echoAvatar",
			type: "GET",
			success: function (data) {
				if (data.status == "true") {
					alert("下载成功！");
				}
				if (data.status == "error") {
					alert(data.msg);
				}
			},
			error: function () {
				alert("下载失败！");
			}
		});
	});
})