$(function(){
	/*课程评分*/
	courseScore();
	$("#course-suggestion").dataTable({
		"iDisplayLength":5,
		"aLengthMenu":[[5,10,20,30,50],[5,10,20,30,50]]
	});
	/*互动情况*/
	interactiveStatistics();
	/*家庭作业*/
	homeWork();
})
function courseScore(){
	var chart = {
		      type: 'bar'
		   };
		   var title = {
		      text: '课程评分情况'   
		   };
		   var subtitle = {
		      text: '课程得分统计图'  
		   };
		   var xAxis = {
		      categories: ['5分', '4分', '3分', '2分', '1分'],
		      title: {
		         text: null
		      }
		   };
		   var yAxis = {
		      min: 0,
		      title: {
		         text: '百分比',
		         align: 'high'
		      },
		      labels: {
		         overflow: 'justify'
		      }
		   };
		   var tooltip = {
		      valueSuffix: '%'
		   };
		   var plotOptions = {
		      bar: {
		         dataLabels: {
		            enabled: true
		         }
		      }
		   };
		   var legend = {
		      layout: 'vertical',
		      align: 'right',
		      verticalAlign: 'top',
		      x: -40,
		      y: 100,
		      floating: true,
		      borderWidth: 1,
		      backgroundColor: '#FFFFFF', 
		      shadow: true
		   };
		   var credits = {
		      enabled: false
		   };
		   
		   var series= [{
		         name: '课程内容',
		            data:[60, 20, 10,5,5]
		        }, {
		            name: '教师讲授',
		            data: [65, 25, 10, 5, 5]
		        }, {
		            name: '学习效果',
		            data: [50, 25, 10, 10, 5]      
			    }
		   ];     
		      
		   var json = {};   
		   json.chart = chart; 
		   json.title = title;   
		   json.subtitle = subtitle; 
		   json.tooltip = tooltip;
		   json.xAxis = xAxis;
		   json.yAxis = yAxis;  
		   json.series = series;
		   json.plotOptions = plotOptions;
		   json.legend = legend;
		   json.credits = credits;
		   $('#course-scores-feedback').highcharts(json);
}
function interactiveStatistics(){
	   var chart = {
	      type: 'column'
	   };
	   var title = {
	      text: '课堂互动情况统计'   
	   };
	   var subtitle = {
	      text: '读《白夜行》'  
	   };
	   var xAxis = {
	      categories: ['一','二','三','四','五','六','七','八','九','十','十一','十二'],
	      crosshair: true
	   };
	   var yAxis = {
	      min: 0,
	      title: {
	         text: '发生次数 (人次)'         
	      }      
	   };
	   var tooltip = {
	      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	         '<td style="padding:0"><b>{point.y:.0f} 人次</b></td></tr>',
	      footerFormat: '</table>',
	      shared: true,
	      useHTML: true
	   };
	   var plotOptions = {
	      column: {
	         pointPadding: 0.1,
	         borderWidth: 0
	      }
	   };  
	   var credits = {
	      enabled: false
	   };
	   
	   var series= [{
	        name: '提问',
	            data: [23, 35, 36, 10, 25, 56, 80, 30, 56, 90, 98, 45]
	        }, {
	            name: '回答',
	            data: [83, 78, 98, 93, 106, 84, 105, 104, 91, 83, 106, 92]
	        }, {
	            name: '课堂活动',
	            data: [48, 54, 23, 58, 89, 65, 59, 59, 52, 65, 59, 51]
	        }];     
	      
	   var json = {};   
	   json.chart = chart; 
	   json.title = title;   
	   json.subtitle = subtitle; 
	   json.tooltip = tooltip;
	   json.xAxis = xAxis;
	   json.yAxis = yAxis;  
	   json.series = series;
	   json.plotOptions = plotOptions;  
	   json.credits = credits;
	   $('#course-interactive-feedback').highcharts(json);
}
function homeWork(){
	/*var chart = {
		      type: 'column'
	};*/
	var title = {
		text: '课后作业完成情况'   
	};
   var subtitle = {
      text: '读《白夜行》'
   };
   var xAxis = {
      categories: ['一','二','三','四','五','六','七','八','九','十','十一','十二']
   };
   var yAxis = {
      title: {
         text: '人数'
      },
      plotLines: [{
         value: 0,
         width: 1,
         color: '#808080'
      }]
   };   

   var tooltip = {
      valueSuffix: '人'
   }

   var legend = {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0
   };

   var series =  [
      {
         name: '上课人数',
         data: [32, 32, 34, 30, 25, 34, 35,
            26, 25, 29, 33, 35]
      }, 
      {
         name: '完成人数',
         data: [30, 28, 26, 30, 25, 32, 30,
            25, 24, 26, 32, 34]
      }
   ];

   var json = {};

   json.title = title;
   json.subtitle = subtitle;
   json.xAxis = xAxis;
   json.yAxis = yAxis;
   json.tooltip = tooltip;
   json.legend = legend;
   json.series = series;

   $('#course-homework-feedback').highcharts(json);
}