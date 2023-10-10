import React, { useState, memo, useEffect } from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import BarChart from 'components/graphs/BarChart/BarChart'
import { buildGraphsMetrics } from 'utils/dataFormatUtils/overviewUtils'
import GraphContainer from 'components/GraphContainer/GraphContainer'

const graphHeight = 400
const containerHeight = graphHeight + 80

const GraphsModule = ({ data, loading }) => {
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
			<Grid item xs={6}>
				<GraphContainer loading={loading} height={containerHeight} title='Tags'>
					{canLoadTagsPopular && (
						<BarChart
							series={metrics?.tagsGraphData?.popular?.series}
							labels={metrics?.tagsGraphData?.popular?.labels}
							height={graphHeight}
							width='100%'
							colors={['#008FFB', '#00E396', '#FEB019', '#FF4560']}
							isHorizontal={false}
							isStacked={false}
						/>
					)}
				</GraphContainer>
			</Grid>
			<Grid item xs={6}>
				<GraphContainer loading={loading} height={containerHeight} title='Média de finalização de tarefas'>
					{canLoadAverageMemberCompletionTime && (
						<BarChart
							series={metrics?.completionGraphData?.averageTime?.series}
							labels={metrics?.completionGraphData?.averageTime?.labels}
							additionalOptions={{ formatterLabel: ' h' }}
							height={graphHeight}
							width='100%'
							colors={['#008FFB', '#00E396', '#FEB019', '#FF4560']}
							isHorizontal={false}
							isStacked={false}
						/>
					)}
				</GraphContainer>
			</Grid>
			<Grid item xs={6}>
				<GraphContainer loading={loading} height={containerHeight} xs={6} title='Responsáveis'>
					{canLoadResponsibles && (
						<BarChart
							series={metrics?.usersGraphData?.responsibles?.series}
							labels={metrics?.usersGraphData?.responsibles?.labels}
							height={graphHeight}
							width='100%'
							colors={['#008FFB', '#00E396', '#FEB019', '#FF4560']}
							isHorizontal={false}
							isStacked={false}
						/>
					)}
				</GraphContainer>
			</Grid>
			<Grid item xs={6}>
				<GraphContainer loading={loading} height={containerHeight} title='Criadores'>
					{canLoadCreators && (
						<BarChart
							series={metrics?.usersGraphData?.creators?.series}
							labels={metrics?.usersGraphData?.creators?.labels}
							height={graphHeight}
							width='100%'
							colors={['#008FFB', '#00E396', '#FEB019', '#FF4560']}
							isHorizontal={false}
							isStacked={false}
						/>
					)}
				</GraphContainer>
			</Grid>
			<Grid item xs={6}>
				<GraphContainer loading={loading} height={containerHeight} title='Fechadores'>
					{canLoadClosers && (
						<BarChart
							series={metrics?.usersGraphData?.closers?.series}
							labels={metrics?.usersGraphData?.closers?.labels}
							height={graphHeight}
							width='100%'
							colors={['#008FFB', '#00E396', '#FEB019', '#FF4560']}
							isHorizontal={false}
							isStacked={false}
						/>
					)}
				</GraphContainer>
			</Grid>
			<Grid item xs={6}>
				<GraphContainer loading={loading} height={containerHeight} title='Participantes'>
					{canLoadAccomplices && (
						<BarChart
							series={metrics?.usersGraphData?.accomplices?.series}
							labels={metrics?.usersGraphData?.accomplices?.labels}
							height={graphHeight}
							width='100%'
							colors={['#008FFB', '#00E396', '#FEB019', '#FF4560']}
							isHorizontal={false}
							isStacked={false}
						/>
					)}
				</GraphContainer>
			</Grid>

			<Grid item xs={12}>
				<GraphContainer loading={loading} height={containerHeight} title='Observadores'>
					{canLoadAuditors && (
						<BarChart
							series={metrics?.usersGraphData?.auditors?.series}
							labels={metrics?.usersGraphData?.auditors?.labels}
							height={graphHeight}
							width='100%'
							colors={['#008FFB', '#00E396', '#FEB019', '#FF4560']}
							isHorizontal={false}
							isStacked={false}
						/>
					)}
				</GraphContainer>
			</Grid>
		</Grid>
	)
}

export default memo(GraphsModule)
