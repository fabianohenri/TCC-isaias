import React, { useState, useEffect, memo } from 'react'
import { Button, Card, Typography, Unstable_Grid2 as Grid } from '@mui/material'
import api from 'service/service'
import CardMetric from 'components/CardMetric/CardMetric'
import OverviewStyles from './OverviewStyles.module.css'
import FiltersDashboard from 'components/FiltersDashboard/FiltersDashboard'

const Overview = () => {
	const [metrics, setMetrics] = useState({})

	const getMetrics = async (taskStatus) => {
		let baseUrl = '/task/get-overview-metrics'
		if (taskStatus) {
			baseUrl += `?taskStatus=${taskStatus}`
		}

		const { data } = await api.get(baseUrl).catch((e) => console.error(e.response.data))
		return data
	}

	const buildMetrics = async () => {
		const totalMetrics = await getMetrics()
		setMetrics({ totalMetrics })
	}

	useEffect(() => {
		// buildMetrics()
	}, [])

	// useEffect(() => {
	// 	console.log(metrics)
	// }, [metrics])

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
				<CardMetric title='Tarefas Totais' number={10} xs={4} />
				<CardMetric title='Tarefas Abertas' number={12} xs={4} />
				<CardMetric title='Tarefas Fechadas' number={35} xs={4} />
			</Grid>
			<Grid container>
				<CardMetric title='Tarefas Totais' number={10} xs={4} />
				<CardMetric title='Tarefas Abertas' number={12} xs={4} />
				<CardMetric title='Tarefas Fechadas' number={35} xs={4} />
			</Grid>
			<Grid container>
				<CardMetric title='Tarefas Totais' number={10} xs={4} />
				<CardMetric title='Tarefas Abertas' number={12} xs={4} />
				<CardMetric title='Tarefas Fechadas' number={35} xs={4} />
			</Grid>
			<Grid container>
				<CardMetric title='Tarefas Totais' number={10} xs={4} />
				<CardMetric title='Tarefas Abertas' number={12} xs={4} />
				<CardMetric title='Tarefas Fechadas' number={35} xs={4} />
			</Grid>
			<Grid container>
				<CardMetric title='Tarefas Totais' number={10} xs={4} />
				<CardMetric title='Tarefas Abertas' number={12} xs={4} />
				<CardMetric title='Tarefas Fechadas' number={35} xs={4} />
			</Grid>
			<Grid container>
				<CardMetric title='Tarefas Totais' number={10} xs={4} />
				<CardMetric title='Tarefas Abertas' number={12} xs={4} />
				<CardMetric title='Tarefas Fechadas' number={35} xs={4} />
			</Grid>
			<Grid container>
				<CardMetric title='Tarefas Totais' number={10} xs={4} />
				<CardMetric title='Tarefas Abertas' number={12} xs={4} />
				<CardMetric title='Tarefas Fechadas' number={35} xs={4} />
			</Grid>
			<Grid container>
				<CardMetric title='Tarefas Totais' number={10} xs={4} />
				<CardMetric title='Tarefas Abertas' number={12} xs={4} />
				<CardMetric title='Tarefas Fechadas' number={35} xs={4} />
			</Grid>
			<Grid container>
				<CardMetric title='Tarefas Totais' number={10} xs={4} />
				<CardMetric title='Tarefas Abertas' number={12} xs={4} />
				<CardMetric title='Tarefas Fechadas' number={35} xs={4} />
			</Grid>
		</div>
	)
}

export default memo(Overview)
