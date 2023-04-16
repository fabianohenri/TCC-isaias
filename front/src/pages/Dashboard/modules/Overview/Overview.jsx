import React, { useState, useEffect, memo } from 'react'
import { Button, Card, Typography, Unstable_Grid2 as Grid } from '@mui/material'
import api from 'service/service'
import CardMetric from 'components/CardMetric/CardMetric'
import OverviewStyles from './OverviewStyles.module.css'
import FiltersDashboard from 'components/FiltersDashboard/FiltersDashboard'
import { connect } from 'react-redux'
import BarChart from 'components/graphs/BarChart/BarChart'

const Overview = ({ filters }) => {
	const [metrics, setMetrics] = useState({})
	const [isLoadingMetrics, setIsLoadingMetrics] = useState(true)

	const getMetrics = async () => {
		if (!isLoadingMetrics) {
			setIsLoadingMetrics(true)
		}
		let baseUrl = `/task/get-overview-metrics?taskStatus=${''}&fromDate=${filters.fromDate}&toDate=${
			filters.toDate
		}&members=${filters.members.map((it) => it.id)}&groups=${filters.groups.map((it) => it.id)}`

		return await api
			.get(baseUrl)
			.then((response) => {
				setMetrics(response.data)
			})
			.catch((e) => {
				console.error(e.response.data)
			})
			.finally(() => setIsLoadingMetrics(false))
	}

	useEffect(() => {
		getMetrics()
	}, [filters])

	useEffect(() => {
		console.log(metrics)
	}, [metrics])

	return (
		<div className={`page ${OverviewStyles.overviewContainer}`}>
			<Grid>
				<Typography sx={{ fontSize: '2.5em' }} gutterBottom>
					Visão Geral
					<Button onClick={getMetrics}>Buscar</Button>
				</Typography>
				<FiltersDashboard />
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

const mapStateToProps = ({ store }) => ({
	filters: store?.dashboard?.filters
})

export default connect(mapStateToProps)(memo(Overview))
