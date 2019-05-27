$(function(){
	courseScore();
	$("#course-suggestion").dataTable();
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