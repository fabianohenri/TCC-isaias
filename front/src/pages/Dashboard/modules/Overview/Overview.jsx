import React, { useState, memo } from 'react'
import { Button, Typography, Unstable_Grid2 as Grid } from '@mui/material'
import CardMetric from 'components/CardMetric/CardMetric'
import OverviewStyles from './OverviewStyles.module.css'
import BarChart from 'components/graphs/BarChart/BarChart'
import { buildOverviewMetrics } from '../../../../utils/dataFormatUtils/overviewUtils'

const Overview = ({ filters, data }) => {
	const [metrics, setMetrics] = useState({})
	const [isLoadingMetrics, setIsLoadingMetrics] = useState(true)

	const getMetrics = async () => {
		buildOverviewMetrics([])
	}

	// useEffect(() => {
	// 	getMetrics()
	// }, [filters])

	return (
		<div className={`page ${OverviewStyles.overviewContainer}`}>
			<Grid>
				<Typography sx={{ fontSize: '2.5em' }} gutterBottom>
					Visão Geral
					<Button onClick={getMetrics}>Buscar</Button>
				</Typography>
			</Grid>
			<Grid container>
				<CardMetric title='Tarefas Totais' number={metrics?.general?.totalTasks} xs={4} />
				<CardMetric title='Tarefas Abertas' number={metrics?.general?.openTasks} xs={4} />
				<CardMetric title='Tarefas Fechadas' number={metrics?.general?.closedTasks} xs={4} />
			</Grid>
			<Grid container>
				<Grid item xs={3}>
					<BarChart
						series={metrics?.usersGraphData?.auditors?.series}
						labels={metrics?.usersGraphData?.auditors?.labels}
						height={500}
						width='100%'
						colors={['#008FFB', '#00E396', '#FEB019', '#FF4560']}
						isHorizontal={false}
						isStacked={false}
						isLoading={isLoadingMetrics}
					/>
				</Grid>
				<Grid item xs={3}>
					<Grid container>
						<BarChart
							series={metrics?.usersGraphData?.creators?.series}
							labels={metrics?.usersGraphData?.creators?.labels}
							height={500}
							width='100%'
							colors={['#008FFB', '#00E396', '#FEB019', '#FF4560']}
							isHorizontal={false}
							isStacked={false}
							isLoading={isLoadingMetrics}
						/>
					</Grid>
				</Grid>
				<Grid item xs={3}>
					<Grid container>
						<BarChart
							series={metrics?.usersGraphData?.responsibles?.series}
							labels={metrics?.usersGraphData?.responsibles?.labels}
							height={500}
							width='100%'
							colors={['#008FFB', '#00E396', '#FEB019', '#FF4560']}
							isHorizontal={false}
							isStacked={false}
							isLoading={isLoadingMetrics}
						/>
					</Grid>
				</Grid>
				<Grid item xs={3}>
					<Grid container>
						<BarChart
							series={metrics?.usersGraphData?.closers?.series}
							labels={metrics?.usersGraphData?.closers?.labels}
							height={500}
							width='100%'
							colors={['#008FFB', '#00E396', '#FEB019', '#FF4560']}
							isHorizontal={false}
							isStacked={false}
							isLoading={isLoadingMetrics}
						/>
					</Grid>
				</Grid>
				<Grid item xs={3}>
					<Grid container>
						<BarChart
							series={metrics?.usersGraphData?.accomplices?.series}
							labels={metrics?.usersGraphData?.accomplices?.labels}
							height={500}
							width='100%'
							colors={['#008FFB', '#00E396', '#FEB019', '#FF4560']}
							isHorizontal={false}
							isStacked={false}
							isLoading={isLoadingMetrics}
						/>
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}

export default memo(Overview)
