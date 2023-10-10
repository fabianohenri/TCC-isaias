import React, { useState, memo, useEffect } from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import BarChart from 'components/graphs/BarChart/BarChart'
import { buildGraphsMetrics } from 'utils/dataFormatUtils/overviewUtils'
import CardGraph from 'components/CardGraph/CardGraph'

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
					<CardGraph title='Tags'>
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
					</CardGraph>
				</Grid>
			)}
			{canLoadAverageMemberCompletionTime && (
				<Grid item xs={6}>
					<CardGraph title='Média de finalização de tarefas'>
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
					</CardGraph>
				</Grid>
			)}
			{canLoadResponsibles && (
				<Grid item xs={6}>
					<CardGraph title='Responsáveis'>
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
					</CardGraph>
				</Grid>
			)}
			{canLoadCreators && (
				<Grid item xs={6}>
					<CardGraph title='Criadores'>
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
					</CardGraph>
				</Grid>
			)}
			{canLoadClosers && (
				<Grid item xs={6}>
					<CardGraph title='Fechadores'>
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
					</CardGraph>
				</Grid>
			)}
			{canLoadAccomplices && (
				<Grid item xs={6}>
					<CardGraph title='Participantes'>
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
					</CardGraph>
				</Grid>
			)}
			{canLoadAuditors && (
				<Grid item xs={12}>
					<CardGraph title='Observadores'>
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
					</CardGraph>
				</Grid>
			)}
		</Grid>
	)
}

export default memo(GraphsModule)
