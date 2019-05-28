$(function(){
	learningTimeStatistics();
	 $( "#progressbar" ).progressbar({
	      value: 37
	 });
})
function learningTimeStatistics(){
	Highcharts.chart('course-everyday-feedback', {
		chart: {
			type: 'area'
		},
		title: {
			text: '上课时间统计'
		},
		subtitle: {
			text: '最近七天学习时间统计'
		},
		xAxis: {
			categories: ['2019-05-22', '2019-05-23', '2019-05-24', '2019-05-25', '2019-05-26', '2019-05-27', '2019-05-28'],
			tickmarkPlacement: 'on',
			title: {
				enabled: false
			}
		},
		yAxis: {
			title: {
				text: '分钟'
			}
		},
		tooltip: {
			split: true,
			valueSuffix: ' 分钟'
		},
		plotOptions: {
			area: {
				stacking: 'normal',
				lineColor: '#666666',
				lineWidth: 1,
				marker: {
					lineWidth: 1,
					lineColor: '#666666'
				}
			}
		},
		series: [{
			name: '学时',
			data: [90, 135, 45, 45, 90, 90, 180]
		}]
	});
}