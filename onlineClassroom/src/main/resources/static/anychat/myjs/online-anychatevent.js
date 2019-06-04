
/********************************************
 *				事件回调部分				*
 *******************************************/
 
 // 异步消息通知，包括连接服务器、登录系统、进入房间等消息
function OnAnyChatNotifyMessage(dwNotifyMsg, wParam, lParam) {
	switch(dwNotifyMsg) {
		case WM_GV_CONNECT:			OnAnyChatConnect(wParam, lParam);			break;
		case WM_GV_LOGINSYSTEM:		OnAnyChatLoginSystem(wParam, lParam);		break;
		case WM_GV_ENTERROOM:		OnAnyChatEnterRoom(wParam, lParam);			break;
		case WM_GV_ONLINEUSER:		OnAnyChatRoomOnlineUser(wParam, lParam);	break;
		case WM_GV_USERATROOM:		OnAnyChatUserAtRoom(wParam, lParam);		break;
		case WM_GV_LINKCLOSE:		OnAnyChatLinkClose(wParam, lParam);			break;
		case WM_GV_MICSTATECHANGE:	OnAnyChatMicStateChange(wParam, lParam);	break;
		case WM_GV_CAMERASTATE:		OnAnyChatCameraStateChange(wParam, lParam);	break;
		case WM_GV_P2PCONNECTSTATE:	OnAnyChatP2PConnectState(wParam, lParam);	break;
		case WM_GV_PRIVATEREQUEST:	OnAnyChatPrivateRequest(wParam, lParam);	break;
		case WM_GV_PRIVATEECHO:		OnAnyChatPrivateEcho(wParam, lParam);		break;
		case WM_GV_PRIVATEEXIT:		OnAnyChatPrivateExit(wParam, lParam);		break;
		case WM_GV_USERINFOUPDATE:	OnAnyChatUserInfoUpdate(wParam, lParam);	break;
		case WM_GV_FRIENDSTATUS:	OnAnyChatFriendStatus(wParam, lParam);		break;
		case WM_GV_VIDEOSIZECHG:	OnAnyChatVideoSizeChange(wParam, lParam);	break;
		default:
			break;
	}
}

// 收到文字消息
function OnAnyChatTextMessage(dwFromUserId, dwToUserId, bSecret, lpMsgBuf, dwLen) {
	if(lpMsgBuf == 'ask' || lpMsgBuf == 'answer' || lpMsgBuf == 'active'){
		if(/_teacher$/.test(BRAC_GetUserName(mSelfUserId))){
			if(lpMsgBuf == 'ask'){
//				$("#student_"+dwFromUserId+"").css({"background":"blue"});
				var i=1;
				var timer = setInterval(function(){
					i++;
					if(i==20){
						$("#student_"+dwFromUserId+"").css({"background":"#fff"});
						clearInterval(timer);
						return;
					}
				    if(i%2==0){
				    	$("#student_"+dwFromUserId+"").css({"background":"blue"});
				    } else if(i%2==1){
				    	$("#student_"+dwFromUserId+"").css({"background":"#fff"});
				    }
				},500);
				$("#student_"+dwFromUserId+"").css({"background":"#fff"});
			}else if(lpMsgBuf == 'answer'){
				var i=1;
				var timer = setInterval(function(){
					i++;
					if(i==20){
						$("#student_"+dwFromUserId+"").css({"background":"#fff"});
						clearInterval(timer);
						return;
					}
				    if(i%2==0){
				    	$("#student_"+dwFromUserId+"").css({"background":"red"});
				    } else if(i%2==1){
				    	$("#student_"+dwFromUserId+"").css({"background":"#fff"});
				    }
				},500);
			}else if(lpMsgBuf == 'active'){
				$("#student_"+dwFromUserId+"").css({"background":"green"});
				var i = 1;
				var timer = setInterval(function(){
					i++;
					if(i==20){
						$("#student_"+dwFromUserId+"").css({"background":"#fff"});
						clearInterval(timer);
					}
				},500);
			}
		}
		return;
	}
	var name = BRAC_GetUserName(dwFromUserId);
	var curDate = dateToDetaiTime(new Date());
	$("#interactive-body-msg").append(
			'<div class="row">'+
      		'	<div class="row-name">'+name.substr(0,name.indexOf("_teacher"))+':</div>'+
      		'	<div class="row-msg">'+message+'</div>'+
      		'	<div class="row-time" style="margin-left:10em;float:right;font-family:Times New Roman;">'+curDate+'</div>'+
      		'</div>'
	);
	$("#interactive-body-msg").scrollTop($("#interactive-body-msg")[0].scrollHeight);
}

