import React, { useState, memo, useEffect } from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import CardMetric from 'components/CardMetric/CardMetric'
import { buildOverviewMetrics } from 'utils/dataFormatUtils/dashBoardUtils'

const OverviewModule = ({ data, loading }) => {
	const [metrics, setMetrics] = useState({})

	useEffect(() => {
		if (data) {
			setMetrics(buildOverviewMetrics(data))
		}
	}, [data])

	return (
		<Grid container>
			<CardMetric title='Tarefas totais' number={metrics?.totalTasks} xs={4} loading={loading} />
			<CardMetric title='Tarefas abertas' number={metrics?.openTasks} xs={4} loading={loading} />
			<CardMetric title='Tarefas fechadas' number={metrics?.closedTasks} xs={4} loading={loading} />
			<CardMetric title='Tarefas em alta prioridade' number={metrics?.highPriority} xs={4} loading={loading} />
			<CardMetric title='Tarefas em prioridade normal' number={metrics?.normalPriority} xs={4} loading={loading} />
			<CardMetric title='Tarefas de hotfix' number={metrics?.hotfixTasks} xs={4} loading={loading} />
		</Grid>
	)
}

export default memo(OverviewModule)
