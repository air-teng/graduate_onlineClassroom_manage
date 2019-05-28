$(function(){
	interactiveStatistics();
	homeWorkFinished();
	learningTimeStatistics();
})
function interactiveStatistics(){
	   var chart = {
	      type: 'column'
	   };
	   var title = {
	      text: '课堂参与情况统计'   
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
	         text: '发生次数 (次)'         
	      }      
	   };
	   var tooltip = {
	      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	         '<td style="padding:0"><b>{point.y:.0f} 次</b></td></tr>',
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
	            data: [5, 3, 0, 8, 3, 2, 1, 4, 5, 2, 0, 1]
	        }, {
	            name: '回答',
	            data: [4, 3, 0, 6, 3, 2, 2, 3, 7, 3, 4, 2]
	        }, {
	            name: '课堂活动',
	            data: [2, 2, 3, 5, 2, 3, 2, 4, 5, 2, 1, 1]
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
	   $('#learning-statistics').highcharts(json);
}
function homeWorkFinished(){
	var title = {
		      text: '课后作业完成情况统计'   
		   };
		   var xAxis = {
		      categories: ['第一次', '第二次', '第三次', '第四次', '第五次']
		   };
		   var labels = {
		      items: [{
		         html: '完成次数',
		            style: {
		               left: '50px',
		               top: '18px',
		               color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
		            }
		      }]
		   };
		   var series= [{
		        type: 'column',
		            name: '客观题数目',
		            data: [10, 5, 5, 0, 20]
		        }, {
		            type: 'column',
		            name: '主观题数目',
		            data: [2, 3, 0, 4, 3]
		        }, {
		            type: 'spline',
		            name: '客观题得分',
		            data: [92, 95, 80, 90, 85],
		            marker: {
		                lineWidth: 2,
		                lineColor: Highcharts.getOptions().colors[5],
		                fillColor: 'white'
		            }
		        }, {
		            type: 'spline',
		            name: '主观题得分',
		            data: [75, 82, 85, 100, 90],
		            marker: {
		                lineWidth: 2,
		                lineColor: Highcharts.getOptions().colors[4],
		                fillColor: 'white'
		            }
		        },{
		            type: 'pie',
		            name: '次数',
		            data: [{
		                name: '已完成',
		                y: 5,
		                color: Highcharts.getOptions().colors[0] // Jane 的颜色
		            }, {
		                name: '未完成',
		                y: 1,
		                color: Highcharts.getOptions().colors[1] // John 的颜色
		            }],
		            center: [100, 80],
		            size: 100,
		            showInLegend: false,
		            dataLabels: {
		                enabled: false
		            }
		      }
		   ];     
		      
		   var json = {};   
		   json.title = title;   
		   json.xAxis = xAxis;
		   json.labels = labels;  
		   json.series = series;
		   $('#homework-finished-statistics').highcharts(json);  
}
