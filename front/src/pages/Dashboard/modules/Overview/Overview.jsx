import React, { useState, memo, useEffect } from 'react'
import { Typography, Unstable_Grid2 as Grid } from '@mui/material'
import CardMetric from 'components/CardMetric/CardMetric'
import OverviewStyles from './OverviewStyles.module.css'
import { buildOverviewMetrics } from 'utils/dataFormatUtils/overviewUtils'

const Overview = ({ data }) => {
	const [metrics, setMetrics] = useState({})

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
				<CardMetric title='Tarefas Totais' number={metrics?.totalTasks} xs={4} />
				<CardMetric title='Tarefas Abertas' number={metrics?.openTasks} xs={4} />
				<CardMetric title='Tarefas Fechadas' number={metrics?.closedTasks} xs={4} />
			</Grid>
		</div>
	)
}

export default memo(Overview)
