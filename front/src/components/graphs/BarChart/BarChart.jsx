import React, { memo } from 'react'
import Chart from 'react-apexcharts'
import Skeleton from 'react-loading-skeleton'

let buildBarOptions = (colors, labels, hideXAxis, hideYAxis, isHorizontal, isStacked, seriesLength, additionalOptions) => {
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
						newValue + additionalOptions?.formatterLabel
					}
					return newValue
				}
			}
		},
		plotOptions: {
			bar: {
				horizontal: isHorizontal,
				barHeight: '70%',
				columnWidth: '70%'
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
			showForSingleSeries: true
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
		options.xaxis.labels.show = false
		options.xaxis.axisBorder.show = false
		options.xaxis.axisTicks.show = false
	}

	if (hideYAxis) {
		options.yaxis.show = false
	}

	return options
}

const BarChart = ({ series, height, width, colors, labels, isHorizontal, isStacked, isLoading, additionalOptions }) => {
	return (
		<>
			{isLoading && !series ? (
				<Skeleton height={height} width={width} />
			) : (
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
					type='bar'
				/>
			)}
		</>
	)
}

export default memo(BarChart)
