import React from 'react'
import SkeletonLoad from 'react-loading-skeleton'
import CardGraph from 'components/CardGraph/CardGraph'
import { Grid } from '@mui/material'

const GraphContainer = ({ title, children, loading, height }) => {
	return (
		<Grid xs={12} style={{ padding: '2em' }}>
			{loading ? (
				<SkeletonLoad height={height} width='100%' />
			) : (
				<CardGraph title={title} height={height}>
					{children}
				</CardGraph>
			)}
		</Grid>
	)
}

export default GraphContainer
