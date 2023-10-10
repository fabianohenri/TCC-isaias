import React, { useState, memo, useEffect } from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import CardMetric from 'components/CardMetric/CardMetric'
import { buildOverviewMetrics } from 'utils/dataFormatUtils/overviewUtils'

const OverviewModule = ({ data, loading }) => {
	const [metrics, setMetrics] = useState({})

	useEffect(() => {
		if (data) {
			setMetrics(buildOverviewMetrics(data))
		}
	}, [data])

	return (
		<Grid container className='module'>
			<CardMetric title='Tarefas Totais' number={metrics?.totalTasks} xs={4} loading={loading} />
			<CardMetric title='Tarefas Abertas' number={metrics?.openTasks} xs={4} loading={loading} />
			<CardMetric title='Tarefas Fechadas' number={metrics?.closedTasks} xs={4} loading={loading} />
		</Grid>
	)
}

export default memo(OverviewModule)
