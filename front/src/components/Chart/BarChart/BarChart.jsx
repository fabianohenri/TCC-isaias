// import { add } from 'date-fns'
// import React, { memo } from 'react'
// import Chart from 'react-apexcharts'

// let buildBarOptions = (colors, labels, hideXAxis, hideYAxis, isHorizontal, isStacked, seriesLength, additionalOptions) => {
// 	let options = {
// 		colors,
// 		plotOptions: {
// 			bar: {
// 				horizontal: isHorizontal,
// 				barHeight: '70%',
// 				columnWidth: '70%'
// 			}
// 		},
// 		stroke: {
// 			width: 0,
// 			colors: ['#fff']
// 		},
// 		fill: {
// 			opacity: 1
// 		},
// 		xaxis: {
// 			show: true,
// 			categories: labels,
// 			labels: {
// 				show: true
// 			},
// 			axisBorder: {
// 				show: true
// 			},
// 			axisTicks: {
// 				show: true
// 			}
// 		},
// 		yaxis: {
// 			show: true
// 		},
// 		grid: {
// 			show: false
// 		},
// 		legend: {
// 			offsetY: isStacked ? -25 : 0,
// 			showForSingleSeries: true,
// 			position: 'top'
// 		}
// 	}

// 	if (seriesLength === 1) {
// 		options.plotOptions.bar.columnWidth = '30%'
// 		options.plotOptions.bar.barHeight = '30%'
// 	}

// 	if (isStacked) {
// 		options.chart = {
// 			stacked: isStacked,
// 			stackType: '100%',
// 			offsetY: -30
// 		}
// 	}

// 	if (hideXAxis) {
// 		options.xaxis.labels.show = true
// 		options.xaxis.axisBorder.show = false
// 		options.xaxis.axisTicks.show = false
// 	}

// 	if (hideYAxis) {
// 		options.yaxis.show = false
// 	}

// 	return options
// }

// const BarChart = ({ series, height, width, colors, labels, isHorizontal = false, isStacked = false, additionalOptions }) => {
// 	return (
// 		<Chart
// 			style={{
// 				color: 'black',
// 				textAlign: 'left',
// 				fontFamily: 'Poppins'
// 			}}
// 			options={buildBarOptions(colors, labels, true, true, isHorizontal, isStacked, series?.length, additionalOptions)}
// 			series={series}
// 			width={width}
// 			height={height}
// 			type='bar'
// 		/>
// 	)
// }

// export default memo(BarChart)
// export { buildBarOptions }
