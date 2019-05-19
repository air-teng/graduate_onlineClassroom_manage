$(function(){
	$("#jumpToLogin").on("click",function(){
		var url=window.location.href.substr(0,window.location.href.indexOf("register")-1);
		$(this).attr("href",url);
	})
})