import { Card, CardContent, Typography, Unstable_Grid2 as Grid } from '@mui/material'
import React from 'react'
import SkeletonLoad from 'react-loading-skeleton'
import CardMetricStyles from './CardMetric.module.css'

const CardMetric = ({ title, number, xs, loading }) => {
	return (
		<Grid xs={xs} style={{ padding: '2em', loading }}>
			{loading ? (
				<SkeletonLoad height='7em' width='100%' />
			) : (
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
							<Typography variant='h4' color='text.secondary'>
								{number}
							</Typography>
						</div>
					</CardContent>

					{/* <CardActions>
				<Button size='small'>Learn More</Button>
			</CardActions> */}
				</Card>
			)}
		</Grid>
	)
}

export default CardMetric
