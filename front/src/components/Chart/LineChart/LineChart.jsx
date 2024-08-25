// import { Margin, Padding } from '@mui/icons-material'
// import React, { memo } from 'react'
// import Chart from 'react-apexcharts'

// let buildLineOptions = (colors, labels, hideXAxis, hideYAxis, isHorizontal, isStacked, seriesLength, additionalOptions) => {
// 	let options = {
// 		chart: {
// 			height: 350,
// 			type: 'line',
// 			dropShadow: {
// 				enabled: true,
// 				color: '#000',
// 				top: 18,
// 				left: 7,
// 				blur: 10,
// 				opacity: 0.2
// 			},
// 			zoom: {
// 				enabled: false
// 			},
// 			toolbar: {
// 				show: false
// 			}
// 		},
// 		colors: colors,
// 		dataLabels: {
// 			enabled: true
// 		},
// 		stroke: {
// 			curve: 'smooth'
// 		},
// 		grid: {
// 			borderColor: '#e7e7e7',
// 			row: {
// 				colors: ['#f3f3f3', 'transparent'],
// 				opacity: 0.5
// 			}
// 		},
// 		markers: {
// 			size: 1
// 		},
// 		xaxis: {
// 			categories: labels,
// 			title: {
// 				text: 'Mês'
// 			}
// 		},
// 		yaxis: {
// 			title: {
// 				text: 'Tarefas'
// 			},
// 			labels: {
// 				show: true,
// 				offsetX: -5,
// 				rotate: 0
// 			}
// 		},
// 		legend: {
// 			position: 'top',
// 			horizontalAlign: 'right',
// 			floating: true,
// 			offsetY: -25,
// 			offsetX: -5
// 		}
// 	}

// 	return options
// }

// const LineChart = ({ series, height, width, colors, labels, isHorizontal = false, isStacked = false, additionalOptions }) => {
// 	return (
// 		<Chart
// 			style={{
// 				color: 'black',
// 				textAlign: 'left',
// 				fontFamily: 'Poppins'
// 			}}
// 			options={buildLineOptions(colors, labels, true, true, isHorizontal, isStacked, series?.length, additionalOptions)}
// 			series={series}
// 			width={width}
// 			height={height}
// 			type='line'
// 		/>
// 	)
// }

// export default memo(LineChart)
// export { buildLineOptions }
