import { Card, CardContent, Typography, Unstable_Grid2 as Grid, Divider } from '@mui/material'
import React from 'react'
import CardGraphStyles from './CardGraph.module.css'

const CardGraph = ({ title, xs = 12, children }) => {
	return (
		<Grid xs={xs} style={{ padding: '2em' }}>
			<Card className={CardGraphStyles.cardContainer}>
				<CardContent>
					<Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
						{title}
					</Typography>
					<Divider />
					{children}
				</CardContent>
			</Card>
		</Grid>
	)
}

export default CardGraph
