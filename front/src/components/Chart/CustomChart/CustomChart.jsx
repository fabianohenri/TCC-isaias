import { Margin, Padding } from '@mui/icons-material'
import React, { memo, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

const CustomChart = ({ series, height, width, typeChart, labels, colors, additionalOptions }) => {
	const buildOptions = () => {
		switch (typeChart) {
			case 'line':
				return buildLineOptions()
			case 'bar':
				return buildBarOptions()
			case 'pie':
				return buildPieOptions()
			default:
				throw new Error(`Unknown chart type: ${typeChart}`)
		}
	}

	return (
		<Chart
			id={typeChart + Math.random()}
			style={{
				color: 'black',
				textAlign: 'left',
				fontFamily: 'Poppins'
			}}
			options={buildOptions(
				colors,
				labels,
				additionalOptions.hideXAxis,
				additionalOptions.hideYAxis,
				additionalOptions.isHorizontal,
				additionalOptions.isStacked,
				series?.length,
				additionalOptions
			)}
			series={series}
			width={width}
			height={height}
			type={typeChart}
		/>
	)
}

let buildBarOptions = (colors, labels, hideXAxis, hideYAxis, isHorizontal, isStacked, seriesLength, additionalOptions) => {
	let options = {
		colors,
		plotOptions: {
			bar: {
				horizontal: isHorizontal,
				barHeight: '70%',
				columnWidth: '70%'
			}
		},
		stroke: {
			width: 0,
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
			offsetY: isStacked ? -25 : 0,
			showForSingleSeries: true,
			position: 'top'
		}
	}

	if (seriesLength === 1) {
		options.plotOptions.bar.columnWidth = '30%'
		options.plotOptions.bar.barHeight = '30%'
	}

	if (isStacked) {
		options.chart = {
			stacked: isStacked,
			stackType: '100%',
			offsetY: -30
		}
	}

	if (hideXAxis) {
		options.xaxis.labels.show = true
		options.xaxis.axisBorder.show = false
		options.xaxis.axisTicks.show = false
	}

	if (hideYAxis) {
		options.yaxis.show = false
	}

	return options
}

let buildLineOptions = (colors, labels, hideXAxis, hideYAxis, isHorizontal, isStacked, seriesLength, additionalOptions) => {
	let options = {
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
		colors: colors,
		dataLabels: {
			enabled: true
		},
		stroke: {
			curve: 'smooth'
		},
		grid: {
			borderColor: '#e7e7e7',
			row: {
				colors: ['#f3f3f3', 'transparent'],
				opacity: 0.5
			}
		},
		markers: {
			size: 1
		},
		xaxis: {
			categories: labels,
			title: {
				text: 'Mês'
			}
		},
		yaxis: {
			title: {
				text: 'Tarefas'
			},
			labels: {
				show: true,
				offsetX: -5,
				rotate: 0
			}
		},
		legend: {
			position: 'top',
			horizontalAlign: 'right',
			floating: true,
			offsetY: -25,
			offsetX: -5
		}
	}

	return options
}

let buildPieOptions = (colors, labels, hideXAxis, hideYAxis, isHorizontal, isStacked, seriesLength, additionalOptions) => {
	let options = {
		chart: {
			width: 380,
			type: 'pie'
		},
		labels: labels,
		responsive: [
			{
				breakpoint: 480,
				options: {
					chart: {
						width: 200
					},
					legend: {
						position: 'bottom'
					}
				}
			}
		]
	}

	return options
}

export default memo(CustomChart)
