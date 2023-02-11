import { Card, CardContent, Typography, Unstable_Grid2 as Grid } from '@mui/material'
import React from 'react'
import CardMetricStyles from './CardMetric.module.css'

const CardMetric = ({ title, number, xs }) => {
	return (
		<Grid xs={xs} style={{ padding: '2em' }}>
			<Card className={CardMetricStyles.cardContainer}>
				<CardContent>
					<Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
						{title}
					</Typography>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: '3em'
						}}
					>
						<Typography variant='h4'>{number}</Typography>
					</div>
				</CardContent>

				{/* <CardActions>
				<Button size='small'>Learn More</Button>
			</CardActions> */}
			</Card>
		</Grid>
	)
}

export default CardMetric
