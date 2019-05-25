$(function(){
	$("[class='fa fa-star-o']").on("mouseover",function(){
		var all = $(this).parent("li").nextAll();
		for(var i=0;i<all.length;i++){//移除后面的样式
			if($(all[i]).find("i").hasClass("fa-star")){
				$(all[i]).find("i").removeClass("fa-star");
				$(all[i]).find("i").addClass("fa-star-o");
			}
		}
		
		$(this).removeClass("fa-star-o");
		$(this).addClass("fa-star");
		var liArr = $(this).parent("li").prevAll();
		for(var i=0;i<liArr.length;i++){
			$(liArr[i]).find("i").removeClass("fa-star-o");
			$(liArr[i]).find("i").addClass("fa-star");
		}
		
		$(this).parents("ul").next("div").find("span").html($(this).parent("li").val());
	})
	/*$("[class*='fa-star']").on("mouseout",function(){
		$(this).removeClass("fa-star");
		$(this).addClass("fa-star-o");
		
		var liArr = $(this).parent("li").prevAll();
		for(var i=0;i<liArr.length;i++){
			$(liArr[i]).find("i").removeClass("fa-star");
			$(liArr[i]).find("i").addClass("fa-star-o");
		}
	})*/
})
