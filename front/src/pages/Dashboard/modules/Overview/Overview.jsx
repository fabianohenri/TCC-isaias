import React, { useState, memo, useEffect } from 'react'
import { Button, Typography, Unstable_Grid2 as Grid } from '@mui/material'
import CardMetric from 'components/CardMetric/CardMetric'
import OverviewStyles from './OverviewStyles.module.css'
import BarChart from 'components/graphs/BarChart/BarChart'
import { buildOverviewMetrics } from 'utils/dataFormatUtils/overviewUtils'

const Overview = ({ data }) => {
	const [metrics, setMetrics] = useState({})
	const [isLoadingMetrics] = useState(true)
	let canLoadAuditors = metrics?.usersGraphData?.auditors?.series?.length > 0
	let canLoadCreators = metrics?.usersGraphData?.creators?.series?.length > 0
	let canLoadResponsibles = metrics?.usersGraphData?.responsibles?.series?.length > 0
	let canLoadClosers = metrics?.usersGraphData?.closers?.series?.length > 0
	let canLoadAccomplices = metrics?.usersGraphData?.accomplices?.series?.length > 0
	let canLoadTagsPopular = metrics?.tagsGraphData?.popular?.series?.length > 0
	let canLoadAverageMemberCompletionTime = metrics?.completionGraphData?.averageTime?.series?.length > 0

	useEffect(() => {
		if (data) {
			setMetrics(buildOverviewMetrics(data))
		}
	}, [data])

	return (
		<div className={`page ${OverviewStyles.overviewContainer}`}>
			<Grid>
				<Typography sx={{ fontSize: '2.5em' }} gutterBottom>
					Visão Geral
				</Typography>
			</Grid>
			<Grid container>
				<CardMetric title='Tarefas Totais' number={metrics?.general?.totalTasks} xs={4} />
				<CardMetric title='Tarefas Abertas' number={metrics?.general?.openTasks} xs={4} />
				<CardMetric title='Tarefas Fechadas' number={metrics?.general?.closedTasks} xs={4} />
			</Grid>
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
							isLoading={isLoadingMetrics}
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
							isLoading={isLoadingMetrics}
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
							isLoading={isLoadingMetrics}
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
							isLoading={isLoadingMetrics}
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
							isLoading={isLoadingMetrics}
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
							isLoading={isLoadingMetrics}
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
							isLoading={isLoadingMetrics}
						/>
					</Grid>
				)}
			</Grid>
		</div>
	)
}

export default memo(Overview)
