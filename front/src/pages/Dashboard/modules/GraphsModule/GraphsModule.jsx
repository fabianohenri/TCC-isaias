import React, { useState, memo, useEffect } from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import BarChart from 'components/graphs/BarChart/BarChart'
import { buildGraphsMetrics } from 'utils/dataFormatUtils/overviewUtils'

const GraphsModule = ({ data, isLoading }) => {
	const [metrics, setMetrics] = useState({})

	let canLoadAuditors = metrics?.usersGraphData?.auditors?.series?.length > 0
	let canLoadCreators = metrics?.usersGraphData?.creators?.series?.length > 0
	let canLoadResponsibles = metrics?.usersGraphData?.responsibles?.series?.length > 0
	let canLoadClosers = metrics?.usersGraphData?.closers?.series?.length > 0
	let canLoadAccomplices = metrics?.usersGraphData?.accomplices?.series?.length > 0
	let canLoadTagsPopular = metrics?.tagsGraphData?.popular?.series?.length > 0
	let canLoadAverageMemberCompletionTime = metrics?.completionGraphData?.averageTime?.series?.length > 0

	useEffect(() => {
		if (data) {
			setMetrics(buildGraphsMetrics(data))
		}
	}, [data])

	return (
		<Grid container>
			{canLoadTagsPopular && (
				<Grid item xs={6}>
					Tags
					<BarChart
						series={metrics?.tagsGraphData?.popular?.series}
						labels={metrics?.tagsGraphData?.popular?.labels}
						height={400}
						width='100%'
						colors={['#008FFB', '#00E396', '#FEB019', '#FF4560']}
						isHorizontal={false}
						isStacked={false}
						isLoading={isLoading}
					/>
				</Grid>
			)}
			{canLoadResponsibles && (
				<Grid item xs={6}>
					Responsáveis
					<BarChart
						series={metrics?.usersGraphData?.responsibles?.series}
						labels={metrics?.usersGraphData?.responsibles?.labels}
						height={400}
						width='100%'
						colors={['#008FFB', '#00E396', '#FEB019', '#FF4560']}
						isHorizontal={false}
						isStacked={false}
						isLoading={isLoading}
					/>
				</Grid>
			)}
			{canLoadCreators && (
				<Grid item xs={6}>
					Criadores
					<BarChart
						series={metrics?.usersGraphData?.creators?.series}
						labels={metrics?.usersGraphData?.creators?.labels}
						height={400}
						width='100%'
						colors={['#008FFB', '#00E396', '#FEB019', '#FF4560']}
						isHorizontal={false}
						isStacked={false}
						isLoading={isLoading}
					/>
				</Grid>
			)}
			{canLoadAuditors && (
				<Grid item xs={4}>
					Observadores
					<BarChart
						series={metrics?.usersGraphData?.auditors?.series}
						labels={metrics?.usersGraphData?.auditors?.labels}
						height={400}
						width='100%'
						colors={['#008FFB', '#00E396', '#FEB019', '#FF4560']}
						isHorizontal={false}
						isStacked={false}
						isLoading={isLoading}
					/>
				</Grid>
			)}
			{canLoadClosers && (
				<Grid item xs={4}>
					Fechadores
					<BarChart
						series={metrics?.usersGraphData?.closers?.series}
						labels={metrics?.usersGraphData?.closers?.labels}
						height={400}
						width='100%'
						colors={['#008FFB', '#00E396', '#FEB019', '#FF4560']}
						isHorizontal={false}
						isStacked={false}
						isLoading={isLoading}
					/>
				</Grid>
			)}
			{canLoadAccomplices && (
				<Grid item xs={4}>
					Participantes
					<BarChart
						series={metrics?.usersGraphData?.accomplices?.series}
						labels={metrics?.usersGraphData?.accomplices?.labels}
						height={400}
						width='100%'
						colors={['#008FFB', '#00E396', '#FEB019', '#FF4560']}
						isHorizontal={false}
						isStacked={false}
						isLoading={isLoading}
					/>
				</Grid>
			)}
			{canLoadAverageMemberCompletionTime && (
				<Grid item xs={4}>
					Tempo médio de conclusão
					<BarChart
						series={metrics?.completionGraphData?.averageTime?.series}
						labels={metrics?.completionGraphData?.averageTime?.labels}
						additionalOptions={{ formatterLabel: ' h' }}
						height={400}
						width='100%'
						colors={['#008FFB', '#00E396', '#FEB019', '#FF4560']}
						isHorizontal={false}
						isStacked={false}
						isLoading={isLoading}
					/>
				</Grid>
			)}
		</Grid>
	)
}

export default memo(GraphsModule)
