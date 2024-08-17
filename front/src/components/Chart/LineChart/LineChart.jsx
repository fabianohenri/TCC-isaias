import React, { memo } from 'react'
import Chart from 'react-apexcharts'

let buildBarOptions = (colors, labels, hideXAxis, hideYAxis, isHorizontal, isStacked, seriesLength, additionalOptions) => {
	let options = {
		colors,
		chart: {
			type: 'line',
			toolbar: {
				offsetX: 0,
				offsetY: -30
			}
		},
		// tooltip: {
		// 	y: {
		// 		formatter: (val) => {
		// 			let newValue = val
		// 			if (additionalOptions?.decimal) {
		// 				newValue = newValue.toFixed(additionalOptions.decimal)
		// 			}
		// 			if (additionalOptions?.formatterLabel) {
		// 				newValue = newValue + additionalOptions?.formatterLabel
		// 			}
		// 			return newValue
		// 		}
		// 	}
		// },
		// plotOptions: {
		// 	bar: {
		// 		horizontal: isHorizontal,
		// 		barHeight: '70%',
		// 		columnWidth: '70%'
		// 	}
		// },
		dataLabels: {
			enabled: true,
			offsetY: 0,
			offsetX: 0,
			style: {
				fontSize: '14px',
				fontFamily: 'Roboto'
			},
			dropShadow: {
				enabled: true,
				top: 1,
				left: 0,
				blur: 1,
				color: '#000',
				opacity: 0.45
			}
		},
		stroke: {
			curve: 'straight'
		},
		fill: {
			opacity: 1
		},
		xaxis: {
			show: true,
			categories: labels,
			labels: {
				show: true
			},
			axisBorder: {
				show: true
			},
			axisTicks: {
				show: true
			}
		},
		yaxis: {
			show: true
		},
		grid: {
			row: {
				colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
				opacity: 0.5
			}
		},
		legend: {
			offsetY: isStacked ? -25 : 0,
			showForSingleSeries: true
		}
	}

	// if (seriesLength === 1) {
	// 	options.plotOptions.bar.columnWidth = '30%'
	// 	options.plotOptions.bar.barHeight = '30%'
	// }

	if (isStacked) {
		options.chart = {
			stacked: isStacked,
			stackType: '100%',
			offsetY: -30
		}
	}

	if (hideXAxis) {
		options.xaxis.labels.show = false
		options.xaxis.axisBorder.show = false
		options.xaxis.axisTicks.show = false
	}

	if (hideYAxis) {
		options.yaxis.show = false
	}

	return options
}

let buildLineOptions = (colors, labels, hideXAxis, hideYAxis, additionalOptions) => {
	let options = {
		colors,
		chart: {
			toolbar: {
				offsetX: 0,
				offsetY: -30
			}
		},
		tooltip: {
			y: {
				formatter: (val) => {
					let newValue = val
					if (additionalOptions?.decimal) {
						newValue = newValue.toFixed(additionalOptions.decimal)
					}
					if (additionalOptions?.formatterLabel) {
						newValue = newValue + additionalOptions?.formatterLabel
					}
					return newValue
				}
			}
		},
		dataLabels: {
			enabled: true,
			offsetY: 0,
			offsetX: 0,
			style: {
				fontSize: '14px',
				fontFamily: 'Roboto',
				colors: ['#fff']
			},
			dropShadow: {
				enabled: true,
				top: 1,
				left: 0,
				blur: 1,
				color: '#000',
				opacity: 0.45
			}
		},
		stroke: {
			width: 2,
			colors: ['#fff']
		},
		fill: {
			opacity: 1
		},
		xaxis: {
			show: true,
			categories: labels,
			labels: {
				show: true
			},
			axisBorder: {
				show: true
			},
			axisTicks: {
				show: true
			}
		},
		yaxis: {
			show: true
		},
		grid: {
			show: false
		},
		legend: {
			offsetY: 0,
			showForSingleSeries: true
		}
	}

	if (hideXAxis) {
		options.xaxis.labels.show = false
		options.xaxis.axisBorder.show = false
		options.xaxis.axisTicks.show = false
	}

	if (hideYAxis) {
		options.yaxis.show = false
	}

	return options
}

let buildLineOptions2 = {
	series: [
		{
			name: 'High - 2013',
			data: [28, 29, 33, 36, 32, 32, 33]
		},
		{
			name: 'Low - 2013',
			data: [12, 11, 14, 18, 17, 13, 13]
		}
	],
	options: {
		chart: {
			height: 350,
			type: 'line',
			dropShadow: {
				enabled: true,
				color: '#000',
				top: 18,
				left: 7,
				blur: 10,
				opacity: 0.2
			},
			zoom: {
				enabled: false
			},
			toolbar: {
				show: false
			}
		},
		colors: ['#77B6EA', '#545454'],
		dataLabels: {
			enabled: true
		},
		stroke: {
			curve: 'smooth'
		},
		title: {
			text: 'Average High & Low Temperature',
			align: 'left'
		},
		grid: {
			borderColor: '#e7e7e7',
			row: {
				colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
				opacity: 0.5
			}
		},
		markers: {
			size: 1
		},
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
			title: {
				text: 'Month'
			}
		},
		yaxis: {
			title: {
				text: 'Temperature'
			},
			min: 5,
			max: 40
		},
		legend: {
			position: 'top',
			horizontalAlign: 'right',
			floating: true,
			offsetY: -25,
			offsetX: -5
		}
	}
}

const BarChart = ({ series, height, width, colors, labels, isHorizontal = false, isStacked = false, additionalOptions }) => {
	return (
		<Chart
			style={{
				color: 'black',
				textAlign: 'left',
				fontFamily: 'Poppins'
			}}
			options={buildBarOptions(colors, labels, true, true, isHorizontal, isStacked, series?.length, additionalOptions)}
			series={series}
			width={width}
			height={height}
			type='line'
		/>
	)
}

export default memo(LineChart)
