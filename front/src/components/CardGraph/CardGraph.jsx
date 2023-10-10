import { Card, CardContent, Typography, Divider } from '@mui/material'
import React from 'react'

const CardGraph = ({ title, children, height }) => {
	return (
		<Card style={{ height }}>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
					{title}
				</Typography>
				<Divider />
				{children}
			</CardContent>
		</Card>
	)
}

export default CardGraph