// 收到透明通道传输数据
function OnAnyChatTransBuffer(dwUserId, lpBuf, dwLen) {

}

// 收到透明通道（扩展）传输数据
function OnAnyChatTransBufferEx(dwUserId, lpBuf, dwLen, wParam, lParam, dwTaskId) {

}

// 文件传输完成通知
function OnAnyChatTransFile(dwUserId, lpFileName, lpTempFilePath, dwFileLength, wParam, lParam, dwTaskId) {

}

// 系统音量改变通知
function OnAnyChatVolumeChange(device, dwCurrentVolume) {

}

// 收到服务器发送的SDK Filter数据
function OnAnyChatSDKFilterData(lpBuf, dwLen) {

}

// 收到录像或拍照完成事件
function OnAnyChatRecordSnapShot(dwUserId, lpFileName, dwParam, dwFlags) {
	
}

// 收到录像或拍照完成事件（扩展）
function OnAnyChatRecordSnapShotEx(dwUserId, lpFileName, dwElapse, dwFlags, dwParam, lpUserStr) {

}

// 收到录像或拍照完成事件（扩展2：增加errorcode）
function OnAnyChatRecordSnapShotEx2(dwUserId, dwErrorCode, lpFileName, dwElapse, dwFlags, dwParam, lpUserStr) {
	
}

// AnyChatCoreSDK异步事件
function OnAnyChatCoreSDKEvent(dwEventType, lpEventJsonStr) {
	
}

/********************************************
 *		AnyChat SDK核心业务流程				*
 *******************************************/
 
// 客户端连接服务器，bSuccess表示是否连接成功，errorcode表示出错代码
function OnAnyChatConnect(bSuccess, errorcode) {
	console.debug("连接服务器回调函数执行，errorcode = "+errorcode);
}

