var mDefaultServerAddr = "172.28.198.5";		// 默认服务器地址
var mDefaultServerPort = 8906;					// 默认服务器端口号
var mSelfUserId = -1; 							// 本地用户ID
var mTargetUserId = -1;							// 目标用户ID（请求了对方的音视频）
var mRefreshVolumeTimer = -1; 					// 实时音量大小定时器
var mRefreshPluginTimer = -1;					// 检查插件是否安装完成定时器

/*初始化直播课堂*/
function initOnlineClassroom(){
	//获取浏览器信息
	var ua = window.navigator.userAgent.toLowerCase();
	var info = {
	        edge: /edge/.test(ua)
	};
	if(info.edge) {
		$("#online-classroom-body").html(
				'<div><h1>本服务暂不支持Edge浏览器,建议您换一个浏览器进行访问</h1></div>'
		);
	}else{
		//设定一个等待时间，在该等待时间之后再执行下面的代码
		setTimeout(function(){
			//如果有插件，将新安装的插件使能
			if (navigator.plugins && navigator.plugins.length) {
    			window.navigator.plugins.refresh(false);
    		}
			//初始化插件
			var NEED_ANYCHAT_APILEVEL = 0;
			var errorcode = BRAC_InitSDK(NEED_ANYCHAT_APILEVEL);//默认的初始化APILEVEL为0
			
			if(errorcode == GV_ERR_SUCCESS){//初始化成功，返回值为0
				console.log("插件初始化成功...");
				if(mRefreshPluginTimer != -1) {
					console.log("关闭插件安装检测定时器...");
					clearInterval(mRefreshPluginTimer); 	//清除插件安装检测定时器
					$("#need-to-install").css({"display":"none"});
					$("#too-low-need-to-upgrade").css({"display":"none"});
				}
				//呈现登录页面
				var path = window.location.href;
				if(userPermission.userAccount == path.split("/")[6].split("-")[0]){
					$("#login-gate").find("a").attr("data-username",userPermission.name+"_teacher");
				}else{
					$("#login-gate").find("a").attr("data-username",userPermission.name+"_stu");
				}
				$("#login-gate").css({"display":"block"});
				initLoginBtn();//初始化登录按钮
			}else{//初始化失败
				console.log("插件初始化失败...,errorcode="+errorcode);
				if(errorcode == GV_ERR_PLUGINNOINSTALL){
					$("#need-to-install").css({"display":"block"});
				}else if(errorcode == GV_ERR_PLUGINOLDVERSION){
					$("#too-low-need-to-upgrade").css({"display":"block"});
				}
				
				//隔1s再次调本函数，检测插件是否成功安装，直到成功安装为止
				if(mRefreshPluginTimer == -1) {
					console.log("开启插件安装检测定时器...");
    				mRefreshPluginTimer = setInterval(function(){ initOnlineClassroom(); }, 1000);
    			}
			}
		},500);
	}
}
//初始化登录按钮
function initLoginBtn(){
	$("#login-gate").on("click",function(){
		var userAccount = $(this).find("a").attr("data-username");
		var password = "12345678";
		//设置用户名，密码，服务器地址和端口到cookie里面
		setCookie('username',userAccount,30);
//		setCookie('password',password,30);
	    setCookie('ServerAddr',mDefaultServerAddr,30);
	    setCookie('ServerPort',mDefaultServerPort,30);
	    
	    //更换页面
	    $("#login-gate").css({"display":"none"});
	    $("#login-waiting").css({"display":"block"});
	    
	    //连接服务器
	    console.log("开始服务器连接...");
	    var errorcode= BRAC_Connect(mDefaultServerAddr,parseInt(mDefaultServerPort));
	    console.log("服务器连接结果,errorcode="+errorcode);
	    
	    console.log("开始登录...");
	    errorcode = BRAC_Login(userAccount, password, 0);
	    console.log("登录结果,errorcode="+errorcode);
	});
}
//设置cookie
function setCookie(c_name, value, expiredays){
　　 var exdate = null;
    exdate=new Date();
　　 exdate.setDate(exdate.getDate() + expiredays);
　	document.cookie=c_name+ "=" + value + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

//在主页面绑定点击事件
function bondClickOnMainPage(){
	//退出系统
	$("#ExitSystemBtn").on("click",function(){
		var errorcode = BRAC_Logout();
		console.log("退出系统，errorcode = "+errorcode);
		//呈现登录页面
		if(userPermission.userAccount == path.split("/")[6].split("-")[0]){
			$("#online-classroom-body").html(
					'<div id="login-gate"><a data-username="'+userPermission.name+'_teacher" style="font-size:30px;margin:5em;cursor:pointer;"><i class="fa fa-hand-o-right"></i>进入课堂</a></div>'
			);
		}else{
			$("#online-classroom-body").html(
					'<div id="login-gate"><a data-username="'+userPermission.name+'_stu" style="font-size:30px;margin:5em;cursor:pointer;"><i class="fa fa-hand-o-right"></i>进入课堂</a></div>'
			);
		}
	})
	
	
}
//进入房间的方法
function EnterRoomRequest(roomid){
	var errorcode = BRAC_EnterRoom(roomid,"",0);
	console.log("进入房间"+roomid+",errorcode = "+errorcode);
}
//对列表中的用户进行添加、删除操作
function RoomUserListControl(userid, bInsert) {
    var userlist = $("#room_div_userlist");
    if (bInsert) {
        var itemdiv = document.createElement("div");
        itemdiv.setAttribute("class", "UserListStyle");
        itemdiv.id = userid + "_UserDiv";

        // 判断用户摄像头状态
        if (BRAC_GetCameraState(userid) == 0)
            AddImage(itemdiv, userid + "_CameraTag", "CameraTag", "", userid); // 添加摄像头图片<img>标签
        if (BRAC_GetCameraState(userid) == 1)
            AddImage(itemdiv, userid + "_CameraTag", "CameraTag", "./images/advanceset/camera_false.png", userid); // 添加摄像头图片<img>标签
        if (BRAC_GetCameraState(userid) == 2)
            AddImage(itemdiv, userid + "_CameraTag", "CameraTag", "./images/advanceset/camera_true.png", userid); // 添加摄像头图片<img>标签
        // 判断当前ID是否为自己
        if (userid == mSelfUserId) {
            AddImage(itemdiv, mSelfUserId + "_MicrophoneTag", "mSelfMicrophoneTag", "./images/advanceset/microphone_true.png", userid); // 添加话筒图片<img>标签
            itemdiv.innerHTML += "&nbsp" + BRAC_GetUserName(mSelfUserId) + "(自己)";
        } else {
            AddImage(itemdiv, userid + "_MicrophoneTag", "MicrophoneTag", "./images/advanceset/microphone_false.png", userid); // 添加话筒图片<img>标签
            // 添加用户姓名<a>标签
            var a = document.createElement("a");
            a.id = userid + "_UserTag";
            a.title = BRAC_GetUserName(userid);
            a.innerHTML = BRAC_GetUserName(userid);
            a.href = "javascript:RequestOtherUserVideo(" + userid + ")";
            itemdiv.appendChild(a);
        }
        $("#room_div_userlist").append(itemdiv);
        MicrophoneOnclick(mSelfUserId);
    } else {
        var my = $("#"+userid + "_UserDiv");
        userlist.removeChild(my);
    }
}
function showRoomPage(){
	//页面为房间页面
	$("#online-classroom-body").html(
			'<div id="hall_div">'+
	        '	<div style="width:610px; height:25px;cursor:pointer;"><div id="ExitSystemBtn">×关闭</div></div>'+
		    '   <div id="hall_div_table">'+
	        '      <div style="height:133px;">'+
	        '           <div class="hall_div_table_room" id="hall_div_table_room1" onclick="EnterRoomRequest(1)">房间1</div>'+
	        '           <div class="hall_div_table_room" id="hall_div_table_room2" onclick="EnterRoomRequest(2)">房间2</div>'+
	        '           <div class="hall_div_table_room" id="hall_div_table_room3" onclick="EnterRoomRequest(3)">房间3</div>'+
	        '           <div class="hall_div_table_room" id="hall_div_table_room4" onclick="EnterRoomRequest(4)">房间4</div>'+
	        '           <div class="hall_div_table_room" id="hall_div_table_room4" onclick="EnterRoomRequest(654)">房间654</div>'+
	        '           <div class="hall_div_table_room" id="hall_div_table_room4" onclick="EnterRoomRequest(845)">房间845</div>'+
	        '           <div class="hall_div_table_room" id="hall_div_table_room4" onclick="EnterRoomRequest(781)">房间781</div>'+
	        '       </div>'+
	        '   </div>'+
	        '</div>'
	);
	bondClickOnMainPage();//在主页面绑定点击事件
}

//打开指定用户的音视频
function RequestOtherUserVideo(userid) {
	// 判断是否需要关闭之前已请求的用户音视频数据
    if (mTargetUserId != -1) {
		reVideoDivSize();
        BRAC_UserCameraControl(mTargetUserId, 0);
        BRAC_UserSpeakControl(mTargetUserId, 0);
    }
    mTargetUserId = userid; 					//设置被点用户ID为全局变量
    BRAC_UserCameraControl(userid, 1); 		// 请求对方视频
    BRAC_UserSpeakControl(userid, 1); 		// 请求对方语音
    // 设置远程视频显示位置
    BRAC_SetVideoPos(userid, document.getElementById("AnyChatRemoteVideoDiv"), "ANYCHAT_VIDEO_REMOTE");
    //为当前用户的话筒添加点击事件
    //TODO
}
//恢复显示视频div大小
function reVideoDivSize() {
	var divWidth=GetID("AnyChatRemoteVideoDiv").offsetWidth;
	var divHeight=GetID("AnyChatRemoteVideoDiv").offsetHeight;
	if(divWidth<divHeight){
		GetID("AnyChatRemoteVideoDiv").style.width=(4.0/3*divHeight)+"px";
		GetID("AnyChatRemoteVideoDiv").style.height=divHeight+"px";
	}
}
//自定义函数
function GetID(id) {
	if (document.getElementById) {
		return document.getElementById(id);
	} else if (window[id]) {
		return window[id];
	}
	return null;
}
//将学生的账号名加入名单列表
function addToOrder(userid){
	var userName = BRAC_GetUserName(userid);
	var $obj = $("#student_online_display").find("div:last-child");
	if($obj.length == 0){
		$("#student_online_display").append(
			'<div></div>'
		);
		//关闭所有通话
		$("#student_online_display").children("div:last-child").append(
				'<div onmouseover="onmouseoverChange(this)" onmouseout="onmouseoutChange(this)" onclick="CloseOtherUserVideo()"><i class="fa fa-ban"></i></div>'
		);
		$("#student_online_display").children("div:last-child").append(
				'<div id="student_'+userid+'" onmouseover="onmouseoverChange(this)" onmouseout="onmouseoutChange(this)" onclick="RequestOtherUserVideo('+userid+')">'+userName+'</div>'
		);
	}else{
		var count = $("#student_online_display").find("div:last-child").children('div').length;
		if(count >= 8){
			$("#student_online_display").append(
					'<div></div>'
			);
			$("#student_online_display").children("div:last-child").append(
					'<div id="student_'+userid+'" onmouseover="onmouseoverChange(this)" onmouseout="onmouseoutChange(this)" onclick="RequestOtherUserVideo('+userid+')">'+userName+'</div>'
			);
		}else{
			$("#student_online_display").children("div:last-child").append(
					'<div id="student_'+userid+'" onmouseover="onmouseoverChange(this)" onmouseout="onmouseoutChange(this)" onclick="RequestOtherUserVideo('+userid+')">'+userName+'</div>'
			);
		}
	}
}
function onmouseoverChange(obj){
	$(obj).css({
		"background":"#D0A871"
	});
}
function onmouseoutChange(obj){
	$(obj).css({
		"background":"#9335ca"
	});
}
function CloseOtherUserVideo(){
	reVideoDivSize();
    BRAC_UserCameraControl(mTargetUserId, 0);
    BRAC_UserSpeakControl(mTargetUserId, 0);
    mTargetUserId = 0;
}