//客户端登录系统，dwUserId表示自己的用户ID号，errorcode表示登录结果：0 成功，否则为出错代码，参考出错代码定义
function OnAnyChatLoginSystem(dwUserId, errorcode) {
	console.debug(dwUserId+"登录系统服务器回调函数执行，errorcode = "+errorcode);
	if(errorcode == 0){
		mSelfUserId = dwUserId;//更新本地用户的ID
		console.debug("登入房间"+path.split("/")[6]+"-"+path.split("/")[8]);
		EnterRoomRequest(path.split("/")[6]+"-"+path.split("/")[8]);
	}else{
		$("#online-classroom-body").html(
				'<h1>登录失败！请重试</h1>'		
		);
	}
}
//客户端进入房间，dwRoomId表示所进入房间的ID号，errorcode表示是否进入房间：0成功进入，否则为出错代码
function OnAnyChatEnterRoom(dwRoomId, errorcode) {
	console.log("进入房间回调函数执行，errorcode = "+errorcode);
	if(errorcode == 0){
		$("#login-waiting").css({"display":"none"});
	/*	if(usePermission.identificationCode<2){
			$("#online-interactive").css({"display":"block"});
		}*/
//		$("#online-interactive").css({"display":"block"});
		$("#room_div").css({"display":"block"});
		//绑定退出房间点击事件
		$("#leaveroom").on("click",function(){
			var errorcode = BRAC_LeaveRoom(-1);
			console.log("退出房间,errorcode="+errorcode);
			if(mRefreshVolumeTimer != -1)
				clearInterval(mRefreshVolumeTimer); // 清除实时音量显示计时器
			mTargetUserId = -1;
			/*$("#online-classroom-body").html(
					'<div id="login-gate"><a data-username="'+userPermission.name+'_stu" style="font-size:30px;margin:5em;cursor:pointer;"><i class="fa fa-hand-o-right"></i>进入课堂</a></div>'
			);
			$("#screen_share_for_teacher").css({"width":"0.1px","height":"0.1px"});
			$("#ScreenShareWindowDiv").css({"width":"0.1px","height":"0.1px"});
			$("#remote-screen-div").css({"display":"none"});*/
			window.location.reload();
		});
		//绑定开启或关闭本地音频
		$("#open-or-close-local-microphone").on("click",function(){
			if($(this).html() == '<i class="fa fa-microphone"></i>'){
				BRAC_UserSpeakControl(mSelfUserId, 0);//关闭语音
				$(this).html('<i class="fa fa-microphone-slash"></i>');
			}else{
				BRAC_UserSpeakControl(mSelfUserId, 1);//开启语音
				$(this).html('<i class="fa fa-microphone"></i>');
			}
		});
		//绑定开启或关闭远程音频
		$("#open-or-close-remote-microphone").on("click",function(){
			if($(this).html() == '<i class="fa fa-microphone"></i>'){
				BRAC_UserSpeakControl(mTargetUserId, 0);//关闭语音
				$(this).html('<i class="fa fa-microphone-slash"></i>');
			}else{
				BRAC_UserSpeakControl(mTargetUserId, 1);//开启语音
				$(this).html('<i class="fa fa-microphone"></i>');
			}
		});
		/**
		 * 打开摄像头和语音采集设备
		 * 
		 */
		//打开屏幕共享采集设备
		if(/_teacher$/.test(BRAC_GetUserName(mSelfUserId))){//老师
			BRAC_SetSDKOption(BRAC_SO_CORESDK_SCREENCAMERACTRL, 1);
		}
		
		console.log("打开本地视频...");
//	    BRAC_UserCameraControl(mSelfUserId, 1); 	// 打开本地视频
		BRAC_UserCameraControlEx(mSelfUserId,1,0,0,"");//打开本地视频
		if(/_teacher$/.test(BRAC_GetUserName(mSelfUserId))){//老师
			BRAC_SetUserStreamInfo(-1,1,BRAC_SO_LOCALVIDEO_BITRATECTRL,1000*1000);//本地视频编码码率设置（参数为int型，单位bps，同服务器配置：VideoBitrate）
			BRAC_SetUserStreamInfo(-1,1,BRAC_SO_LOCALVIDEO_QUALITYCTRL,16);//质量因子
			BRAC_SetUserStreamInfo(-1,1,BRAC_SO_LOCALVIDEO_GOPCTRL,25);//关键帧的间距
			BRAC_SetUserStreamInfo(-1,1,BRAC_SO_LOCALVIDEO_PRESETCTRL,5);//预设参数
			BRAC_SetUserStreamInfo(-1,1,BRAC_SO_LOCALVIDEO_WIDTHCTRL,1200);//本地视频采集分辨率宽度控制（参数为int型，同服务器配置：VideoWidth）
			BRAC_SetUserStreamInfo(-1,1,BRAC_SO_LOCALVIDEO_HEIGHTCTRL,1000);//本地视频采集分辨率高度控制（参数为int型，同服务器配置：VideoHeight）
			BRAC_SetUserStreamInfo(-1,1,BRAC_SO_LOCALVIDEO_FPSCTRL,25);//// 本地视频编码帧率控制（参数为int型，同服务器配置：VideoFps）
			BRAC_SetUserStreamInfo(-1,1,BRAC_SO_LOCALVIDEO_APPLYPARAM,1);//应用本地视频编码参数，使得前述修改即时生效（参数为int型：1 使用新参数，0 使用默认参数）
			BRAC_UserCameraControlEx(mSelfUserId,1,1,0,"");//打开桌面共享
		}
		
	    
		console.log("打开本地视频完毕");
		console.log("打开本地语音...");
	    BRAC_UserSpeakControl(mSelfUserId, 1); 		// 打开本地语音
		console.log("打开本地语音完毕");
	    
		// 设置本地视频显示位置
		//    BRAC_SetVideoPos(mSelfUserId, document.getElementById("AnyChatLocalVideoDiv"), "ANYCHAT_VIDEO_LOCAL");
	    // 设置远程视频显示位置（没有关联到用户，只是占位置）
	    BRAC_SetVideoPos(0, document.getElementById("AnyChatRemoteVideoDiv"), "ANYCHAT_VIDEO_REMOTE");
		BRAC_SetVideoPosEx(mSelfUserId, document.getElementById("AnyChatLocalVideoDiv"), "AnyChatLocalVideoDiv"+0,0,"");// 设置本地视频显示位置（插件id由自己来定义，主要是通过视频流来唯一识别）
		if(/_teacher$/.test(BRAC_GetUserName(mSelfUserId))){//老师
			BRAC_SetVideoPosEx(0, document.getElementById("ScreenShareWindowDiv"), "AnyChatLocalVideoDiv"+1,1,"");// 设置桌面共享显示位置
			$("#screen_share_for_teacher").css({"width":"0.1px","height":"0.1px"});
			$("#ScreenShareWindowDiv").css({"width":"0.1px","height":"0.1px"});
			$("#remote-screen-div").css({"width":"0.1px","height":"0.1px"});
		}else{
			BRAC_SetVideoPosEx(0, document.getElementById("ScreenShareWindowDiv"), "AnyChatLocalVideoDiv"+1,1,"");// 设置桌面共享显示位置(占位置)
			$("#remote-screen-div").css({"display":"block"});
		}
	    //显示音量的变化
	    mRefreshVolumeTimer = setInterval(function () {
	    	document.getElementById("LocalAudioVolume").style.width = document.getElementById("AnyChatLocalVideoDiv").offsetHeight * BRAC_QueryUserStateInt(mSelfUserId, BRAC_USERSTATE_SPEAKVOLUME) / 100 + "px";
			if(mTargetUserId != -1)
				document.getElementById("RemoteAudioVolume").style.width = document.getElementById("AnyChatRemoteVideoDiv").offsetHeight * BRAC_QueryUserStateInt(mTargetUserId, BRAC_USERSTATE_SPEAKVOLUME) / 100 + "px";
			else
				document.getElementById("RemoteAudioVolume").style.width = "0px";
	    }, 100);
		}
		/**
		 * 打开摄像头和语音采集设备
		 * 
		 */
		
}

//收到当前房间的在线用户信息，进入房间后触发一次，dwUserCount表示在线用户数（包含自己），dwRoomId表示房间ID
function OnAnyChatRoomOnlineUser(dwUserCount, dwRoomId) {
	var useridlist = BRAC_GetOnlineUser();//获取当前房间的在线用户信息
	//打印日志
	var logStr = "首次进入房间的回调函数，收到当前房间的在线用户信息";
	for (var i = 0; i < useridlist.length; i++) {
		logStr += ","+useridlist[i];
    }
	console.log(logStr);
	
	if(!/_teacher$/.test(BRAC_GetUserName(mSelfUserId))){//学生
		for (var i = 0; i < useridlist.length; i++) {
			if(/_teacher$/.test(BRAC_GetUserName(useridlist[i]))){
				RequestOtherUserVideo(useridlist[i]);//请求视频和语言信息
				BRAC_UserCameraControlEx(useridlist[i],1,1,0,"");//打开老师的桌面共享
				BRAC_SetVideoPosEx(useridlist[i], document.getElementById("ScreenShareWindowDiv"), "AnyChatLocalVideoDiv"+1,1,"");// 请求老师的桌面共享信息
				break;
			}
	    }
	}else{//老师
		/*$("#room_div_close").append(
			'<div id="student_online_display" style="margin-top:20px;width:855;height:auto;"></div>'
		);*/
		for(var i=0;i<useridlist.length;i++){
			addToOrder(useridlist[i]);
		}
	}
}

//用户进入（离开）房间，dwUserId表示用户ID号，bEnterRoom表示该用户是进入（1）或离开（0）房间
//这是检测其他用户进入房间，彼时当前用户已经在房间里面了
function OnAnyChatUserAtRoom(dwUserId, bEnterRoom) {
	console.log(dwUserId+(bEnterRoom==1?"进入":"离开"));
	if(!/_teacher$/.test(BRAC_GetUserName(mSelfUserId))){//学生
		if (bEnterRoom == 1) {//当前用户进入
				if(mTargetUserId == -1 && /_teacher$/.test(BRAC_GetUserName(dwUserId))){	// 没有与老师完成连线且当前用户为老师
					RequestOtherUserVideo(dwUserId);
					BRAC_UserCameraControlEx(dwUserId,1,1,0,"");//打开老师的桌面共享
					BRAC_SetVideoPosEx(dwUserId, document.getElementById("ScreenShareWindowDiv"), "AnyChatLocalVideoDiv"+1,1,"");// 请求老师的桌面共享信息
				}
		 }else{//当前用户离开
			 if (dwUserId == mTargetUserId && /_teacher$/.test(BRAC_GetUserName(dwUserId))) {	// 老师离开才会管
				    reVideoDivSize();//恢复对方头像显示屏幕的大小
					mTargetUserId = -1;
					BRAC_SetVideoPos(0, document.getElementById("AnyChatRemoteVideoDiv"), "ANYCHAT_VIDEO_REMOTE");
					BRAC_SetVideoPosEx(0, document.getElementById("ScreenShareWindowDiv"), "AnyChatLocalVideoDiv"+1,1,"");// 请求老师的桌面共享信息关闭
			 }
		 }
	}else{//老师
		if (bEnterRoom == 1) {//当用户进入
			addToOrder(dwUserId);//加入列表
		}else{//用户离开
			if (dwUserId == mTargetUserId){
				reVideoDivSize();//恢复对方头像显示屏幕的大小
				mTargetUserId = -1;
				BRAC_SetVideoPos(0, document.getElementById("AnyChatRemoteVideoDiv"), "ANYCHAT_VIDEO_REMOTE");
			}
			$("#student_"+dwUserId).remove();
		}
	}
	 
}

//网络连接已关闭，该消息只有在客户端连接服务器成功之后，网络异常中断之时触发，reason表示连接断开的原因
function OnAnyChatLinkClose(reason, errorcode) {
	
}

//用户的音频设备状态变化消息，dwUserId表示用户ID号，State表示该用户是否已打开音频采集设备（0：关闭，1：打开）
function OnAnyChatMicStateChange(dwUserId, State) {

}

//用户摄像头状态发生变化，dwUserId表示用户ID号，State表示摄像头的当前状态（0：没有摄像头，1：有摄像头但没有打开，2：打开）
function OnAnyChatCameraStateChange(dwUserId, State) {
	
}

//本地用户与其它用户的P2P网络连接状态发生变化，dwUserId表示其它用户ID号，State表示本地用户与其它用户的当前P2P网络连接状态（0：没有连接，1：仅TCP连接，2：仅UDP连接，3：TCP与UDP连接）
function OnAnyChatP2PConnectState(dwUserId, State) {

}

//用户发起私聊请求，dwUserId表示发起者的用户ID号，dwRequestId表示私聊请求编号，标识该请求
function OnAnyChatPrivateRequest(dwUserId, dwRequestId) {

}

//用户回复私聊请求，dwUserId表示回复者的用户ID号，errorcode为出错代码
function OnAnyChatPrivateEcho(dwUserId, errorcode) {

}

//用户退出私聊，dwUserId表示退出者的用户ID号，errorcode为出错代码
function OnAnyChatPrivateExit(dwUserId, errorcode) {

}

//视频通话消息通知回调函数
function OnAnyChatVideoCallEvent(dwEventType, dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr) {
	
	
}

//用户信息更新通知，dwUserId表示用户ID号，dwType表示更新类别
function OnAnyChatUserInfoUpdate(dwUserId, dwType) {
	console.log("用户信息更新通知..."+dwUserId+","+dwType);
}

//好友在线状态变化，dwUserId表示好友用户ID号，dwStatus表示用户的当前活动状态：0 离线， 1 上线
function OnAnyChatFriendStatus(dwUserId, dwStatus) {
	console.log("好友在线状态变化..."+dwUserId+","+dwStatus);
}

//用户视频分辩率发生变化，dwUserId（INT）表示用户ID号，dwResolution（INT）表示用户的视频分辨率组合值（低16位表示宽度，高16位表示高度）
function OnAnyChatVideoSizeChange(dwUserId,dwResolution){
	
}
